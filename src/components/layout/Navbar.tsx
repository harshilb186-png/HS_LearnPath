
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, UserCheck, Settings, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "Assessment", href: "/assessment", icon: UserCheck },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
            <GraduationCap size={24} />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block">
            LearnPath <span className="text-secondary">Pro</span>
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary border-b-2 border-primary pb-1 mt-1" : "text-muted-foreground"
                )}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Settings size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-muted border border-border overflow-hidden">
            <img 
              src="https://picsum.photos/seed/user-42/32/32" 
              alt="User" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
