import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type Employee = Tables<'profiles'>;
type EmployeeInsert = TablesInsert<'profiles'>;
type EmployeeUpdate = TablesUpdate<'profiles'>;

export const useEmployees = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      return data as Employee[];
    },
  });

  const createEmployeeMutation = useMutation({
    mutationFn: async (employee: EmployeeInsert) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(employee)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Employee added",
        description: "New employee has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add employee.",
        variant: "destructive",
      });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: EmployeeUpdate }) => {
      const { data, error } = await supabase
        .from('profiles')
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
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Employee updated",
        description: "Employee information has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update employee.",
        variant: "destructive",
      });
    },
  });

  const getEmployeeStats = () => {
    if (!employees) return { total: 0, active: 0, pending: 0, inactive: 0 };

    return {
      total: employees.length,
      active: employees.filter(emp => emp.status === 'active').length,
      pending: employees.filter(emp => emp.status === 'pending').length,
      inactive: employees.filter(emp => emp.status === 'inactive').length,
    };
  };

  return {
    employees: employees || [],
    isLoading,
    error,
    createEmployee: createEmployeeMutation.mutate,
    updateEmployee: updateEmployeeMutation.mutate,
    isCreating: createEmployeeMutation.isPending,
    isUpdating: updateEmployeeMutation.isPending,
    getEmployeeStats,
  };
};