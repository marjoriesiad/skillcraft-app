"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onOpenChange, onSwitchToRegister }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
      } else if (result?.ok) {
        onOpenChange(false);
        router.push("/workspace");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(provider, {
        callbackUrl: "/workspace",
        redirect: true,
      });
      onOpenChange(false);
    } catch (error) {
      setError("Erreur lors de la connexion avec " + provider);
      console.error("Erreur OAuth:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold text-center mb-2">
            Connexion
          </DialogTitle>
          <p className="text-white/60 text-center text-sm">
            Connectez-vous à votre compte SkillCraft
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              Continuer avec Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              Continuer avec GitHub
            </Button>
          </div>

          <div className="relative">
            <Separator className="bg-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-primary px-2 text-white/60 text-sm">ou</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm">
                Adresse e-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-secondary border-secondary text-white placeholder:text-white/50"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-secondary border-secondary text-white placeholder:text-white/50 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-white/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-white/60" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-terra-primary to-terra-secondary text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                onOpenChange(false);
                router.push("/forgot-password");
              }}
              className="text-terra-primary hover:text-terra-secondary text-sm transition-colors"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <Separator className="bg-secondary" />

          <div className="text-center">
            <p className="text-white/60 text-sm">
              Pas encore de compte ?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-terra-primary hover:text-terra-secondary font-semibold transition-colors"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};