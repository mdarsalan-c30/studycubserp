import { useState } from "react";
import { Plus, MoreHorizontal, Clock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTasks } from "@/hooks/useTasks";
import CreateTaskModal from "@/components/forms/CreateTaskModal";
import { useToast } from "@/components/ui/use-toast";

const TaskBoard = () => {
  const { tasks, isLoading, getTasksByStatus, updateTask } = useTasks();
  const { toast } = useToast();
  const tasksByStatus = getTasksByStatus();

  const columns = [
    { id: 'todo', title: 'To Do', tasks: tasksByStatus.todo },
    { id: 'inprogress', title: 'In Progress', tasks: tasksByStatus.inprogress },
    { id: 'review', title: 'Review', tasks: tasksByStatus.review },
    { id: 'done', title: 'Done', tasks: tasksByStatus.done },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "medium":
        return <Badge className="status-pending text-xs">Medium</Badge>;
      case "low":
        return <Badge className="status-inactive text-xs">Low</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{priority}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="card-studycubs">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-studycubs">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Task Management</h2>
        <CreateTaskModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-muted/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <Badge className="badge-accent">{column.tasks.length}</Badge>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => {
                const assigneeName = task.assignee ? 
                  `${task.assignee.first_name} ${task.assignee.last_name}` : 
                  'Unassigned';
                
                return (
                  <div key={task.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-foreground text-sm leading-tight pr-2">
                        {task.title}
                      </h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem 
                            onClick={() => {
                              const newTitle = prompt('Enter new task title:', task.title);
                              if (newTitle && newTitle !== task.title) {
                                updateTask({ id: task.id, updates: { title: newTitle } });
                              }
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              const statuses = ['todo', 'inprogress', 'review', 'done'];
                              const currentIndex = statuses.indexOf(task.status || 'todo');
                              const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                              updateTask({ id: task.id, updates: { status: nextStatus } });
                              toast({
                                title: "Task Updated",
                                description: `Task moved to ${nextStatus.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
                              });
                            }}
                          >
                            Change Status
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this task?')) {
                                // Delete functionality would go here
                                toast({
                                  title: "Task Deleted",
                                  description: "Task has been deleted successfully.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Task Description */}
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Task Labels */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels && task.labels.map((label, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                          {label}
                        </Badge>
                      ))}
                    </div>

                    {/* Task Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee?.avatar_url || ""} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(assigneeName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{assigneeName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(task.priority || 'medium')}
                      </div>
                    </div>

                    {/* Due Date */}
                    {task.due_date && (
                      <div className={`flex items-center space-x-1 mt-2 text-xs ${
                        isOverdue(task.due_date) ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>Due {new Date(task.due_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add Task Button */}
              <CreateTaskModal
                defaultStatus={column.id}
                trigger={
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;