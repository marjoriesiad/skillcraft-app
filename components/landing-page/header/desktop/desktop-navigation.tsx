"use client";
import { navigationItems } from "@/lib/header/header-navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const DesktopNav = () => {
    return (
    <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="gap-6 xl:gap-8">
            {navigationItems.map((link) => (
                <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                        <Link href={link.href} className="hover:bg-secondary hover:text-white transition-color text-sm font-medium">{link.title}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
    )
}

export default DesktopNav;