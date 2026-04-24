import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TaskCard, TaskStatus } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2, XCircle } from "lucide-react";

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

export function MyTasksPage() {
  const [tasks, setTasks] = useState<APITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "All">("All");

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
        setError("Failed to load tasks. Showing offline data.");
        // Fallback data if API is unreachable
        setTasks([
          {
            id: "1",
            title: "Draft Q3 Marketing Report",
            status: "In Progress",
            progress: 65,
            phase: "Data Analysis",
            deadline: "Today, 5:00 PM"
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
            deadline: "Oct 15, 2026"
          },
          {
            id: "4",
            title: "Server Migration Prep",
            status: "Done",
            progress: 100,
            phase: "Completed",
            deadline: "Oct 10, 2026"
          },
          {
            id: "5",
            title: "Client Onboarding: TechFlow",
            status: "In Progress",
            progress: 40,
            phase: "Account Setup",
            deadline: "Oct 12, 2026"
          },
          {
            id: "6",
            title: "Q4 Budget Planning",
            status: "Pending",
            progress: 0,
            phase: "Not Started",
            deadline: "Nov 1, 2026"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." 
            className="pl-12 bg-secondary-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] focus-visible:shadow-[4px_4px_0_0_var(--border)] focus-visible:-translate-y-1 focus-visible:-translate-x-1 transition-all h-12 text-base font-medium rounded-base"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground">
              <XCircle size={20} />
            </button>
          )}
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="appearance-none bg-secondary-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--border)] h-12 px-6 uppercase font-bold tracking-widest text-sm rounded-base transition-all pr-12 focus:outline-none cursor-pointer"
            >
              <option value="All">All Tasks</option>
              <option value="In Progress">In Progress</option>
              <option value="Awaiting Approval">Awaiting Approval</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" />
          </div>
          <Link to="/new-task">
            <Button className="h-12 uppercase font-bold tracking-widest text-sm rounded-base transition-all bg-main text-main-foreground border-2 border-border shadow-[2px_2px_0_0_var(--border)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-none">
              New Task
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-secondary-background border-l-4 border-destructive text-foreground text-sm font-medium border-2 border-t-2 border-r-2 border-b-2 shadow-[2px_2px_0_0_var(--border)] rounded-base">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-main" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-16 bg-secondary-background rounded-base border-2 border-border shadow-[4px_4px_0_0_var(--border)] mt-8">
          <Search className="mx-auto h-12 w-12 text-foreground/50 mb-4" />
          <h3 className="text-xl font-black font-heading text-foreground uppercase">No Matches Found</h3>
          <p className="text-base font-medium text-foreground/70 mt-2">Adjust your search or filter settings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <TaskCard
              key={task.id || index}
              title={task.title}
              status={task.status}
              progress={task.progress}
              phase={task.phase}
              deadline={task.deadline}
              subTasks={task.subTasks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
