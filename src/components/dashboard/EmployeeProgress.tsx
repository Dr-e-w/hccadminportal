import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { User, Building2, BarChart, ListChecks, CheckCircle, Circle, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type SubTask = {
  id: string;
  name: string;
  completed: boolean;
};

type Employee = {
  id: string;
  name: string;
  department: "Fletcher" | "Culinary";
  progress: number;
  type: '90-day' | 'graduation' | 'before-kitchen-use';
  task: string;
  subtasks: SubTask[];
};

interface EmployeeProgressProps {
  programType: '90-day' | 'graduation' | 'before-kitchen-use';
}

type TaskFormValues = {
  name: string;
  description?: string;
};

const EmployeeProgress = ({ programType }: EmployeeProgressProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const form = useForm<TaskFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: '1', 
      name: 'Alex Johnson', 
      department: 'Fletcher', 
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
      department: 'Fletcher', 
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
      department: 'Culinary', 
      progress: 90, 
      type: '90-day', 
      task: 'Recipe Development',
      subtasks: [
        { id: 's13', name: 'Research trends', completed: true },
        { id: 's14', name: 'Source ingredients', completed: true },
        { id: 's15', name: 'Create recipe drafts', completed: true },
        { id: 's16', name: 'Test recipes', completed: true },
        { id: 's17', name: 'Gather feedback', completed: true },
        { id: 's18', name: 'Finalize recipes', completed: false },
      ]
    },
    { 
      id: '4', 
      name: 'Emily Parker', 
      department: 'Fletcher', 
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
      department: 'Culinary', 
      progress: 38, 
      type: 'graduation', 
      task: 'Menu Planning',
      subtasks: [
        { id: 's23', name: 'Seasonal menu research', completed: true },
        { id: 's24', name: 'Create menu drafts', completed: false },
        { id: 's25', name: 'Cost analysis', completed: false },
        { id: 's26', name: 'Finalize menu items', completed: false },
      ]
    },
    { 
      id: '6', 
      name: 'Jessica Lee', 
      department: 'Culinary', 
      progress: 95, 
      type: 'graduation', 
      task: 'Kitchen Management',
      subtasks: [
        { id: 's27', name: 'Inventory procedures', completed: true },
        { id: 's28', name: 'Staff scheduling', completed: true },
        { id: 's29', name: 'Quality control processes', completed: true },
        { id: 's30', name: 'Efficiency improvements', completed: true },
      ]
    },
    { 
      id: '7', 
      name: 'Robert Wilson', 
      department: 'Culinary', 
      progress: 60, 
      type: 'before-kitchen-use', 
      task: 'Safety Training',
      subtasks: [
        { id: 's31', name: 'Food safety certificate', completed: true },
        { id: 's32', name: 'Kitchen equipment training', completed: true },
        { id: 's33', name: 'Sanitation procedures', completed: false },
        { id: 's34', name: 'Emergency protocols', completed: false },
      ]
    },
    { 
      id: '8', 
      name: 'Maria Rodriguez', 
      department: 'Culinary', 
      progress: 80, 
      type: 'before-kitchen-use', 
      task: 'Basic Techniques',
      subtasks: [
        { id: 's35', name: 'Knife skills assessment', completed: true },
        { id: 's36', name: 'Basic cooking methods', completed: true },
        { id: 's37', name: 'Food presentation', completed: true },
        { id: 's38', name: 'Kitchen terminology', completed: false },
      ]
    },
  ]);

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

  const openAddTaskDialog = (employee: Employee, taskIndex: number | null = null) => {
    setSelectedEmployee(employee);
    setEditTaskIndex(taskIndex);
    
    if (taskIndex !== null) {
      const task = employee.subtasks[taskIndex];
      form.reset({
        name: task.name,
      });
    } else {
      form.reset({
        name: "",
      });
    }
    
    setAddTaskDialogOpen(true);
  };

  const confirmDeleteTask = (employee: Employee, taskIndex: number) => {
    setSelectedEmployee(employee);
    setTaskToDeleteIndex(taskIndex);
    setAlertDialogOpen(true);
  };

  const deleteTask = () => {
    if (selectedEmployee && taskToDeleteIndex !== null) {
      setEmployees(prevEmployees => {
        return prevEmployees.map(emp => {
          if (emp.id === selectedEmployee.id) {
            const updatedSubtasks = [...emp.subtasks];
            updatedSubtasks.splice(taskToDeleteIndex, 1);
            
            const completedTasks = updatedSubtasks.filter(t => t.completed).length;
            const progress = updatedSubtasks.length > 0 
              ? Math.round((completedTasks / updatedSubtasks.length) * 100) 
              : 0;
            
            return {
              ...emp,
              subtasks: updatedSubtasks,
              progress
            };
          }
          return emp;
        });
      });
      
      toast({
        title: "Task Deleted",
        description: "The task has been successfully removed."
      });
    }
    setAlertDialogOpen(false);
  };

  const toggleTaskCompletion = (employeeId: string, taskIndex: number) => {
    setEmployees(prevEmployees => {
      return prevEmployees.map(emp => {
        if (emp.id === employeeId) {
          const updatedSubtasks = [...emp.subtasks];
          updatedSubtasks[taskIndex] = {
            ...updatedSubtasks[taskIndex],
            completed: !updatedSubtasks[taskIndex].completed
          };
          
          const completedTasks = updatedSubtasks.filter(t => t.completed).length;
          const progress = Math.round((completedTasks / updatedSubtasks.length) * 100);
          
          return {
            ...emp,
            subtasks: updatedSubtasks,
            progress
          };
        }
        return emp;
      });
    });
  };

  const onSubmitTask = (values: TaskFormValues) => {
    if (selectedEmployee) {
      setEmployees(prevEmployees => {
        return prevEmployees.map(emp => {
          if (emp.id === selectedEmployee.id) {
            let updatedSubtasks = [...emp.subtasks];
            
            if (editTaskIndex !== null) {
              updatedSubtasks[editTaskIndex] = {
                ...updatedSubtasks[editTaskIndex],
                name: values.name
              };
            } else {
              const newTaskId = `s${Date.now()}`;
              updatedSubtasks.push({
                id: newTaskId,
                name: values.name,
                completed: false
              });
            }
            
            const completedTasks = updatedSubtasks.filter(t => t.completed).length;
            const progress = Math.round((completedTasks / updatedSubtasks.length) * 100);
            
            return {
              ...emp,
              subtasks: updatedSubtasks,
              progress
            };
          }
          return emp;
        });
      });
      
      toast({
        title: editTaskIndex !== null ? "Task Updated" : "Task Added",
        description: editTaskIndex !== null 
          ? "The task has been successfully updated." 
          : "A new task has been added to the employee."
      });
    }
    
    setAddTaskDialogOpen(false);
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
                      <p className="text-sm text-gray-500">{employee.department}</p>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 shadow-sm"
                          onClick={() => openAddTaskDialog(employee)}
                        >
                          <Plus size={16} />
                          <span className="sr-only">Add task</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add task</p>
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
                ({selectedEmployee?.type.replace(/-/g, ' ')} program)
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto p-1">
            {selectedEmployee?.subtasks.map((subtask, index) => (
              <div key={subtask.id} className="flex items-center gap-3 p-3 border rounded-md">
                <div 
                  className="cursor-pointer"
                  onClick={() => toggleTaskCompletion(selectedEmployee.id, index)}
                >
                  {subtask.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
                <span className={cn(
                  "text-sm flex-grow",
                  subtask.completed ? "text-gray-700" : "text-gray-600"
                )}>
                  {subtask.name}
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => openAddTaskDialog(selectedEmployee, index)}
                  >
                    <Pencil size={16} className="text-gray-500" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => confirmDeleteTask(selectedEmployee, index)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
            {selectedEmployee?.subtasks.length === 0 && (
              <div className="text-center text-gray-500 py-4">No tasks assigned yet</div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setDialogOpen(false);
                if (selectedEmployee) {
                  openAddTaskDialog(selectedEmployee);
                }
              }}
            >
              <Plus size={16} />
              <span className="ml-1">Add Task</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addTaskDialogOpen} onOpenChange={setAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editTaskIndex !== null ? 'Edit Task' : 'Add Task'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitTask)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddTaskDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editTaskIndex !== null ? 'Update Task' : 'Add Task'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTask} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeProgress;
