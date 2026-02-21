
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  TrendingUp, 
  Award,
  Zap
} from "lucide-react";
import Link from "next/link";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-learning');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heroImage?.imageUrl} 
                alt="Hero" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-center p-8 text-white">
                <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Welcome back, Explorer!</h1>
                <p className="max-w-md text-lg opacity-90 mb-6">You're making great progress on your {MOCK_CURRICULUM.title} journey.</p>
                <div className="flex gap-4">
                  <Button asChild className="bg-secondary hover:bg-secondary/90 border-none text-white">
                    <Link href="/curriculum">Resume Learning</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_CURRICULUM.totalProgress}%</div>
                  <Progress value={MOCK_CURRICULUM.totalProgress} className="h-2 mt-4" />
                  <p className="text-xs text-muted-foreground mt-2">
                    +5% from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                  <Award className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 / 45</div>
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Next milestone: Cloud Architect
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                Daily Challenges
              </CardTitle>
              <CardDescription>Keep your streak alive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Summarize 1 Module", done: true },
                { label: "Complete 2 Lessons", done: false },
                { label: "Take Skill Assessment", done: false }
              ].map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={cn("text-sm font-medium", task.done && "line-through text-muted-foreground")}>
                    {task.label}
                  </span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Modules */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold">In Progress</h2>
            <Button variant="link" asChild>
              <Link href="/curriculum" className="flex items-center gap-1">
                View Full Curriculum <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CURRICULUM.modules.filter(m => m.status !== 'remaining').map((module) => (
              <Card key={module.id} className="group hover:border-primary transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={module.status === 'completed' ? 'secondary' : 'outline'} className="capitalize">
                      {module.status.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {module.duration}
                    </span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-white">
                    <Link href={`/curriculum/${module.id}`}>
                      Continue <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
