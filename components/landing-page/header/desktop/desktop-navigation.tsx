"use client";
import { navigationItems } from "@/lib/header/header-navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DesktopNav = () => {
    return (
    <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex flex-row gap-6 xl:gap-8">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "hover:bg-secondary hover:text-white transition-colors duration-200 text-sm font-medium",
                      "cursor-pointer"
                    )}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

    )
}

export default DesktopNav;