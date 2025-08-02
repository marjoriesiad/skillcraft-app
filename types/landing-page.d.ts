export interface DiscordStats {
  memberCount: number;
  onlineCount: number;
  name: string;
  description?: string;
  icon?: string | null;
  error?: string;
}

export interface UseDiscordStatsOptions {
  enableAutoRefresh?: boolean;
  refreshInterval?: number; // en minutes
  allowedPaths?: string[];
}

export interface PlatformStats {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalSkills: number;
  loading: boolean;
  error?: string;
}