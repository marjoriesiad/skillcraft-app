'use client';

import { useState, useEffect } from 'react';
import { Users, Target, Code, ArrowRight, Activity } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RegisterModal } from '../modal/register-modal';
import { PlatformStats } from '@/types/landing-page';


// Dictionnaire d'icônes
const iconMap: Record<string, React.ElementType> = {
  Users,
  Target,
  Code,
};

// Configuration des statistiques
const statsConfig = [
  {
    key: 'users',
    label: 'Développeurs',
    icon: 'Users',
    fallback: '42+'
  },
  {
    key: 'projects',
    label: 'Projets créés',
    icon: 'Target',
    fallback: '12+'
  },
  {
    key: 'skills',
    label: 'Compétences',
    icon: 'Code',
    fallback: '25+'
  }
];

// Hook pour récupérer les vraies stats
const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalSkills: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Petit délai pour éviter un flash trop rapide
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch('/api/platform/stats');

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // Vérifier si l'API a retourné une erreur
        if (data.error) {
          throw new Error(data.error);
        }

        setStats({
          totalUsers: data.totalUsers || 0,
          totalProjects: data.totalProjects || 0,
          activeProjects: data.activeProjects || 0,
          totalSkills: data.totalSkills || 0,
          loading: false
        });
      } catch (err) {
        console.error('Erreur stats plateforme:', err);
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Impossible de charger les stats'
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};

const HeroSection = () => {
  const platformStats = usePlatformStats();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (num < 1000) return num.toString();
    if (num < 10000) return `${Math.floor(num / 100) / 10}K`;
    return `${Math.floor(num / 1000)}K+`;
  };

  const getStatValue = (key: string, fallback: string) => {
    if (platformStats.loading) return '...';
    if (platformStats.error) return fallback;

    switch (key) {
      case 'users':
        return formatNumber(platformStats.totalUsers);
      case 'projects':
        return formatNumber(platformStats.totalProjects);
      case 'skills':
        return formatNumber(platformStats.totalSkills);
      default:
        return fallback;
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="concept">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Développez vos{' '}
            <span className="bg-gradient-to-r from-terra-primary to-terra-secondary bg-clip-text text-transparent">
              compétences
            </span>
            <br />
            en équipe
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des projets collaboratifs, maîtrisez Git en situation réelle, et 
            construisez un portfolio qui impressionne.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button 
              size="lg"
              className="bg-terra-primary hover:bg-terra-secondary px-8 py-6 text-lg cursor-pointer"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="text-slate-300 hover:text-white hover:bg-secondary px-8 py-6 text-lg font-semibold cursor-pointer"
            >
              Découvrir comment
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 lg:gap-20">
          {statsConfig.map((stat, index) => {
            const Icon = iconMap[stat.icon];

            return (
              <div key={index} className="group text-center hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-gradient-to-r from-terra-primary to-terra-secondary bg-clip-text mb-3 group-hover:scale-105 transition-transform duration-300">
                  {getStatValue(stat.key, stat.fallback)}
                </div>

                <div className="flex items-center justify-center gap-2 text-slate-300 group-hover:text-white transition-colors duration-300">
                  {Icon && <Icon className="h-4 w-4 text-terra-primary" />}
                  <span className="text-sm md:text-base font-medium">{stat.label}</span>
                </div>

                {platformStats.loading && (
                  <div className="mt-1">
                    <div className="w-4 h-1 bg-terra-primary/30 rounded-full overflow-hidden mx-auto">
                      <div className="w-full h-full bg-terra-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!platformStats.loading && !platformStats.error && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Activity className="w-3 h-3 text-green-400 animate-pulse" />
              <span>Statistiques en temps réel</span>
            </div>
          </div>
        )}

        {platformStats.error && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Données en cache</span>
            </div>
          </div>
        )}
      </div>
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
      />
    </>
  );
};

export default HeroSection;