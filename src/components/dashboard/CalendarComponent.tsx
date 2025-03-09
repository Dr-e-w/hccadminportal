
import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

type Event = {
  id: string;
  title: string;
  date: Date;
  description?: string;
};

const CalendarComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Team Meeting', date: new Date(), description: 'Weekly sync' },
    { id: '2', title: 'Project Deadline', date: new Date(new Date().setDate(new Date().getDate() + 2)), description: 'Final deliverables' },
    { id: '3', title: 'Client Call', date: new Date(new Date().setDate(new Date().getDate() + 1)), description: 'Quarterly review' },
  ]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
  });
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (selectedDay) {
      const dayEvents = events.filter(event => 
        event.date.toDateString() === selectedDay.toDateString()
      );
      setSelectedDayEvents(dayEvents);
    } else {
      setSelectedDayEvents([]);
    }
  }, [selectedDay, events]);

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected);
    setSelectedDay(selected);
  };

  const handleAddEvent = () => {
    if (!selectedDay) return;
    
    if (!newEvent.title.trim()) {
      toast.error('Please enter an event title');
      return;
    }
    
    const event: Event = {
      id: Math.random().toString(36).substring(2, 9),
      title: newEvent.title,
      description: newEvent.description,
      date: selectedDay,
    };
    
    setEvents([...events, event]);
    setNewEvent({ title: '', description: '' });
    setIsDialogOpen(false);
    
    toast.success('Event added successfully!');
  };

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setSelectedDayEvents(selectedDayEvents.filter(event => event.id !== id));
    toast.success('Event removed successfully!');
  };

  // Function to determine if a date has events
  const dateHasEvent = (date: Date) => {
    return events.some(event => event.date.toDateString() === date.toDateString());
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-light flex items-center justify-between">
          <span>Calendar</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => {
              if (selectedDay) {
                setIsDialogOpen(true);
              } else {
                toast.error('Please select a date first');
              }
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border bg-white p-2 pointer-events-auto shadow-sm"
              modifiers={{
                hasEvent: (date) => dateHasEvent(date),
              }}
              modifiersClassNames={{
                hasEvent: "calendar-day-event",
              }}
            />
          </div>
          <div className="md:col-span-5">
            <div className="bg-white rounded-md border p-3 shadow-sm max-h-[240px] overflow-auto">
              <h3 className="font-medium mb-2 text-sm">
                {selectedDay ? (
                  <span>{selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                ) : (
                  <span>Select a date</span>
                )}
              </h3>
              
              {selectedDayEvents.length > 0 ? (
                <div className="space-y-2">
                  {selectedDayEvents.map(event => (
                    <div key={event.id} className="p-2 border rounded-md list-item-hover transition-all-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {event.description && (
                            <p className="text-xs text-gray-500">{event.description}</p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-destructive h-6 px-2"
                          onClick={() => handleRemoveEvent(event.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedDay ? (
                <p className="text-gray-500 text-xs">No events scheduled</p>
              ) : (
                <p className="text-gray-500 text-xs">Select a date to view events</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Enter event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-description">Description (Optional)</Label>
              <Input
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Enter event description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CalendarComponent;
