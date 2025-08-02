"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'envoi - vous pouvez remplacer par votre logique d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Message envoyé:", formData);
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      onOpenChange(false);
      // TODO: Ajouter notification de succès
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      // TODO: Ajouter notification d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-terra-primary mb-2 flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Contactez-nous
          </DialogTitle>
          <p className="text-gray-400 mb-6">
            Une question, une suggestion, ou simplement envie de dire bonjour ?
            N&apos;hésitez pas à nous écrire via ce formulaire.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                Pseudo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-secondary border-secondary text-white placeholder:text-white/50"
                placeholder="Votre pseudo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm flex items-center gap-2">
                <Mail className="h-4 w-4" />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Sujet
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className="bg-secondary border-secondary text-white placeholder:text-white/50"
              placeholder="Objet de votre message"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white text-sm">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full min-h-32 px-3 py-2 bg-secondary border border-secondary rounded-md text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-terra-primary"
              placeholder="Décrivez votre demande, problème ou suggestion..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="border border-white/30 text-white/30 hover:bg-secondary/10 cursor-pointer"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-terra-primary to-terra-secondary text-white font-semibold cursor-pointer"
              disabled={true}
            >
              {isLoading ? "Envoi..." : "Envoyer le message"}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-secondary">
          <p className="text-center text-gray-400 text-sm">
            Vous pouvez aussi nous écrire directement à{" "}
            <a href="mailto:contact@skillcraft.dev" className="text-terra-primary hover:text-terra-secondary">
              contact@skillcraft.dev
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};