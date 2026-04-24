import { useState, useEffect } from "react";
import { StatsRow } from "@/components/stats-row";
import { TaskCard, TaskStatus } from "@/components/task-card";
import { AgentFeed } from "@/components/agent-feed";
import { RemindersWidget } from "@/components/reminders-widget";
import { Bot, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface APITask {
  id: string;
  title: string;
  status: TaskStatus;
  progress: number;
  phase: string;
  deadline: string;
  subTasks?: SubTask[];
}

export function DashboardPage() {
  const [showAlert, setShowAlert] = useState(true);
  const [tasks, setTasks] = useState<APITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to connect to API, using prototype data.");
        // Fallback prototype data
        setTasks([
          {
            id: "1",
            title: "Draft Q3 Marketing Report",
            status: "In Progress",
            progress: 65,
            phase: "Data Analysis",
            deadline: "Today, 5:00 PM",
            subTasks: [
              { id: "st1", title: "Collect campaign metrics", completed: true },
              { id: "st2", title: "Analyze ROI data", completed: true },
              { id: "st3", title: "Draft executive summary", completed: false },
              { id: "st4", title: "Format charts", completed: false },
            ]
          },
          {
            id: "2",
            title: "Acme Corp Contract Renewal",
            status: "Awaiting Approval",
            progress: 90,
            phase: "Legal Review",
            deadline: "Tomorrow, 12:00 PM"
          },
          {
            id: "3",
            title: "Update Employee Handbook",
            status: "Pending",
            progress: 10,
            phase: "Initial Draft",
            deadline: "Oct 18, 2026"
          },
          {
            id: "4",
            title: "Server Migration Prep",
            status: "Done",
            progress: 100,
            phase: "Completed",
            deadline: "Oct 10, 2026"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {/* Adaptive Feedback Loop Alert */}
      {showAlert && (
        <div className="mb-8 border-2 border-border shadow-shadow bg-chart-2 rounded-base p-4 flex items-start justify-between transition-all">
          <div className="flex gap-4">
            <div className="bg-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] p-2 rounded-base shrink-0 h-fit">
              <Bot className="text-foreground h-5 w-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-2 flex items-center gap-2 text-lg">
                Adaptive Schedule Adjustment
                <span className="bg-background border-2 border-border text-foreground text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold shadow-[2px_2px_0_0_var(--border)]">Auto-Pilot</span>
              </h4>
              <p className="text-sm font-medium text-white/90 leading-relaxed max-w-3xl">
                <strong className="text-white">Schedule adjustment recommended.</strong> I noticed you are falling behind on the <strong>Update Employee Handbook</strong> task. 
                I have proactively extended the deadline by 3 days and broken it down into 4 smaller, manageable sub-tasks to ensure smooth completion.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowAlert(false)}
            className="bg-background border-2 border-border text-foreground hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all p-1.5 rounded-sm"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <StatsRow />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Tasks (approx 60%) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">Active Tasks</h2>
            <Button variant="outline" size="sm" className="font-bold">
              View All
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-chart-1 border-2 border-border shadow-[2px_2px_0_0_var(--border)] text-foreground font-bold text-sm rounded-base uppercase">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-main" />
              </div>
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id || index}
                  title={task.title}
                  status={task.status}
                  progress={task.progress}
                  phase={task.phase}
                  deadline={task.deadline}
                  isExpanded={index === 0}
                  subTasks={task.subTasks}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-secondary-background border-2 border-border border-dashed rounded-base font-bold text-foreground/50">
                No active tasks found.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Agent Feed & Reminders (approx 40%) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <AgentFeed />
          <RemindersWidget />
        </div>
      </div>
    </>
  );
}
