
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

type Resource = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  location?: string;
  notes?: string;
};

const ResourceCard = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    location: '',
    notes: '',
  });

  const handleAddResource = () => {
    if (!newResource.name.trim() || !newResource.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newResource.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    const resource: Resource = {
      id: Math.random().toString(36).substring(2, 9),
      ...newResource,
    };
    
    setResources([...resources, resource]);
    setNewResource({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      location: '',
      notes: '',
    });
    setIsDialogOpen(false);
    
    toast.success('Resource added successfully!');
  };

  const handleRemoveResource = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
    toast.success('Resource removed');
  };

  return (
    <Card className="glass-card animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-light flex items-center justify-between">
          <span>Resources</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 button-hover"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white p-4 rounded-md border shadow-sm transition-all-200 card-hover">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{resource.name}</h3>
                    {resource.position && (
                      <p className="text-sm text-gray-500">{resource.position}</p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-gray-500 hover:text-destructive"
                  onClick={() => handleRemoveResource(resource.id)}
                >
                  Remove
                </Button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{resource.email}</span>
                </div>
                
                {resource.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{resource.phone}</span>
                  </div>
                )}
                
                {resource.department && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Department:</span>
                    <span>{resource.department}</span>
                  </div>
                )}
                
                {resource.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{resource.location}</span>
                  </div>
                )}
              </div>
              
              {resource.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">{resource.notes}</p>
                </div>
              )}
            </div>
          ))}
          
          {resources.length === 0 && (
            <div className="md:col-span-2 text-center py-10 bg-white rounded-md border">
              <UserPlus className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 mb-3">No resources added yet</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsDialogOpen(true)}
              >
                Add New Resource
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newResource.name}
                  onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                  placeholder="Enter name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newResource.email}
                  onChange={(e) => setNewResource({...newResource, email: e.target.value})}
                  placeholder="Enter email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newResource.phone}
                  onChange={(e) => setNewResource({...newResource, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newResource.position}
                  onChange={(e) => setNewResource({...newResource, position: e.target.value})}
                  placeholder="Enter position"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newResource.department}
                  onChange={(e) => setNewResource({...newResource, department: e.target.value})}
                  placeholder="Enter department"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newResource.location}
                  onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                  placeholder="Enter location"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newResource.notes}
                onChange={(e) => setNewResource({...newResource, notes: e.target.value})}
                placeholder="Additional information..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddResource}>
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ResourceCard;
