'use client';

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Activity, AlertCircle, TrendingUp, Code, MessageCircle } from 'lucide-react'
import Image from 'next/image';
import { useDiscordStats } from '@/hooks/use-discord-stats'

const CommunitySection = () => {
  // ✅ Utiliser le hook mis à jour avec auto-refresh conditionnel
  const { stats, loading, error, isRefreshAllowed } = useDiscordStats({
    enableAutoRefresh: true,
    refreshInterval: 3, // 3 minutes
    allowedPaths: ['/'] // Seulement sur la page d'accueil
  });

  // URL d'invitation Discord
  const discordInviteUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL;

  const handleJoinDiscord = () => {
    window.open(discordInviteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id='community'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Contenu gauche */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Votre parcours de{' '}
            <span className="bg-gradient-to-r from-terra-primary to-terra-secondary bg-clip-text text-transparent">
              développeur
            </span>{' '}
            mérite mieux
          </h2>
          
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Vous apprenez à coder, mais quelque chose manque. Les tutoriels, 
              c&apos;est bien. Les projets solo, c&apos;est un début. Mais la vraie magie opère 
              quand on code <span className="text-white font-semibold">ensemble</span>.
            </p>
            
            <p>
              SkillCraft vous connecte avec d&apos;autres développeurs passionnés 
              pour créer de vrais projets, apprendre Git en situation réelle, et 
              développer les soft skills qu&apos;aucun cours ne peut enseigner.
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-terra-primary">
            <div className="w-6 h-6 bg-terra-primary rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg font-semibold">
              Une communauté, pas juste une plateforme
            </span>
          </div>
        </div>
        
        {/* Discord Community droite */}
        <div className="relative">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm p-8 relative overflow-hidden">
            <CardContent className="p-0">
              {/* Badge Discord avec status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative">
                    {stats.icon ? (
                      <>
                        <Image 
                          src={stats.icon} 
                          width={48}
                          height={48}
                          alt={`Icône du serveur ${stats.name}`}
                          className="w-12 h-12 rounded-xl object-cover"
                          unoptimized={true}
                          onError={(e) => {
                            // Fallback vers l'icône Discord en cas d'erreur
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center" style={{ display: 'none' }}>
                          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0094 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0094 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                        </svg>
                      </div>
                    )}
                    {/* Indicateur en ligne */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{stats.name}</h3>
                    <p className="text-slate-400 text-sm">Communauté active</p>
                  </div>
                </div>
                
                {error && (
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-400">Mode hors ligne</span>
                  </div>
                )}
              </div>

              {/* Stats de la communauté */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-terra-primary/20 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-terra-primary" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        {loading ? '...' : stats.memberCount.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-xs">Membres</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>En croissance</span>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        {loading ? '...' : stats.onlineCount}
                      </div>
                      <div className="text-slate-400 text-xs">En ligne</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Maintenant</span>
                  </div>
                </div>
              </div>

              {/* Activités de la communauté */}
              <div className="bg-slate-900/50 rounded-xl p-4 mb-6 border border-slate-700/50">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-terra-primary" />
                  Ce qui vous attend
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-slate-300">Sessions de pair programming</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-slate-300">Projets collaboratifs</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-orange-400" />
                    </div>
                    <span className="text-slate-300">Mentoring et conseils</span>
                  </div>
                </div>
              </div>
              
              {/* Bouton Discord */}
              <Button 
                onClick={handleJoinDiscord}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-all duration-200 flex items-center gap-2 group h-12"
              >
                <span>Rejoindre la communauté Discord</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {/* ✅ Indicateur de statut mis à jour */}
              <div className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : error ? 'bg-red-400' : 'bg-green-400'}`}></div>
                <span>
                  {loading ? 'Mise à jour...' : 
                   error ? 'Données en cache' : 
                   isRefreshAllowed ? 'Mise à jour auto' : 'Données statiques'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  )
}

export default CommunitySection