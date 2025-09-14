import { Users, FileText, CheckSquare, Clock } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { useOfferLetters } from "@/hooks/useOfferLetters";
import { useTasks } from "@/hooks/useTasks";

const StatsCards = () => {
  const { getEmployeeStats, isLoading: employeesLoading } = useEmployees();
  const { getOfferLetterStats, isLoading: offersLoading } = useOfferLetters();
  const { getTaskStats, isLoading: tasksLoading } = useTasks();

  const employeeStats = getEmployeeStats();
  const offerStats = getOfferLetterStats();
  const taskStats = getTaskStats();

  const stats = [
    {
      title: "Total Employees",
      value: employeesLoading ? "..." : employeeStats.total.toString(),
      change: `${employeeStats.active} active`,
      changeType: "positive" as const,
      icon: Users,
      bgColor: "bg-gradient-primary",
    },
    {
      title: "Active Offers",
      value: offersLoading ? "..." : offerStats.total.toString(),
      change: `${offerStats.sent} sent`,
      changeType: "positive" as const,
      icon: FileText,
      bgColor: "bg-gradient-secondary",
    },
    {
      title: "Pending Tasks",
      value: tasksLoading ? "..." : taskStats.pending.toString(),
      change: `${taskStats.overdue} overdue`,
      changeType: taskStats.overdue > 0 ? "negative" : "positive" as const,
      icon: CheckSquare,
      bgColor: "bg-studycubs-teal",
    },
    {
      title: "Completed Tasks",
      value: tasksLoading ? "..." : taskStats.completed.toString(),
      change: `${taskStats.total} total`,
      changeType: "positive" as const,
      icon: Clock,
      bgColor: "bg-studycubs-orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card-studycubs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;