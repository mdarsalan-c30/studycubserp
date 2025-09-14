import EmployeeTable from "@/components/employees/EmployeeTable";
import CreateEmployeeModal from "@/components/forms/CreateEmployeeModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, UserPlus } from "lucide-react";

const Employees = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their information
          </p>
        </div>
        <CreateEmployeeModal />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search employees by name, email, or department..."
            className="input-studycubs pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="btn-ghost">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="btn-ghost">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable />
    </div>
  );
};

export default Employees;