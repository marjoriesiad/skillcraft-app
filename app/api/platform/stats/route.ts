import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test de connexion simple
    await prisma.$connect()
    
    // Récupération des statistiques en parallèle pour optimiser les performances
    const [
      totalUsers,
      totalProjects,
      activeProjects,
      totalSkills
    ] = await Promise.all([
      // Total des utilisateurs
      prisma.user.count().catch(() => 0),
      
      // Total des projets
      prisma.project.count().catch(() => 0),
      
      // Projets actifs (OPEN, IN_PROGRESS)
      prisma.project.count({
        where: {
          status: {
            in: ['OPEN', 'IN_PROGRESS']
          }
        }
      }).catch(() => 0),
      
      // Total des compétences
      prisma.skill.count().catch(() => 0)
    ])

    // Fermer la connexion
    await prisma.$disconnect()
    
    // Retourner les statistiques
    return NextResponse.json({
      totalUsers,
      totalProjects,
      activeProjects,
      totalSkills,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    
    // En cas d'erreur, retourner des statistiques par défaut
    return NextResponse.json({
      totalUsers: 0,
      totalProjects: 0,
      activeProjects: 0,
      totalSkills: 0,
      error: `Erreur base de données: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}