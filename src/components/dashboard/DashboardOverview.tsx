
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, FileText, TrendingUp } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: "Upcoming Events",
      value: "3",
      description: "This week",
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
      trend: "+2 from last week",
      trendUp: true,
    },
    {
      title: "Team Members",
      value: "12",
      description: "Active members",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      trend: "Same as last month",
      trendUp: null,
    },
    {
      title: "Resources",
      value: "24",
      description: "Total resources",
      icon: FileText,
      color: "bg-green-50 text-green-600",
      trend: "+5 from last month",
      trendUp: true,
    },
    {
      title: "Completion Rate",
      value: "78%",
      description: "Team average",
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
      trend: "+12% from last month",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`w-8 h-8 ${stat.color} rounded-full flex items-center justify-center`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            {stat.trend && (
              <p className={`text-xs mt-2 ${stat.trendUp ? 'text-green-600' : stat.trendUp === false ? 'text-red-600' : 'text-gray-500'}`}>
                {stat.trend}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardOverview;
