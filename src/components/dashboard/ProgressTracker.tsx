
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Employee = {
  id: string;
  name: string;
  progress: number;
  task: string;
};

const ProgressTracker = () => {
  const employees: Employee[] = [
    { id: '1', name: 'Alex Johnson', progress: 75, task: 'Q1 Analytics Report' },
    { id: '2', name: 'Sarah Miller', progress: 45, task: 'Client Presentations' },
    { id: '3', name: 'Michael Chen', progress: 90, task: 'Website Redesign' },
  ];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-light">Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <div className="space-y-3">
          {employees.map(employee => (
            <div key={employee.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{employee.name}</h3>
                <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                  {employee.progress}%
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">{employee.task}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: `${employee.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
