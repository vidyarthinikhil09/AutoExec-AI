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
  payloadPreview?: {
    type: 'email' | 'data' | 'code';
    content: any;
  };
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
    ],
    payloadPreview: {
      type: 'data',
      content: {
        headers: ['Term', 'Current', 'Proposed'],
        rows: [
          ['Contract Length', '1 Year', '3 Years'],
          ['Annual Value', '$120,000', '$150,000'],
          ['SLA Tier', 'Standard', 'Enterprise'],
        ]
      }
    }
  },
  {
    id: "t2",
    title: "Send Q3 Newsletter",
    status: "Awaiting Approval",
    progress: 95,
    phase: "Ready to Send",
    deadline: "Today, 3:00 PM",
    payloadPreview: {
      type: 'email',
      content: {
        to: "subscribers@acmecorp.com (12,402 contacts)",
        subject: "🤖 AutoExec: Q3 Product Updates & AI Features",
        body: "Hi {first_name},\n\nWe're thrilled to share our Q3 updates with you. This quarter, we've rolled out a brand new AI-powered workflow engine that can automate up to 40% of standard administrative approvals.\n\nKey features:\n- Smart Triage\n- One-click integrations (OpenAI, APIfy)\n- Actionable Dashboards\n\nCheck out the full release notes on our blog!\n\nBest,\nThe AutoExec Team"
      }
    }
  },
  {
    id: "t3",
    title: "Publish Blog Post: AI Trends",
    status: "Awaiting Approval",
    progress: 85,
    phase: "Editorial Review",
    deadline: "Oct 12, 2026",
    payloadPreview: {
      type: 'code',
      content: {
        language: 'yaml',
        code: `title: "The Future of AI Automation in SaaS"
author: "AutoExec AI"
date: "2026-10-12"
draft: false
tags: ['AI', 'Automation', 'SaaS']
---

# The Future of AI Automation

In 2026, we are seeing a massive shift from simple copilots to autonomous agents that can safely execute standard business processes...`
      }
    }
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

  const renderPayloadPreview = (preview: APITask['payloadPreview']) => {
    if (!preview) return null;

    if (preview.type === 'email') {
      return (
        <div className="bg-secondary-background border-2 border-border p-4 rounded-base mt-2 shadow-[2px_2px_0_0_var(--border)]">
          <div className="flex flex-col gap-2 mb-3 pb-3 border-b-2 border-border">
            <div className="text-sm"><span className="font-bold mr-2">To:</span>{preview.content.to}</div>
            <div className="text-sm"><span className="font-bold mr-2">Subject:</span>{preview.content.subject}</div>
          </div>
          <div className="text-sm whitespace-pre-wrap font-medium">{preview.content.body}</div>
        </div>
      );
    }

    if (preview.type === 'data') {
      return (
        <div className="overflow-x-auto mt-2 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)]">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-foreground border-b-2 border-border">
              <tr>
                {preview.content.headers.map((h: string, i: number) => (
                  <th key={i} className="px-4 py-3 font-bold border-r-2 border-border last:border-r-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.content.rows.map((row: string[], i: number) => (
                <tr key={i} className="border-b border-border last:border-b-0 bg-secondary-background">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className="px-4 py-3 border-r-2 border-border last:border-r-0">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (preview.type === 'code') {
      return (
        <div className="mt-2 rounded-base border-2 border-border overflow-hidden bg-[#1E1E1E] shadow-[2px_2px_0_0_var(--border)]">
          <div className="flex justify-between items-center px-4 py-2 bg-[#2D2D2D] border-b-2 border-border">
            <span className="text-xs font-bold text-[#E0E0E0] uppercase tracking-wider">{preview.content.language}</span>
          </div>
          <pre className="p-4 overflow-auto text-xs text-[#E0E0E0] font-mono leading-relaxed whitespace-pre-wrap">
            <code>{preview.content.code}</code>
          </pre>
        </div>
      );
    }

    return null;
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
            >
              {task.payloadPreview && (
                <div className="space-y-3">
                  <h5 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider">
                    Payload Preview
                  </h5>
                  {renderPayloadPreview(task.payloadPreview)}
                </div>
              )}
            </TaskCard>
          ))}
        </div>
      )}
    </div>
  );
}
