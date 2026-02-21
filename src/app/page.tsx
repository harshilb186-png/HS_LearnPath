
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  TrendingUp, 
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Rocket,
  Clock
} from "lucide-react";
import Link from "next/link";
import { MOCK_CURRICULUM } from "@/lib/curriculum-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-learning');

  return (
    <div className="min-h-screen flex flex-col bg-background hero-gradient">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-12">
        {/* Welcome Section */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 glass-card rounded-3xl p-1 overflow-hidden">
            <div className="lg:col-span-2 relative h-[400px] rounded-2xl overflow-hidden m-1">
              <img 
                src={heroImage?.imageUrl} 
                alt="Hero" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="learning education"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-12 text-white">
                <Badge className="w-fit mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                  <Rocket className="w-3 h-3 mr-1" /> Current Path: {MOCK_CURRICULUM.title}
                </Badge>
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Accelerate Your <br /><span className="text-primary italic">HS LearnPath+</span>
                </h1>
                <p className="max-w-md text-lg opacity-80 mb-8 leading-relaxed font-medium">
                  Experience AI-powered career growth. Master new skills and navigate your professional journey with precision.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 rounded-full px-8">
                    <Link href="/curriculum">Resume Learning</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10 rounded-full px-8">
                    <Link href="/assessment">Skill Analysis</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 justify-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Overall Mastery
                    </p>
                    <span className="text-sm font-bold text-primary">{MOCK_CURRICULUM.totalProgress}%</span>
                  </div>
                  <Progress value={MOCK_CURRICULUM.totalProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Target Skills</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Completed</p>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20 border-2">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Daily Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className={cn(
                          "h-1.5 flex-1 rounded-full",
                          i <= 5 ? "bg-primary" : "bg-muted"
                        )} />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-primary mt-2 uppercase tracking-widest">5 Day Learning Streak! 🔥</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-primary" /> Learning Dashboard
              </h2>
              <Button variant="ghost" asChild className="text-primary hover:text-primary/80 font-bold uppercase text-xs tracking-widest">
                <Link href="/curriculum" className="flex items-center gap-2">View Full Path <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MOCK_CURRICULUM.modules.slice(0, 4).map((module) => (
                <Card key={module.id} className="group glass-card border-white/5 hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="h-1.5 bg-muted">
                    <div className={cn(
                      "h-full transition-all duration-1000",
                      module.status === 'completed' ? "bg-primary w-full" : 
                      module.status === 'in-progress' ? "bg-primary w-1/3" : "w-0"
                    )} />
                  </div>
                  <CardHeader className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant={module.status === 'completed' ? 'secondary' : 'outline'} className="capitalize px-3 py-0.5">
                        {module.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-bold">
                        <Clock className="w-3 h-3" /> {module.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors font-headline">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <Button asChild variant="secondary" className="w-full rounded-full font-bold uppercase text-xs tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                      <Link href={`/curriculum/${module.id}`}>
                        {module.status === 'completed' ? 'Review' : 'Continue'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <Card className="glass-card border-primary/20 sticky top-24 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" /> AI Insights
                </CardTitle>
                <CardDescription>Hyper-personalized for your goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit size={48} />
                  </div>
                  <p className="text-sm font-medium leading-relaxed relative z-10">
                    "Based on your performance in <span className="text-primary font-bold">React Patterns</span>, you possess the prerequisites for <span className="text-primary font-bold">System Design</span>."
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold uppercase tracking-widest" asChild>
                    <Link href="/assessment" className="flex items-center gap-1">Update Map <ArrowRight className="w-3 h-3" /></Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">Upcoming Milestones</h4>
                  {[
                    { title: "Master XState Flow", date: "Today" },
                    { title: "Distributed Systems Quiz", date: "May 12" },
                    { title: "Cloud Architecture Lab", date: "May 15" }
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <Badge variant="outline" className="text-[9px] uppercase font-bold bg-primary/5">{goal.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
