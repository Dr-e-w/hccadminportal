
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Employee = {
  id: string;
  name: string;
  progress: number;
  task: string;
};

const ProgressTracker = () => {
  const [activeTab, setActiveTab] = useState("90-day");

  const ninetyDayEmployees: Employee[] = [
    { id: '1', name: 'Alex Johnson', progress: 75, task: 'Q1 Analytics Report' },
    { id: '2', name: 'Sarah Miller', progress: 45, task: 'Client Presentations' },
    { id: '3', name: 'Michael Chen', progress: 90, task: 'Website Redesign' },
  ];

  const graduationEmployees: Employee[] = [
    { id: '4', name: 'Emily Parker', progress: 82, task: 'Market Research' },
    { id: '5', name: 'David Thompson', progress: 38, task: 'Financial Analysis' },
    { id: '6', name: 'Jessica Lee', progress: 95, task: 'Product Design' },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress < 50) return "bg-red-500";
    return "bg-primary";
  };

  const getTextColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-800";
    if (progress < 50) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-light">Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="90-day" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="90-day">90 Day</TabsTrigger>
            <TabsTrigger value="graduation">Graduation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="90-day" className="max-h-[280px] overflow-auto">
            <div className="space-y-3">
              {ninetyDayEmployees.map(employee => (
                <div key={employee.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{employee.name}</h3>
                    <div className={cn("text-xs font-medium px-2 py-1 rounded-full", getTextColor(employee.progress))}>
                      {employee.progress}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{employee.task}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressColor(employee.progress))} 
                      style={{ width: `${employee.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="graduation" className="max-h-[280px] overflow-auto">
            <div className="space-y-3">
              {graduationEmployees.map(employee => (
                <div key={employee.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{employee.name}</h3>
                    <div className={cn("text-xs font-medium px-2 py-1 rounded-full", getTextColor(employee.progress))}>
                      {employee.progress}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{employee.task}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressColor(employee.progress))} 
                      style={{ width: `${employee.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
