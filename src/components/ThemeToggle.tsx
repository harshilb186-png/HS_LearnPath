
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
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors h-11 w-11 rounded-2xl border border-white/10 bg-secondary/80">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card mt-3 rounded-2xl p-2 border-white/10">
        <DropdownMenuItem onClick={() => setTheme("light")} className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer">
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground dark:text-white">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer">
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground dark:text-white">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="focus:bg-primary/10 p-3 rounded-xl cursor-pointer">
          <span className="font-bold text-[10px] uppercase tracking-widest text-foreground dark:text-white">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
