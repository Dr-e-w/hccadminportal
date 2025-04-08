
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import EventDialog from "./EventDialog";

// Sample data - in a real app, this would come from a database
const initialEvents = {
  pitSessions: [
    { id: "1", memberName: "John Doe", date: "2025-04-01", notes: "Worked on advanced techniques" },
    { id: "2", memberName: "Jane Smith", date: "2025-04-03", notes: "First session, basics covered" },
  ],
  chamberEvents: [
    { id: "1", memberName: "John Doe", date: "2025-03-15", notes: "Quartet performance" },
    { id: "2", memberName: "Jane Smith", date: "2025-03-15", notes: "Quartet performance" },
    { id: "3", memberName: "Alice Johnson", date: "2025-03-22", notes: "Solo recital" },
  ],
  educationHours: [
    { id: "1", memberName: "Alice Johnson", date: "2025-04-05", notes: "Music theory class", hours: 4 },
    { id: "2", memberName: "Bob Brown", date: "2025-04-06", notes: "Workshop attendance", hours: 6 },
    { id: "3", memberName: "Alice Johnson", date: "2025-04-10", notes: "Composition workshop", hours: 3 },
    { id: "4", memberName: "John Doe", date: "2025-04-11", notes: "History of music lecture", hours: 2 },
    { id: "5", memberName: "Jane Smith", date: "2025-04-12", notes: "Practical session", hours: 5 },
  ],
};

type EventType = "pitSessions" | "chamberEvents" | "educationHours";

interface Event {
  id: string;
  memberName: string;
  date: string;
  notes: string;
  hours?: number;
}

const EventTracker = () => {
  const [events, setEvents] = useState<Record<EventType, Event[]>>(initialEvents);
  const [activeTab, setActiveTab] = useState<EventType>("pitSessions");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddEvent = (newEvent: Omit<Event, "id">) => {
    setEvents(prev => ({
      ...prev,
      [activeTab]: [
        ...prev[activeTab],
        { ...newEvent, id: String(Date.now()) }
      ]
    }));
  };

  const tabLabels: Record<EventType, string> = {
    pitSessions: "Pit Sessions",
    chamberEvents: "Chamber Events",
    educationHours: "Education Hours",
  };

  // Calculate total hours per member for education hours
  const educationHoursByMember = events.educationHours.reduce((acc, event) => {
    if (!event.hours) return acc;
    
    if (!acc[event.memberName]) {
      acc[event.memberName] = 0;
    }
    acc[event.memberName] += event.hours;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="pitSessions" 
        onValueChange={(value) => setActiveTab(value as EventType)}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            {Object.entries(tabLabels).map(([value, label]) => (
              <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
            ))}
          </TabsList>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Event</span>
          </Button>
        </div>
        
        {Object.entries(events).map(([type, eventList]) => (
          <TabsContent key={type} value={type} className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{tabLabels[type as EventType]} Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                {type === "educationHours" && Object.keys(educationHoursByMember).length > 0 && (
                  <div className="mb-6 space-y-4">
                    <h3 className="text-lg font-medium">Education Hours Progress (40 hours required)</h3>
                    <div className="grid gap-4">
                      {Object.entries(educationHoursByMember).map(([memberName, hours]) => (
                        <div key={memberName} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{memberName}</span>
                            <span className="text-sm text-muted-foreground">{hours} / 40 hours</span>
                          </div>
                          <Progress value={(hours / 40) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>{type === "educationHours" ? "Hours" : "Notes"}</TableHead>
                      {type === "educationHours" && <TableHead>Notes</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventList.length > 0 ? (
                      eventList.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.memberName}</TableCell>
                          <TableCell>{event.date}</TableCell>
                          <TableCell>{type === "educationHours" ? event.hours : event.notes}</TableCell>
                          {type === "educationHours" && <TableCell>{event.notes}</TableCell>}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={type === "educationHours" ? 4 : 3} className="text-center py-6 text-muted-foreground">
                          No events recorded yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <EventDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSave={handleAddEvent}
        eventType={activeTab}
      />
    </div>
  );
};

export default EventTracker;
