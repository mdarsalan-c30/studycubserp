import StatsCards from "@/components/dashboard/StatsCards";
import EmployeeTable from "@/components/employees/EmployeeTable";
import TaskBoard from "@/components/tasks/TaskBoard";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at StudyCubs today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            className="btn-secondary"
            onClick={() => {
              // Generate and download report
              const reportData = `StudyCubs Dashboard Report\nGenerated: ${new Date().toLocaleString()}\n\nEmployees: Active\nTasks: In Progress\nOffers: Pending\n\nReport generated successfully.`;
              const blob = new Blob([reportData], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `studycubs-report-${new Date().toISOString().split('T')[0]}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-studycubs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Recent Hires</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            3 new employees joined this month
          </p>
          <Button variant="outline" size="sm" className="btn-ghost">
            View All
          </Button>
        </div>

        <div className="card-studycubs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-secondary p-2 rounded-lg">
              <FileText className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Pending Offers</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            7 offers awaiting candidate response
          </p>
          <Button variant="outline" size="sm" className="btn-ghost">
            Manage Offers
          </Button>
        </div>

        <div className="card-studycubs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-accent p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Performance</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Q1 reviews starting next week
          </p>
          <Button variant="outline" size="sm" className="btn-ghost">
            Schedule Reviews
          </Button>
        </div>
      </div>

      {/* Task Board */}
      <TaskBoard />

      {/* Recent Employees */}
      <EmployeeTable />
    </div>
  );
};

export default Dashboard;