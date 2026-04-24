import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, ChevronRight, CheckSquare, Square } from "lucide-react";

export type TaskStatus = "Pending" | "In Progress" | "Done" | "Awaiting Approval";

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskCardProps {
  key?: string | number;
  title: string;
  status: TaskStatus;
  progress: number;
  phase: string;
  deadline: string;
  subTasks?: SubTask[];
  isExpanded?: boolean;
  actions?: React.ReactNode;
}

export function TaskCard({
  title,
  status,
  progress,
  phase,
  deadline,
  subTasks,
  isExpanded = false,
  actions,
}: TaskCardProps) {
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case "Pending":
        return "bg-chart-1 text-foreground";
      case "In Progress":
        return "bg-chart-2 text-white";
      case "Done":
        return "bg-chart-4 text-white";
      case "Awaiting Approval":
        return "bg-main text-main-foreground";
      default:
        return "bg-muted text-foreground";
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-bold text-foreground text-xl mb-2 truncate" title={title}>{title}</h4>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={`font-bold ${getStatusColor(status)}`}>
                {status}
              </Badge>
              <div className="flex items-center text-xs text-foreground font-bold whitespace-nowrap mt-1 sm:mt-0 bg-background border-2 border-border px-2 py-1 rounded-sm shadow-[1px_1px_0_0_var(--border)]">
                <Calendar size={14} className="mr-1.5 shrink-0" />
                <span className="truncate">{deadline}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-9 shrink-0">
            View <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="space-y-2 mt-6">
          <div className="flex justify-between text-sm font-bold font-heading">
            <span className="text-foreground">{phase}</span>
            <span className="text-foreground">{progress}%</span>
          </div>
          {/* Brutalist progress bar */}
          <div className="h-4 w-full bg-background border-2 border-border rounded-sm overflow-hidden">
            <div 
              className="h-full bg-main border-r-2 border-border transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {isExpanded && subTasks && subTasks.length > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-border space-y-3 block">
            <h5 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-3">
              Sub-tasks
            </h5>
            {subTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 group">
                {task.completed ? (
                  <CheckSquare size={18} className="text-chart-4 mt-0.5 shrink-0" />
                ) : (
                  <Square size={18} className="text-foreground mt-0.5 shrink-0" />
                )}
                <span className={`text-sm font-medium ${task.completed ? "text-foreground/50 line-through" : "text-foreground"}`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {actions && (
          <div className="mt-6 pt-4 border-t-2 border-border flex flex-col sm:flex-row items-center justify-end gap-3">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
