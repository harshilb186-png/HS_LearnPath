"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Rocket, Link as LinkIcon, FileText, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useFirestore, useUser, useDoc, useMemoFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

export default function NewCoursePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUser();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  // Fetch user profile to check role
  const profileRef = useMemoFirebase(() => {
    return user ? doc(db, "users", user.uid) : null;
  }, [db, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  useEffect(() => {
    if (!isProfileLoading && profile && profile.role !== 'Admin' && profile.role !== 'Teacher') {
      router.push("/curriculum");
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only staff can create courses.",
      });
    }
  }, [profile, isProfileLoading, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !sourceUrl) return;

    setIsSubmitting(true);

    const pathData = {
      name,
      description,
      sourceUrl,
      careerPathIds: [],
      moduleIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      addDocumentNonBlocking(collection(db, "learningPaths"), pathData);
      
      toast({
        title: "Course created!",
        description: `${name} has been added to the catalog.`,
      });
      
      router.push("/curriculum");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" asChild className="mb-6 -ml-2 text-muted-foreground hover:text-primary">
          <Link href="/curriculum" className="flex items-center gap-2">
            <ChevronLeft size={18} /> Back to Catalog
          </Link>
        </Button>

        <Card className="glass-card border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-2 pb-8 border-b border-white/5">
            <div className="mx-auto bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
              <Rocket className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">New Learning Journey</CardTitle>
            <CardDescription>
              Design a structured path to help students reach their professional goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" /> Course Title
                </Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Masterclass: Cloud Infrastructure" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-primary py-6 text-lg"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText size={16} className="text-primary" /> Comprehensive Description
                </Label>
                <Textarea 
                  id="description" 
                  placeholder="What will students achieve by the end of this course?" 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-primary text-lg resize-none"
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url" className="flex items-center gap-2">
                  <LinkIcon size={16} className="text-primary" /> Source Content URL
                </Label>
                <Input 
                  id="url" 
                  type="url"
                  placeholder="https://github.com/org/repo/docs" 
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-primary py-6 text-lg"
                  required 
                />
                <p className="text-[10px] text-muted-foreground italic px-1">
                  * Primary source for module ingestion and AI indexing.
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-8 text-xl font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Publishing Course...
                    </>
                  ) : (
                    "Publish Course Catalog"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}