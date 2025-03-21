
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { User, CheckCircle, Circle, Receipt, Calendar, History } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type Member = {
  id: string;
  name: string;
  department: "Fletcher" | "Culinary";
  paymentHistory: {
    month: string;
    paid: boolean;
    paidOn?: string;
  }[];
};

// Get current month and year
const currentDate = new Date();
const currentMonth = format(currentDate, "MMMM yyyy");

// Generate the last 6 months (including current)
const generatePastMonths = (count: number): string[] => {
  const months = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    months.push(format(date, "MMMM yyyy"));
  }
  return months;
};

const months = generatePastMonths(6);

const RentTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  
  const [members, setMembers] = useState<Member[]>([
    { 
      id: '1', 
      name: 'Alex Johnson', 
      department: 'Fletcher', 
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 5), "PP") },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 4), "PP") },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 3), "PP") },
      ]
    },
    { 
      id: '2', 
      name: 'Sarah Miller', 
      department: 'Fletcher', 
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 10), "PP") },
        { month: months[2], paid: false },
      ]
    },
    { 
      id: '3', 
      name: 'Michael Chen', 
      department: 'Culinary', 
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), "PP") },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 2), "PP") },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 1), "PP") },
      ]
    },
    { 
      id: '4', 
      name: 'Emily Parker', 
      department: 'Fletcher', 
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 3), "PP") },
        { month: months[1], paid: false },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 12), "PP") },
      ]
    },
    { 
      id: '5', 
      name: 'David Thompson', 
      department: 'Culinary', 
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: false },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 15), "PP") },
      ]
    },
    { 
      id: '6', 
      name: 'Jessica Lee', 
      department: 'Culinary', 
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 8), "PP") },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 7), "PP") },
      ]
    },
    { 
      id: '7', 
      name: 'Robert Wilson', 
      department: 'Culinary', 
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 2), "PP") },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1), "PP") },
        { month: months[2], paid: false },
      ]
    },
    { 
      id: '8', 
      name: 'Maria Rodriguez', 
      department: 'Culinary', 
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 4), "PP") },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 5), "PP") },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 3), "PP") },
      ]
    },
  ]);

  const toggleRentStatus = (id: string, month: string) => {
    setMembers(prev => 
      prev.map(member => {
        if (member.id === id) {
          const updatedHistory = member.paymentHistory.map(record => {
            if (record.month === month) {
              const isPaid = !record.paid;
              const updated = { 
                ...record, 
                paid: isPaid,
                paidOn: isPaid ? format(new Date(), "PP") : undefined
              };
              
              // Show toast notification
              toast(
                isPaid 
                  ? `${member.name}'s rent for ${month} has been marked as paid` 
                  : `${member.name}'s rent for ${month} has been marked as unpaid`
              );
              
              return updated;
            }
            return record;
          });
          
          // If the month doesn't exist in history, add it
          if (!member.paymentHistory.some(record => record.month === month)) {
            const isPaid = true;
            updatedHistory.push({
              month,
              paid: isPaid,
              paidOn: format(new Date(), "PP")
            });
            
            toast(`${member.name}'s rent for ${month} has been marked as paid`);
          }
          
          return { ...member, paymentHistory: updatedHistory };
        }
        return member;
      })
    );
  };

  // Filter members based on selected month
  const getMembersForMonth = () => {
    return members.map(member => {
      // Find payment record for selected month
      const paymentRecord = member.paymentHistory.find(record => record.month === selectedMonth);
      
      // If there's no record for this month, create a default (unpaid) record
      const payment = paymentRecord || { month: selectedMonth, paid: false };
      
      return {
        ...member,
        rentPaid: payment.paid,
        paidOn: payment.paidOn
      };
    });
  };

  const filteredMembers = getMembersForMonth();
  const paidCount = filteredMembers.filter(m => m.rentPaid).length;
  const unpaidCount = filteredMembers.length - paidCount;

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="current"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "current" | "history")}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Monthly Rent Status</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="current" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Current Month</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <Select 
              defaultValue={currentMonth}
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Paid: {paidCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Unpaid: {unpaidCount}</span>
            </div>
          </div>
        </div>

        <TabsContent value="current" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMembers.map(member => (
              <Card key={member.id} className={cn(
                "border hover:shadow-md transition-all duration-200",
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
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{member.department}</p>
                          {member.rentPaid && member.paidOn && (
                            <p className="text-xs text-green-600">Paid on {member.paidOn}</p>
                          )}
                        </div>
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
                          onClick={() => toggleRentStatus(member.id, selectedMonth)}
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
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Rent Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    {months.slice(0, 6).map(month => (
                      <TableHead key={month} className="text-center">
                        {month.split(' ')[0]}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map(member => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      
                      {months.slice(0, 6).map(month => {
                        const paymentRecord = member.paymentHistory.find(record => record.month === month);
                        return (
                          <TableCell key={month} className="text-center">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost"
                                  size="icon"
                                  className={cn(
                                    "h-8 w-8", 
                                    paymentRecord?.paid 
                                      ? "text-green-600 hover:text-green-700 hover:bg-green-100" 
                                      : "text-red-600 hover:text-red-700 hover:bg-red-100"
                                  )}
                                  onClick={() => toggleRentStatus(member.id, month)}
                                >
                                  {paymentRecord?.paid ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <Circle className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {paymentRecord?.paid 
                                  ? `Paid on ${paymentRecord.paidOn}` 
                                  : "Not paid"}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RentTracker;
