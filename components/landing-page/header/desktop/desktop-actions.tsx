// Boutons & infos utilisateurs du header
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown, User, LogOut } from "lucide-react";
import { getDisplayName } from "@/lib/header/header-navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
    session: Session | null;
    status: "loading" | "authenticated" | "unauthenticated";
    openModal: (type: "login" | "register" | "contrib") => void;
}

const DesktopActions: React.FC<Props> = ({ session, status, openModal }) => {
    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/"});
        } catch(err){
            console.error("Erreur lors de la déconnexion", err);
        }
    };

return (
    <div className="hidden lg:flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openModal("contrib")}
        className="text-terra-primary hover:text-terra-secondary hover:bg-terra-primary/10"
        title="Soutenir SkillCraft"
      >
        <Crown className="w-5 h-5" />
      </Button>

      {status === "loading" ? (
        <Button
          disabled
          className="border border-slate-600 text-slate-400 bg-transparent cursor-not-allowed"
        >
          Chargement…
        </Button>
      ) : session ? (
        <>
          <Link href="/workspace">
            <Button className="border border-terra-primary/50 text-terra-primary hover:bg-terra-primary/10 hover:border-terra-primary bg-transparent font-medium px-6">
              Workspace
            </Button>
          </Link>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-slate-600">
            <User className="h-4 w-4 text-terra-primary" />
            <span className="text-sm text-white font-medium">
              {getDisplayName(session.user)}
            </span>
          </div>

          <Button
            onClick={handleSignOut}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg px-6"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </>
      ) : (
        <Button
          onClick={() => openModal("login")}
          className="border border-terra-primary text-terra-primary hover:bg-terra-primary hover:text-white rounded-lg px-6"
        >
          Connexion
        </Button>
      )}
    </div>
  );
}

export default DesktopActions;