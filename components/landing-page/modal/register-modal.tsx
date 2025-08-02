"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { Eye, EyeOff } from "lucide-react";


interface RegisterModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onOpenChange, onSwitchToLogin }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Inscription avec l'API next-auth
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`.trim() || formData.username,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Connecter automatiquement après inscription
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          onOpenChange(false);
          router.push("/workspace");
        }
      } else {
        console.error("Erreur d'inscription:", data.error);
        // TODO: Ajouter un état d'erreur et l'afficher à l'utilisateur
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { 
        callbackUrl: "/workspace",
        redirect: true 
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur OAuth:", error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-md" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <DialogHeader>
          <DialogTitle className="text-white text-2xl font-bold text-center mb-2">
            Inscription
          </DialogTitle>
          <p className="text-white/60 text-center text-sm">
            Créez votre compte SkillCraft
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Boutons OAuth */}
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
              className="w-full bg-gray-900 hover:bg-gray-800 text-white border-gray-600"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
            >
              Continuer avec GitHub
            </Button>
          </div>

          {/* Séparateur */}
          <div className="relative">
            <Separator className="bg-secondary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-primary px-2 text-white/60 text-sm">ou</span>
            </div>
          </div>

          {/* Formulaire d'inscription */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-sm">
                Pseudo (visible publiquement)
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-secondary border-secondary text-white placeholder:text-white/50"
                placeholder="votre_pseudo"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white text-sm">
                  Prénom (privé)
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-secondary border-secondary text-white placeholder:text-white/50"
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white text-sm">
                  Nom (privé)
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-secondary border-secondary text-white placeholder:text-white/50"
                  placeholder="Nom"
                  required
                />
              </div>
            </div>

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
              className="w-full bg-gradient-to-r from-terra-primary to-terra-secondary hover:from-terra-primary/90 hover:to-terra-secondary/90 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <Separator className="bg-secondary" />

          <div className="text-center">
            <p className="text-white/60 text-sm">
              Déjà un compte ?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-terra-primary hover:text-terra-secondary font-semibold transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};