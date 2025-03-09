
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Employee = {
  id: string;
  name: string;
  progress: number;
  task: string;
};

const ProgressTracker = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Alex Johnson', progress: 75, task: 'Q1 Analytics Report' },
    { id: '2', name: 'Sarah Miller', progress: 45, task: 'Client Presentations' },
    { id: '3', name: 'Michael Chen', progress: 90, task: 'Website Redesign' },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    task: '',
    progress: 0,
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name.trim() || !newEmployee.task.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    
    const employee: Employee = {
      id: Math.random().toString(36).substring(2, 9),
      name: newEmployee.name,
      task: newEmployee.task,
      progress: newEmployee.progress,
    };
    
    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', task: '', progress: 0 });
    setIsDialogOpen(false);
    
    toast.success('Employee added successfully!');
  };

  const handleRemoveEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee removed');
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, progress } : emp
    ));
  };

  return (
    <Card className="glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-light flex items-center justify-between">
          <span>Progress Tracker</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 button-hover"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Employee</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.map(employee => (
            <div key={employee.id} className="bg-white p-4 rounded-md border shadow-sm transition-all-200 card-hover">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{employee.name}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-destructive transition-colors"
                  onClick={() => handleRemoveEmployee(employee.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mb-3">{employee.task}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{employee.progress}%</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-value" 
                    style={{ width: `${employee.progress}%` }}
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  {[0, 25, 50, 75, 100].map(value => (
                    <Button
                      key={value}
                      variant={employee.progress === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 px-2 text-xs flex-1"
                      onClick={() => handleUpdateProgress(employee.id, value)}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {employees.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No employees added yet</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Employee
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="employee-name">Employee Name</Label>
              <Input
                id="employee-name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Enter employee name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task">Current Task</Label>
              <Input
                id="task"
                value={newEmployee.task}
                onChange={(e) => setNewEmployee({...newEmployee, task: e.target.value})}
                placeholder="Enter current task"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="progress">Initial Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={newEmployee.progress}
                onChange={(e) => setNewEmployee({...newEmployee, progress: parseInt(e.target.value) || 0})}
                placeholder="Enter initial progress"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddEmployee}>
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProgressTracker;
