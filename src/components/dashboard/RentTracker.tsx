
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, CheckCircle, Circle, Receipt } from "lucide-react";
import { toast } from "sonner";

type Member = {
  id: string;
  name: string;
  department: "Fletcher" | "Culinary";
  rentPaid: boolean;
};

const RentTracker = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Alex Johnson', department: 'Fletcher', rentPaid: true },
    { id: '2', name: 'Sarah Miller', department: 'Fletcher', rentPaid: false },
    { id: '3', name: 'Michael Chen', department: 'Culinary', rentPaid: true },
    { id: '4', name: 'Emily Parker', department: 'Fletcher', rentPaid: true },
    { id: '5', name: 'David Thompson', department: 'Culinary', rentPaid: false },
    { id: '6', name: 'Jessica Lee', department: 'Culinary', rentPaid: false },
    { id: '7', name: 'Robert Wilson', department: 'Culinary', rentPaid: true },
    { id: '8', name: 'Maria Rodriguez', department: 'Culinary', rentPaid: true },
  ]);

  const toggleRentStatus = (id: string) => {
    setMembers(prev => 
      prev.map(member => {
        if (member.id === id) {
          const updated = { ...member, rentPaid: !member.rentPaid };
          // Show toast notification
          toast(
            updated.rentPaid 
              ? `${member.name}'s rent has been marked as paid` 
              : `${member.name}'s rent has been marked as unpaid`
          );
          return updated;
        }
        return member;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Monthly Rent Status</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Paid: {members.filter(m => m.rentPaid).length}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Unpaid: {members.filter(m => !m.rentPaid).length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map(member => (
          <Card key={member.id} className={cn(
            "border p-0 hover:shadow-md transition-all duration-200",
            member.rentPaid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
          )}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    member.rentPaid ? "bg-green-100" : "bg-red-100"
                  )}>
                    <User className={cn(
                      "h-5 w-5", 
                      member.rentPaid ? "text-green-600" : "text-red-600"
                    )} />
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.department}</p>
                  </div>
                </div>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={member.rentPaid ? "ghost" : "outline"}
                      size="icon"
                      className={cn(
                        "h-9 w-9", 
                        member.rentPaid ? "text-green-600 hover:text-green-700 hover:bg-green-100" : "text-red-600 hover:text-red-700 hover:bg-red-100"
                      )}
                      onClick={() => toggleRentStatus(member.id)}
                    >
                      {member.rentPaid ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{member.rentPaid ? "Mark as unpaid" : "Mark as paid"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RentTracker;
