
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, FileText, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: "Events",
      value: "3",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Team",
      value: "12",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Resources",
      value: "24",
      icon: FileText,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Completion",
      value: "78%",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card border-none shadow-sm">
          <CardContent className="p-3 flex items-center gap-3">
            <div className={`w-8 h-8 ${stat.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
