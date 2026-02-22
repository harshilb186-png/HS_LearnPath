"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  GraduationCap, 
  Bell, 
  LogOut,
  User as UserIcon,
  LogIn,
  Video,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "Assessment", href: "/assessment", icon: UserCheck },
  { name: "Meet", href: "/meet", icon: Video },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.05] dark:border-white/[0.05] bg-background/60 backdrop-blur-3xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group transition-transform hover:scale-105">
          <div className="bg-primary p-2.5 rounded-2xl text-primary-foreground shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tighter hidden sm:inline-block text-foreground uppercase italic">
            HS LearnPath<span className="text-primary">+</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center bg-secondary/40 dark:bg-secondary/40 p-1.5 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                )}
              >
                <Icon size={14} className={cn(isActive ? "text-white" : "text-accent")} />
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent transition-colors">
            <Bell size={20} />
          </Button>
          
          {isUserLoading ? (
            <div className="h-11 w-11 rounded-2xl bg-secondary/40 animate-pulse border border-black/5 dark:border-white/5" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-2xl p-0 overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all border border-black/5 dark:border-white/10 bg-secondary/40 dark:bg-secondary/80">
                  <Avatar className="h-full w-full rounded-2xl">
                    <AvatarImage src={`https://picsum.photos/seed/${user.uid}/64/64`} alt={user.email || 'User'} />
                    <AvatarFallback className="bg-secondary"><UserIcon size={20} className="text-muted-foreground" /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 glass-card mt-3 rounded-2xl p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-foreground leading-none tracking-tight">{user.displayName || user.email?.split('@')[0]}</p>
                    <p className="text-[10px] leading-none text-muted-foreground font-mono opacity-60">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5 mx-2" />
                <DropdownMenuItem asChild className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer">
                  <Link href="/profile" className="flex w-full items-center">
                    <UserIcon className="mr-3 h-4 w-4 text-accent" />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-foreground">Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer">
                  <Link href="/settings" className="flex w-full items-center">
                    <Settings className="mr-3 h-4 w-4 text-accent" />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-foreground">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5 mx-2" />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:bg-destructive/10 p-3 rounded-xl cursor-pointer">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-bold text-[10px] uppercase tracking-widest">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="cyber-button bg-primary hover:bg-primary/90 rounded-full px-8 font-bold h-12 shadow-primary/20">
              <Link href="/auth" className="flex items-center gap-2">
                <LogIn size={18} />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
