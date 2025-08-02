'use client';

import { useState } from 'react';
import { Heart, Crown, Shield, ChevronRight, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ContributionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContributionsModal({ open, onOpenChange }: ContributionsModalProps) {
  const [donationType, setDonationType] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');

  const predefinedAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const getCurrentAmount = () => {
    return customAmount || amount;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        showCloseButton={false}
        className="!w-[calc(100vw-1rem)] !max-w-[calc(100vw-1rem)] h-[95vh] overflow-hidden p-0 !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 sm:!w-[calc(100vw-2rem)] sm:!max-w-[calc(90vw-2rem)] sm:h-[90vh]" 
        style={{ 
          backgroundColor: 'var(--color-primary)', 
          border: '1px solid var(--color-secondary)'
        }}
      >
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-terra-primary)' }}>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-lg sm:text-2xl font-bold text-white">
                  Soutenez{' '}
                  <span className="bg-gradient-to-r from-terra-primary to-terra-secondary bg-clip-text text-transparent">
                    SkillCraft
                  </span>
                </DialogTitle>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 hidden sm:block">
                  Votre soutien nous aide à maintenir et améliorer la plateforme
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="text-slate-400 hover:text-white flex-shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6 overflow-y-auto flex-1">
          {/* Important notice */}
          <div className="mb-4 sm:mb-6 p-3 rounded-lg border border-green-500/20" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="font-semibold text-sm">100% Gratuit pour tous</span>
            </div>
            <p className="text-xs text-slate-300 text-center">
              SkillCraft reste entièrement gratuite. Votre contribution est volontaire et ne limite aucun accès.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Donation Form */}
            <div>
              <Card style={{ backgroundColor: 'var(--color-secondary)', border: '1px solid var(--color-secondary)' }}>
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <CardTitle className="text-white flex items-center gap-2 text-base sm:text-lg">
                    <Heart className="w-4 h-4 text-terra-primary" />
                    Faire une contribution
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-sm">
                    Choisissez le montant et la fréquence
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  {/* Donation Type Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg gap-2 sm:gap-0" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium text-sm">
                        {donationType === 'once' ? 'Don unique' : 'Don mensuel'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-300">Une fois</span>
                      <Switch
                        checked={donationType === 'monthly'}
                        onCheckedChange={(checked) => setDonationType(checked ? 'monthly' : 'once')}
                      />
                      <span className="text-xs text-slate-300">Mensuel</span>
                    </div>
                  </div>

                  {/* Predefined Amounts */}
                  <div>
                    <label className="text-white font-medium mb-2 block text-sm">Montant</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                      {predefinedAmounts.map((value) => (
                        <Button
                          key={value}
                          variant={amount === value.toString() ? "default" : "outline"}
                          onClick={() => handleAmountSelect(value)}
                          className={`h-10 text-sm ${amount === value.toString() 
                            ? 'bg-terra-primary hover:bg-terra-primary/90 text-white border-terra-primary' 
                            : 'border-slate-600 text-slate-300 hover:border-terra-primary hover:text-terra-primary'
                          }`}
                        >
                          {value}€
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="text-white font-medium mb-2 block text-sm">Ou montant personnalisé</label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Montant en €"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 pr-8 h-10"
                        min="1"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">€</span>
                    </div>
                  </div>

                  {/* Summary */}
                  {getCurrentAmount() && (
                    <div className="p-3 rounded-lg border border-terra-primary/30" style={{ backgroundColor: 'rgba(205, 133, 63, 0.1)' }}>
                      <div className="flex items-center justify-between text-white">
                        <span className="font-medium text-sm">
                          {donationType === 'once' ? 'Don unique de' : 'Don mensuel de'}
                        </span>
                        <span className="text-lg font-bold text-terra-primary">
                          {getCurrentAmount()}€
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {donationType === 'monthly' 
                          ? 'Prélèvement automatique, annulable à tout moment' 
                          : 'Avantages valables 1 mois'
                        }
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button 
                    disabled={!getCurrentAmount()}
                    className="w-full h-10 bg-gradient-to-r from-terra-primary to-terra-secondary hover:from-terra-primary/90 hover:to-terra-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {getCurrentAmount() 
                      ? `Contribuer ${getCurrentAmount()}€${donationType === 'monthly' ? '/mois' : ''}`
                      : 'Choisissez un montant'
                    }
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-slate-400 text-center">
                    Paiement sécurisé • Aucune donnée bancaire stockée
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Rewards */}
            <div className="mt-6 lg:mt-0">
              <h2 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-terra-primary" />
                Récompenses exclusives
              </h2>
              
              {/* Simple list of rewards */}
              <Card style={{ backgroundColor: 'var(--color-secondary)', border: '1px solid var(--color-secondary)' }}>
                <CardContent className="p-3 sm:p-4">
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-white font-medium">Badge Contributeur</span>
                        <span className="text-slate-400 hidden sm:inline">-</span>
                        <span>Badge spécial sur votre profil</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-white font-medium">Personnalisation</span>
                        <span className="text-slate-400 hidden sm:inline">-</span>
                        <span>Thèmes exclusifs et options avancées</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-white font-medium">Support prioritaire</span>
                        <span className="text-slate-400 hidden sm:inline">-</span>
                        <span>Réponses privilégiées</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-white font-medium">Accès anticipé</span>
                        <span className="text-slate-400 hidden sm:inline">-</span>
                        <span>Nouvelles fonctionnalités en avant-première</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="mt-3" style={{ backgroundColor: 'var(--color-secondary)', border: '1px solid var(--color-secondary)' }}>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400" />
                    Conditions
                  </h3>
                  
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <span><strong className="text-white">Tous les avantages débloqués</strong> peu importe le montant de votre contribution</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <span><strong className="text-white">Don unique :</strong> vous gardez tous les avantages pendant 1 mois complet</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <span><strong className="text-white">Don mensuel :</strong> avantages permanents tant que l&apos;abonnement est actif</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-terra-primary flex-shrink-0 mt-1.5"></div>
                      <span>La plateforme reste <strong className="text-white">100% gratuite</strong> pour tous les utilisateurs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}