import { NextResponse } from 'next/server';
import { DiscordStats } from '@/types/landing-page';

export async function GET() {
  try {
    const botUrl = process.env.DISCORD_BOT_URL;
    
    if (!botUrl) {
      throw new Error('DISCORD_BOT_URL non configurée');
    }

    // Récupérer les stats depuis le bot Discord
    const response = await fetch(`${botUrl}/api/discord/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur bot Discord: ${response.status}`);
    }

    const botStats = await response.json();
    
    const stats: DiscordStats = {
      memberCount: botStats.memberCount || 0,
      onlineCount: botStats.onlineCount || 0,
      name: botStats.name || 'SkillCraft Community',
      description: botStats.description || 'Communauté de développeurs',
      icon: botStats.icon || null
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur API Discord stats:', error);
    
    // Retourner des stats par défaut en cas d'erreur
    const errorStats: DiscordStats = {
      memberCount: 120,
      onlineCount: 15,
      name: 'SkillCraft Community',
      description: 'Communauté de développeurs',
      error: 'Bot Discord temporairement indisponible'
    };

    return NextResponse.json(errorStats, { status: 200 });
  }
}