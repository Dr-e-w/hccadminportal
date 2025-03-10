
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ResourceCard from "@/components/dashboard/ResourceCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { User, Building2, BarChart } from "lucide-react";

type Employee = {
  id: string;
  name: string;
  business: string;
  progress: number;
  type: '90-day' | 'graduation';
  task: string;
};

const ResourcesPage = () => {
  const employees: Employee[] = [
    { id: '1', name: 'Alex Johnson', business: 'Sales Department', progress: 75, type: '90-day', task: 'Q1 Analytics Report' },
    { id: '2', name: 'Sarah Miller', business: 'Marketing', progress: 45, type: '90-day', task: 'Client Presentations' },
    { id: '3', name: 'Michael Chen', business: 'Design Team', progress: 90, type: '90-day', task: 'Website Redesign' },
    { id: '4', name: 'Emily Parker', business: 'Research Division', progress: 82, type: 'graduation', task: 'Market Research' },
    { id: '5', name: 'David Thompson', business: 'Finance', progress: 38, type: 'graduation', task: 'Financial Analysis' },
    { id: '6', name: 'Jessica Lee', business: 'Product Development', progress: 95, type: 'graduation', task: 'Product Design' },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-800";
    if (progress < 50) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Resources</h1>
        <Tabs defaultValue="resources" className="w-full">
          <TabsList>
            <TabsTrigger value="resources">Add Resource</TabsTrigger>
            <TabsTrigger value="employees">All Employees</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <ResourceCard />
          </TabsContent>
          
          <TabsContent value="employees">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-light">Employee Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b font-medium">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>Business Unit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4" />
                      <span>Progress</span>
                    </div>
                    <div>Current Task</div>
                    <div>Program</div>
                  </div>
                  
                  <div className="divide-y">
                    {employees.map(employee => (
                      <div key={employee.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-gray-600">{employee.business}</div>
                        <div>
                          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                            getProgressColor(employee.progress)
                          )}>
                            {employee.progress}%
                          </span>
                        </div>
                        <div className="text-gray-600">{employee.task}</div>
                        <div>
                          <span className="capitalize text-gray-600">{employee.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ResourcesPage;
