import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DiscordStats, UseDiscordStatsOptions } from "@/types/landing-page"


export const useDiscordStats = (options: UseDiscordStatsOptions = {}) => {
  const {
    enableAutoRefresh = false,
    refreshInterval = 5,
    allowedPaths = ['/']
  } = options;

  const pathname = usePathname();
  const [stats, setStats] = useState<DiscordStats>({
    memberCount: 120,
    onlineCount: 15,
    name: 'SkillCraft Community',
    description: 'Communauté de développeurs'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifier si on est sur une page autorisée pour le refresh
  // ✅ Gestion du cas où pathname peut être null
  const isRefreshAllowed = pathname ? allowedPaths.includes(pathname) : false;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/discord/stats');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des stats');
        }
        
        const data: DiscordStats = await response.json();
        setStats(data);
        
        if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Erreur useDiscordStats:', err);
      } finally {
        setLoading(false);
      }
    };

    // Toujours faire le fetch initial
    fetchStats();

    // Configurer l'auto-refresh seulement si autorisé
    let interval: NodeJS.Timeout | undefined;
    
    if (enableAutoRefresh && isRefreshAllowed) {
      interval = setInterval(fetchStats, refreshInterval * 60 * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [enableAutoRefresh, refreshInterval, isRefreshAllowed, pathname]);

  return { stats, loading, error, isRefreshAllowed };
};