import { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEmployees } from "@/hooks/useEmployees";
import CreateEmployeeModal from "@/components/forms/CreateEmployeeModal";

const EmployeeTable = () => {
  const { employees, isLoading } = useEmployees();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="status-active">Active</Badge>;
      case "pending":
        return <Badge className="status-pending">Pending</Badge>;
      case "inactive":
        return <Badge className="status-inactive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="card-studycubs">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading employees...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-studycubs">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Employee Directory</h2>
        <CreateEmployeeModal />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-studycubs">
          <thead>
            <tr>
              <th className="first:rounded-l-xl">Employee</th>
              <th>Contact</th>
              <th>Role & Department</th>
              <th>Status</th>
              <th>Start Date</th>
              <th className="last:rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-surface">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-muted/50 transition-colors">
                <td>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar_url || ""} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(`${employee.first_name} ${employee.last_name}`)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{employee.first_name} {employee.last_name}</div>
                      <div className="text-sm text-muted-foreground">ID: {employee.employee_id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.phone || 'N/A'}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-medium text-foreground">{employee.role}</div>
                    <div className="text-sm text-muted-foreground">{employee.department}</div>
                  </div>
                </td>
                <td>
                  {getStatusBadge(employee.status || 'active')}
                </td>
                <td className="text-muted-foreground">
                  {new Date(employee.start_date).toLocaleDateString()}
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center space-x-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center space-x-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;