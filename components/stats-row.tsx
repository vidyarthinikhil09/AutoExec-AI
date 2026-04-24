import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Clock, AlertCircle, ListTodo, Loader2 } from "lucide-react";

interface DashboardStats {
  tasksToday: number;
  inProgress: number;
  completed: number;
  pendingApproval: number;
}

const FALLBACK_STATS: DashboardStats = {
  tasksToday: 12,
  inProgress: 4,
  completed: 7,
  pendingApproval: 3,
};

export function StatsRow() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/dashboard/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(FALLBACK_STATS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-[105px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-main" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1: Tasks Today */}
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-heading font-bold text-foreground mb-1 uppercase tracking-wider">Tasks Today</p>
            <h3 className="text-4xl font-bold font-heading text-foreground">{stats.tasksToday}</h3>
          </div>
          <div className="h-12 w-12 rounded-base bg-chart-2 border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center">
            <ListTodo className="text-white" size={24} />
          </div>
        </CardContent>
      </Card>

      {/* Card 2: In Progress */}
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-heading font-bold text-foreground uppercase tracking-wider">In Progress</p>
            </div>
            <h3 className="text-4xl font-bold font-heading text-foreground">{stats.inProgress}</h3>
          </div>
          <div className="h-12 w-12 rounded-base bg-chart-1 border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center">
            <Clock className="text-foreground" size={24} />
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Completed */}
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-heading font-bold text-foreground mb-1 uppercase tracking-wider">Completed</p>
            <h3 className="text-4xl font-bold font-heading text-foreground">{stats.completed}</h3>
          </div>
          <div className="h-12 w-12 rounded-base bg-chart-4 border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center">
            <CheckCircle2 className="text-white" size={24} />
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Pending Approval */}
      <Card className="bg-main">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-heading font-bold text-main-foreground uppercase tracking-wider">Approvals</p>
            </div>
            <h3 className="text-4xl font-bold font-heading text-main-foreground">{stats.pendingApproval}</h3>
          </div>
          <div className="h-12 w-12 rounded-base bg-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center">
            <AlertCircle className="text-foreground" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
