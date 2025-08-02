// Menu latéral mobile et contrôle via props

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navigationItems } from "@/lib/header/header-navigation";
import { Crown, Menu } from "lucide-react";
import Link from "next/link";

interface Props {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    status: "loading" | "authenticated" | "unauthenticated";
    openModal: (type: "login" | "register" | "contribution") => void;
}

const MobileSheetMenu: React.FC<Props> = ({ open, onOpenChange, status, openModal}) => {
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

                <nav className="flex flex-col gap-2">
                    {navigationItems.map((link) => (
                        <Link href={link.href} key={link.href} onClick={() => onOpenChange(false)}
                        className="text-left p-4 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white font-medium">{link.title}</Link>
                    ))};

                    <Button onClick={()=> {onOpenChange(false); openModal("contribution")}} className="text-left p-4 rounded-lg hover:bg-slate-800 text-terra-primary hover:text-terra-secondary font-medium flex items-center gap-2" title="Soutenir SkillCraft">
                        <Crown className="h-4 w-4" />
                    </Button>
                </nav>

                <Separator className="my-2 bg-secondary" />

                {/*TODO: Ajouter les informations utilisateurs & les actions */}

                
            </SheetContent>
        </Sheet>
    )
}

export default MobileSheetMenu;