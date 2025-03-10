
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { User, Building2, BarChart, ListChecks, CheckCircle, Circle } from "lucide-react";

type SubTask = {
  id: string;
  name: string;
  completed: boolean;
};

type Employee = {
  id: string;
  name: string;
  business: string;
  progress: number;
  type: '90-day' | 'graduation';
  task: string;
  subtasks: SubTask[];
};

const EmployeesPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const employees: Employee[] = [
    { 
      id: '1', 
      name: 'Alex Johnson', 
      business: 'Sales Department', 
      progress: 75, 
      type: '90-day', 
      task: 'Q1 Analytics Report',
      subtasks: [
        { id: 's1', name: 'Gather data sources', completed: true },
        { id: 's2', name: 'Clean dataset', completed: true },
        { id: 's3', name: 'Create visualization', completed: true },
        { id: 's4', name: 'Draft findings', completed: false },
        { id: 's5', name: 'Prepare presentation', completed: false },
        { id: 's6', name: 'Present to stakeholders', completed: false },
      ]
    },
    { 
      id: '2', 
      name: 'Sarah Miller', 
      business: 'Marketing', 
      progress: 45, 
      type: '90-day', 
      task: 'Client Presentations',
      subtasks: [
        { id: 's7', name: 'Research client background', completed: true },
        { id: 's8', name: 'Create slide deck', completed: true },
        { id: 's9', name: 'Prepare talking points', completed: false },
        { id: 's10', name: 'Rehearse presentation', completed: false },
        { id: 's11', name: 'Revise based on feedback', completed: false },
        { id: 's12', name: 'Deliver final presentation', completed: false },
      ]
    },
    { 
      id: '3', 
      name: 'Michael Chen', 
      business: 'Design Team', 
      progress: 90, 
      type: '90-day', 
      task: 'Website Redesign',
      subtasks: [
        { id: 's13', name: 'Analyze current website', completed: true },
        { id: 's14', name: 'Conduct user research', completed: true },
        { id: 's15', name: 'Create wireframes', completed: true },
        { id: 's16', name: 'Design mockups', completed: true },
        { id: 's17', name: 'User testing', completed: true },
        { id: 's18', name: 'Implement feedback', completed: false },
      ]
    },
    { 
      id: '4', 
      name: 'Emily Parker', 
      business: 'Research Division', 
      progress: 82, 
      type: 'graduation', 
      task: 'Market Research',
      subtasks: [
        { id: 's19', name: 'Define research questions', completed: true },
        { id: 's20', name: 'Collect primary data', completed: true },
        { id: 's21', name: 'Analyze findings', completed: true },
        { id: 's22', name: 'Present conclusions', completed: false },
      ]
    },
    { 
      id: '5', 
      name: 'David Thompson', 
      business: 'Finance', 
      progress: 38, 
      type: 'graduation', 
      task: 'Financial Analysis',
      subtasks: [
        { id: 's23', name: 'Compile financial data', completed: true },
        { id: 's24', name: 'Create financial models', completed: false },
        { id: 's25', name: 'Generate projections', completed: false },
        { id: 's26', name: 'Prepare final report', completed: false },
      ]
    },
    { 
      id: '6', 
      name: 'Jessica Lee', 
      business: 'Product Development', 
      progress: 95, 
      type: 'graduation', 
      task: 'Product Design',
      subtasks: [
        { id: 's27', name: 'Market analysis', completed: true },
        { id: 's28', name: 'Feature prioritization', completed: true },
        { id: 's29', name: 'Product specifications', completed: true },
        { id: 's30', name: 'Final presentation', completed: true },
      ]
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-800";
    if (progress < 50) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const openSubtasksDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">All Employees</h1>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-light">Employee Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b font-medium">
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
                <div>Subtasks</div>
              </div>
              
              <div className="divide-y">
                {employees.map(employee => (
                  <div key={employee.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
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
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => openSubtasksDialog(employee)}
                          >
                            <ListChecks size={16} />
                            <span className="ml-1">
                              {employee.subtasks.filter(st => st.completed).length}/{employee.subtasks.length}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View subtasks</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedEmployee?.name}'s Subtasks
              <span className="ml-2 text-sm font-normal text-gray-500 capitalize">
                ({selectedEmployee?.type} program)
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
            {selectedEmployee?.subtasks.map(subtask => (
              <div key={subtask.id} className="flex items-center gap-3 p-3 border rounded-md">
                {subtask.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm",
                  subtask.completed ? "text-gray-700" : "text-gray-600"
                )}>
                  {subtask.name}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default EmployeesPage;
