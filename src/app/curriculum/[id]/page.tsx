"use client";

import { useState, use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();

  // Fetch Learning Path from Firestore
  const lpRef = useMemoFirebase(() => doc(db, "learningPaths", id), [db, id]);
  const { data: learningPath, isLoading: isLpLoading } = useDoc(lpRef);

  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (isLpLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!learningPath) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <BookOpen className="h-16 w-16 text-muted-foreground opacity-20" />
          <h1 className="text-2xl font-bold font-headline">Course not found</h1>
          <p className="text-muted-foreground">The learning journey you're looking for doesn't exist or has been removed.</p>
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href="/curriculum">Back to Catalog</Link>
          </Button>
        </main>
      </div>
    );
  }

  const handleSummarize = async () => {
    if (!learningPath.description) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeModuleContent({ content: learningPath.description });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to summarize:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" asChild className="mb-6 -ml-2 text-muted-foreground hover:text-primary transition-colors">
          <Link href="/curriculum" className="flex items-center gap-2">
            <ChevronLeft size={18} /> Back to Catalog
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h1 className="font-headline text-4xl font-bold tracking-tight">{learningPath.name}</h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">{learningPath.description}</p>
            </header>

            <Separator className="bg-white/5" />

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2 font-headline">
                  <FileText className="text-secondary" /> Course Content
                </h2>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {learningPath.moduleIds?.length || 0} Modules
                </span>
              </div>

              <div className="space-y-4">
                {learningPath.moduleIds && learningPath.moduleIds.length > 0 ? (
                  <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl text-center space-y-3">
                    <p className="text-muted-foreground font-medium">Modules are being indexed and will appear here shortly.</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest opacity-50">Syncing with source: {new URL(learningPath.sourceUrl).hostname}</p>
                  </div>
                ) : (
                  <Card className="glass-card border-dashed border-white/10 bg-transparent rounded-3xl">
                    <CardContent className="p-16 text-center space-y-6">
                      <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10">
                        <ListChecks className="h-10 w-10 text-muted-foreground opacity-30" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-bold font-headline">Syllabus Incoming</p>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                          Our educators are currently structuring the curriculum for this learning journey. Check back soon!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area - AI Features */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="sticky top-24 glass-card border-primary/20 shadow-2xl overflow-hidden rounded-3xl">
              <div className="h-2 bg-primary" />
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Course Overview
                </CardTitle>
                <CardDescription className="text-sm">
                  Generate a high-level summary of this learning journey's core value proposition.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {summary ? (
                  <div className="bg-primary/10 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 shadow-inner space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Core Objectives</h4>
                      <Button variant="ghost" size="sm" onClick={() => setSummary(null)} className="h-7 text-[10px] uppercase font-bold hover:bg-primary/20 px-2">
                        Reset
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground italic font-medium">
                      "{summary}"
                    </p>
                  </div>
                ) : (
                  <Button 
                    onClick={handleSummarize} 
                    disabled={isSummarizing}
                    className="w-full bg-primary hover:bg-primary/90 py-7 text-lg font-bold shadow-xl shadow-primary/25 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isSummarizing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Journey...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Roadmap
                      </>
                    )}
                  </Button>
                )}
                
                <div className="pt-4 space-y-4">
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-1">Reference Material</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-4 text-left h-auto py-5 bg-white/5 border-white/5 hover:bg-white/10 hover:border-primary/40 transition-all group rounded-2xl" asChild>
                      <a href={learningPath.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <div className="bg-secondary/20 p-2.5 rounded-xl group-hover:bg-secondary/40 transition-colors">
                          <BookOpen size={18} className="text-secondary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">Source Repository</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">GitHub Documentation</span>
                        </div>
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-4 text-left h-auto py-5 bg-white/5 border-white/5 hover:bg-white/10 hover:border-primary/40 transition-all group rounded-2xl">
                      <div className="bg-primary/20 p-2.5 rounded-xl group-hover:bg-primary/40 transition-colors">
                        <MessageSquare size={18} className="text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">Peer Discussion</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Share Your Journey</span>
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