
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: { memberName: string; date: string; notes: string }) => void;
  eventType: "pitSessions" | "chamberEvents" | "educationHours";
}

const EventDialog = ({ open, onOpenChange, onSave, eventType }: EventDialogProps) => {
  const [memberName, setMemberName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const eventTypeLabels = {
    pitSessions: "Pit Session",
    chamberEvents: "Chamber Event",
    educationHours: "Education Hours"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ memberName, date, notes });
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setMemberName("");
    setDate("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add {eventTypeLabels[eventType]}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="memberName">Member Name</Label>
              <Input
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter member name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any relevant details"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
