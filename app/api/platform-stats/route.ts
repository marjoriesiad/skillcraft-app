import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';

// Cache pour éviter trop de requêtes à la base de données
let cachedStats: any = null;
let lastFetch = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    // Vérifier le cache
    const now = Date.now();
    if (cachedStats && (now - lastFetch) < CACHE_DURATION) {
      return NextResponse.json(cachedStats);
    }

    // Récupérer les statistiques en parallèle pour de meilleures performances
    const [
      totalUsers,
      totalProjects,
      activeProjects,
      totalSkills,
      recentUsers,
      completedProjects
    ] = await Promise.all([
      // Nombre total d'utilisateurs
      prisma.user.count(),
      
      // Nombre total de projets
      prisma.project.count(),
      
      // Projets actifs (en cours ou ouverts) - CORRIGÉ avec les bonnes valeurs d'enum
      prisma.project.count({
        where: {
          status: {
            in: [ProjectStatus.PLANNING, ProjectStatus.OPEN, ProjectStatus.IN_PROGRESS]
          }
        }
      }),
      
      // Nombre total de compétences
      prisma.skill.count(),
      
      // Utilisateurs inscrits dans les 30 derniers jours
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 jours
          }
        }
      }),

      // Projets terminés
      prisma.project.count({
        where: {
          status: ProjectStatus.COMPLETED
        }
      })
    ]);

    // Calculer quelques métriques supplémentaires
    const averageProjectsPerUser = totalUsers > 0 ? Math.round((totalProjects / totalUsers) * 10) / 10 : 0;
    const growthRate = Math.round((recentUsers / Math.max(totalUsers - recentUsers, 1)) * 100);
    const completionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    const stats = {
      totalUsers,
      totalProjects,
      activeProjects,
      totalSkills,
      recentUsers,
      completedProjects,
      averageProjectsPerUser,
      growthRate,
      completionRate,
      lastUpdated: new Date().toISOString(),
      // Métriques calculées pour l'affichage
      metrics: {
        userGrowth: `+${recentUsers} ce mois`,
        projectSuccess: `${completionRate}% terminés`,
        engagement: `${averageProjectsPerUser} projets/dev en moyenne`,
        activeRate: `${Math.round((activeProjects / Math.max(totalProjects, 1)) * 100)}% actifs`
      }
    };

    // Mettre en cache
    cachedStats = stats;
    lastFetch = now;


    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de la plateforme:', error);
    // Retourner des données par défaut en cas d'erreur
    const fallbackStats = {
      totalUsers: 0,
      totalProjects: 0,
      activeProjects: 0,
      totalSkills: 0,
      recentUsers: 0,
      completedProjects: 0,
      averageProjectsPerUser: 0,
      growthRate: 0,
      completionRate: 0,
      error: 'Unable to fetch platform statistics',
      lastUpdated: new Date().toISOString(),
      metrics: {
        userGrowth: 'N/A',
        projectSuccess: 'N/A',
        engagement: 'N/A',
        activeRate: 'N/A'
      }
    };

    return NextResponse.json(fallbackStats, { status: 500 });
  }
}