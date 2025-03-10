
import { useState } from "react";
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

interface EmployeeProgressProps {
  programType: '90-day' | 'graduation';
}

const EmployeeProgress = ({ programType }: EmployeeProgressProps) => {
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

  const filteredEmployees = employees.filter(emp => emp.type === programType);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-800";
    if (progress < 50) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress < 50) return "bg-red-500";
    return "bg-primary";
  };

  const openSubtasksDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {filteredEmployees.map(employee => (
          <Card key={employee.id} className="bg-white p-0 hover:shadow-md transition-all duration-200">
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.business}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", 
                      getProgressColor(employee.progress)
                    )}>
                      {employee.progress}%
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 shadow-sm"
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
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Current Task: {employee.task}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressBarColor(employee.progress))} 
                      style={{ width: `${employee.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
    </div>
  );
};

export default EmployeeProgress;
