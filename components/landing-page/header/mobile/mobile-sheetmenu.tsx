"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Crown, Menu, User, LogOut } from "lucide-react";
import { getDisplayName, navigationItems } from "@/lib/header/header-navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  openModal: (type: "login" | "register" | "contrib") => void;
}

const MobileSheetMenu: React.FC<Props> = ({ open, onOpenChange, session, status, openModal }) => {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-primary">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96 bg-primary border-slate-700 flex flex-col gap-6 mt-8">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 text-white">
            <span className="text-terra-primary text-xl font-bold">SkillCraft</span>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => onOpenChange(false)}
              className="text-left p-4 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-medium"
            >
              {item.title}
            </Link>
          ))}

          <button
            onClick={() => {
              onOpenChange(false);
              openModal("contrib");
            }}
            className="text-left p-4 rounded-lg hover:bg-slate-800 text-terra-primary hover:text-terra-secondary font-medium flex items-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Soutenir SkillCraft
          </button>
        </nav>

        <Separator className="my-2 bg-slate-700" />

        {/* User section */}
        {status === "loading" ? (
          <div className="text-center text-slate-400 py-4 animate-pulse">Chargement…</div>
        ) : session ? (
          <div className="w-5/6 mx-auto space-y-3">
            {/* Profil */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-slate-600">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-terra-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-terra-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {getDisplayName(session.user)}
                </p>
                <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/workspace"
                onClick={() => onOpenChange(false)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-terra-primary/50 text-terra-primary hover:bg-terra-primary/10 hover:border-terra-primary font-medium"
              >
                Workspace
              </Link>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  handleSignOut();
                }}
                className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 w-5/6 mx-auto">
            <Button
              className="w-full p-4 border border-terra-primary text-terra-primary hover:bg-terra-primary hover:text-black font-medium"
              onClick={() => {
                onOpenChange(false);
                openModal("login");
              }}
            >
              Se connecter
            </Button>
            <p className="text-xs text-slate-400 text-center">Connectez-vous pour accéder à toutes les fonctionnalités</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default MobileSheetMenu;