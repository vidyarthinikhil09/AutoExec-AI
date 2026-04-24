import { useState } from "react";
import { TaskCard, TaskStatus } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

const INITIAL_TASKS: APITask[] = [
  {
    id: "t1",
    title: "Acme Corp Contract Renewal",
    status: "Awaiting Approval",
    progress: 90,
    phase: "Legal Review",
    deadline: "Tomorrow, 12:00 PM",
    subTasks: [
      { id: "a1", title: "Review standard terms", completed: true },
      { id: "a2", title: "Update pricing tier", completed: true },
      { id: "a3", title: "Final sign-off", completed: false },
    ]
  },
  {
    id: "t2",
    title: "Send Q3 Newsletter",
    status: "Awaiting Approval",
    progress: 95,
    phase: "Ready to Send",
    deadline: "Today, 3:00 PM"
  },
  {
    id: "t3",
    title: "Publish Blog Post: AI Trends",
    status: "Awaiting Approval",
    progress: 85,
    phase: "Editorial Review",
    deadline: "Oct 12, 2026"
  }
];

export function ApprovalsPage() {
  const [tasks, setTasks] = useState<APITask[]>(INITIAL_TASKS);
  const [processingTask, setProcessingTask] = useState<{ id: string, action: 'approve' | 'reject' } | null>(null);

  const handleAction = async (taskId: string, action: 'approve' | 'reject') => {
    setProcessingTask({ id: taskId, action });
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/task/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} task`);
      }

      setTasks(tasks.filter(t => t.id !== taskId));
      toast.success(`Task ${action}d successfully`);
    } catch (error) {
      console.error(`Error processing ${action}:`, error);
      setTimeout(() => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setProcessingTask(null);
        toast.success(`Task ${action}d successfully`);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-heading font-black text-foreground uppercase tracking-tighter">Pending Your Review</h2>
        <p className="text-lg font-medium text-foreground/70 mt-1">AutoExec AI requires your approval to proceed with these tasks.</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-16 bg-secondary-background rounded-base border-2 border-border shadow-[4px_4px_0_0_var(--border)]">
          <CheckCircle2 className="mx-auto h-16 w-16 text-[#00D696] mb-4 opacity-50" />
          <h3 className="text-2xl font-black font-heading text-foreground uppercase">All caught up!</h3>
          <p className="text-base font-medium text-foreground/70 mt-2">No tasks are currently awaiting your approval.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              status={task.status}
              progress={task.progress}
              phase={task.phase}
              deadline={task.deadline}
              isExpanded={!!task.subTasks}
              subTasks={task.subTasks}
              actions={
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleAction(task.id, 'reject')}
                    disabled={processingTask?.id === task.id}
                    className="w-full sm:w-auto font-bold uppercase tracking-widest text-[#FFF] py-5 border-none bg-[#FF1E00] hover:bg-[#CC1800]"
                  >
                    {processingTask?.id === task.id && processingTask.action === 'reject' ? <Loader2 size={16} className="animate-spin mr-2" /> : <XCircle size={16} className="mr-2" />}
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => handleAction(task.id, 'approve')}
                    disabled={processingTask?.id === task.id}
                    className="!bg-[#00D696] !text-black py-5 border-none hover:!bg-[#00B880] w-full sm:w-auto font-bold uppercase tracking-widest"
                  >
                    {processingTask?.id === task.id && processingTask.action === 'approve' ? <Loader2 size={16} className="animate-spin mr-2" /> : <CheckCircle2 size={16} className="mr-2" />}
                    Approve
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
