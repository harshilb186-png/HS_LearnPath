"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-all h-11 w-11 rounded-2xl border border-black/5 dark:border-white/10 bg-secondary/40 dark:bg-secondary/80 backdrop-blur-md">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card mt-3 rounded-2xl p-2 border-black/10 dark:border-white/10 min-w-[120px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer flex items-center justify-between group">
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground">Light</span>
          <Sun size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer flex items-center justify-between group">
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground">Dark</span>
          <Moon size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
