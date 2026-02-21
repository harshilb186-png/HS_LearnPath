"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, UserCheck, Settings, GraduationCap, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "Assessment", href: "/assessment", icon: UserCheck },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground shadow-lg shadow-primary/25">
            <GraduationCap size={24} />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block">
            LearnPath <span className="text-primary">Pro</span>
          </span>
        </Link>

        <nav className="flex items-center bg-white/5 p-1 rounded-full border border-white/10">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-primary hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hidden sm:flex">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Settings size={20} />
          </Button>
          <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all p-0.5">
            <img 
              src="https://picsum.photos/seed/user-42/64/64" 
              alt="User" 
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}