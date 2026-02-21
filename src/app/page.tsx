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
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Rocket
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
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
                  Advance Your <br /><span className="text-primary">Career Journey</span>
                </h1>
                <p className="max-w-md text-lg opacity-80 mb-8 leading-relaxed">
                  You've mastered 12 core skills this month. Keep the momentum going and reach your next milestone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                    <Link href="/curriculum">Resume Module 2</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white/5 border-white/20 hover:bg-white/10">
                    <Link href="/assessment">View Career Map</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 justify-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" /> Overall Progress
                    </p>
                    <span className="text-sm font-bold text-primary">{MOCK_CURRICULUM.totalProgress}%</span>
                  </div>
                  <Progress value={MOCK_CURRICULUM.totalProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Target Skills</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-secondary">12</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Completed</p>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" /> Daily Streak
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
                    <p className="text-[10px] text-muted-foreground mt-2">5 Day Win Streak! 🔥</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Active Modules */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" /> Active Learning
              </h2>
              <Button variant="ghost" asChild className="text-primary hover:text-primary/80">
                <Link href="/curriculum">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MOCK_CURRICULUM.modules.filter(m => m.status === 'in-progress' || m.status === 'completed').slice(0, 4).map((module) => (
                <Card key={module.id} className="group glass-card border-white/5 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                  <div className="h-2 bg-muted">
                    <div className={cn(
                      "h-full transition-all duration-1000",
                      module.status === 'completed' ? "bg-secondary w-full" : "bg-primary w-1/3"
                    )} />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={module.status === 'completed' ? 'secondary' : 'outline'} className="capitalize bg-opacity-10">
                        {module.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {module.duration}
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
                    <Button asChild variant="secondary" className="w-full group-hover:bg-primary group-hover:text-white">
                      <Link href={`/curriculum/${module.id}`}>
                        {module.status === 'completed' ? 'Review Content' : 'Continue Learning'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" /> AI Career Insights
                </CardTitle>
                <CardDescription>Based on your recent activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-3">
                  <p className="text-sm font-medium leading-relaxed">
                    "Your progress in <span className="text-primary">React Patterns</span> suggests you're ready to tackle <span className="text-primary">System Design</span> concepts."
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold" asChild>
                    <Link href="/assessment">Run New Assessment <ArrowRight className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Upcoming Goals</h4>
                  {[
                    { title: "Master XState Flow", date: "Today" },
                    { title: "Microservices Quiz", date: "Tomorrow" },
                    { title: "Terraform Lab", date: "Friday" }
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <Badge variant="outline" className="text-[10px] uppercase">{goal.date}</Badge>
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