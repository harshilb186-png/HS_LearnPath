
"use client";

import { useState, use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  FileText, 
  ListChecks, 
  MessageSquare,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { summarizeModuleContent } from "@/ai/flows/summarize-module-content";

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const module = MOCK_CURRICULUM.modules.find(m => m.id === id);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!module) {
    return <div>Module not found</div>;
  }

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const result = await summarizeModuleContent({ content: module.content });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to summarize:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link href="/curriculum" className="flex items-center gap-2">
            <ChevronLeft size={18} /> Back to Curriculum
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <header className="space-y-2">
              <h1 className="font-headline text-3xl font-bold">{module.title}</h1>
              <p className="text-xl text-muted-foreground">{module.description}</p>
            </header>

            <Card className="border-none shadow-none bg-transparent">
              <CardHeader className="px-0">
                <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm">
                  <FileText size={16} /> Full Content
                </div>
              </CardHeader>
              <CardContent className="px-0 prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {module.content}
                </p>
                <div className="mt-8 p-6 bg-muted rounded-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ListChecks className="text-secondary" /> Learning Objectives
                  </h3>
                  <ul className="space-y-3 list-none p-0">
                    <li className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                      Understand core concepts through hands-on practice.
                    </li>
                    <li className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                      Implement best practices in real-world scenarios.
                    </li>
                    <li className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2 shrink-0" />
                      Optimize workflows for scalability and performance.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area - AI Features */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="sticky top-24 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Study Assistant
                </CardTitle>
                <CardDescription>
                  Generate a concise summary of the key learning points.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary ? (
                  <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2">
                    <h4 className="font-bold text-sm uppercase text-primary">Key Takeaways</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      "{summary}"
                    </p>
                    <Separator />
                    <Button variant="ghost" size="sm" onClick={() => setSummary(null)} className="w-full">
                      Clear Summary
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={handleSummarize} 
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Summarize Key Points
                      </>
                    )}
                  </Button>
                )}
                
                <div className="pt-4 space-y-3">
                  <h4 className="font-bold text-sm uppercase text-muted-foreground tracking-widest px-1">Resources</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-3 text-left h-auto py-3">
                      <BookOpen size={18} className="text-secondary" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Reference Documentation</span>
                        <span className="text-xs text-muted-foreground">GitHub Repository Files</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 text-left h-auto py-3">
                      <MessageSquare size={18} className="text-primary" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Community Discussion</span>
                        <span className="text-xs text-muted-foreground">Share your thoughts</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
