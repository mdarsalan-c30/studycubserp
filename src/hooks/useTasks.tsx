import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type Task = Tables<'tasks'>;
type TaskInsert = TablesInsert<'tasks'>;
type TaskUpdate = TablesUpdate<'tasks'>;

export const useTasks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assignee:profiles(first_name, last_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      return data;
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (task: TaskInsert) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Task created",
        description: "New task has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create task.",
        variant: "destructive",
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TaskUpdate }) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Task updated",
        description: "Task has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task.",
        variant: "destructive",
      });
    },
  });

  const getTasksByStatus = () => {
    if (!tasks) return { todo: [], inprogress: [], review: [], done: [] };

    return {
      todo: tasks.filter(task => task.status === 'todo'),
      inprogress: tasks.filter(task => task.status === 'inprogress'),
      review: tasks.filter(task => task.status === 'review'),
      done: tasks.filter(task => task.status === 'done'),
    };
  };

  const getTaskStats = () => {
    if (!tasks) return { total: 0, pending: 0, completed: 0, overdue: 0 };

    const now = new Date();
    return {
      total: tasks.length,
      pending: tasks.filter(task => task.status !== 'done').length,
      completed: tasks.filter(task => task.status === 'done').length,
      overdue: tasks.filter(task => 
        task.due_date && new Date(task.due_date) < now && task.status !== 'done'
      ).length,
    };
  };

  return {
    tasks: tasks || [],
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    getTasksByStatus,
    getTaskStats,
  };
};