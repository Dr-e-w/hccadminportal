
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User, CheckCircle, Circle, Receipt, Calendar, History, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type Member = {
  id: string;
  name: string;
  department: "Fletcher" | "Culinary";
  rentAmount: number;
  kitchenHours?: number;
  paymentHistory: {
    month: string;
    paid: boolean;
    paidOn?: string;
    amountPaid?: number;
    kitchenHours?: number;
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
  const [editingAmount, setEditingAmount] = useState<{ isOpen: boolean; memberId: string | null }>({
    isOpen: false,
    memberId: null,
  });
  const [editingHours, setEditingHours] = useState<{ isOpen: boolean; memberId: string | null }>({
    isOpen: false,
    memberId: null,
  });
  const [newRentAmount, setNewRentAmount] = useState<string>("");
  const [newKitchenHours, setNewKitchenHours] = useState<string>("");
  
  const [members, setMembers] = useState<Member[]>([
    { 
      id: '1', 
      name: 'Alex Johnson', 
      department: 'Fletcher', 
      rentAmount: 650,
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 5), "PP"), amountPaid: 650 },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 4), "PP"), amountPaid: 650 },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 3), "PP"), amountPaid: 650 },
      ]
    },
    { 
      id: '2', 
      name: 'Sarah Miller', 
      department: 'Fletcher', 
      rentAmount: 725,
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 10), "PP"), amountPaid: 725 },
        { month: months[2], paid: false },
      ]
    },
    { 
      id: '3', 
      name: 'Michael Chen', 
      department: 'Culinary', 
      rentAmount: 550,
      kitchenHours: 20,
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), "PP"), amountPaid: 450, kitchenHours: 20 },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 2), "PP"), amountPaid: 450, kitchenHours: 20 },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 1), "PP"), amountPaid: 450, kitchenHours: 20 },
      ]
    },
    { 
      id: '4', 
      name: 'Emily Parker', 
      department: 'Fletcher', 
      rentAmount: 675,
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 3), "PP"), amountPaid: 675 },
        { month: months[1], paid: false },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 12), "PP"), amountPaid: 675 },
      ]
    },
    { 
      id: '5', 
      name: 'David Thompson', 
      department: 'Culinary', 
      rentAmount: 600,
      kitchenHours: 15,
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: false },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 15), "PP"), amountPaid: 525, kitchenHours: 15 },
      ]
    },
    { 
      id: '6', 
      name: 'Jessica Lee', 
      department: 'Culinary', 
      rentAmount: 575,
      kitchenHours: 10,
      paymentHistory: [
        { month: currentMonth, paid: false },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 8), "PP"), amountPaid: 525, kitchenHours: 10 },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 7), "PP"), amountPaid: 525, kitchenHours: 10 },
      ]
    },
    { 
      id: '7', 
      name: 'Robert Wilson', 
      department: 'Culinary', 
      rentAmount: 625,
      kitchenHours: 8,
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 2), "PP"), amountPaid: 585, kitchenHours: 8 },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1), "PP"), amountPaid: 585, kitchenHours: 8 },
        { month: months[2], paid: false },
      ]
    },
    { 
      id: '8', 
      name: 'Maria Rodriguez', 
      department: 'Culinary', 
      rentAmount: 590,
      kitchenHours: 12,
      paymentHistory: [
        { month: currentMonth, paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth(), 4), "PP"), amountPaid: 530, kitchenHours: 12 },
        { month: months[1], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 5), "PP"), amountPaid: 530, kitchenHours: 12 },
        { month: months[2], paid: true, paidOn: format(new Date(currentDate.getFullYear(), currentDate.getMonth()-2, 3), "PP"), amountPaid: 530, kitchenHours: 12 },
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
                paidOn: isPaid ? format(new Date(), "PP") : undefined,
                amountPaid: isPaid ? calculateEffectiveRent(member) : undefined,
                kitchenHours: isPaid && member.department === "Culinary" ? member.kitchenHours : undefined
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
              paidOn: format(new Date(), "PP"),
              amountPaid: calculateEffectiveRent(member),
              kitchenHours: member.department === "Culinary" ? member.kitchenHours : undefined
            });
            
            toast(`${member.name}'s rent for ${month} has been marked as paid`);
          }
          
          return { ...member, paymentHistory: updatedHistory };
        }
        return member;
      })
    );
  };

  const calculateEffectiveRent = (member: Member): number => {
    if (member.department !== "Culinary" || !member.kitchenHours) {
      return member.rentAmount;
    }
    
    // Simple calculation: reduce $5 per kitchen hour (just for demonstration)
    const discount = member.kitchenHours * 5;
    return Math.max(member.rentAmount - discount, 0);
  };

  const handleUpdateRentAmount = () => {
    if (!editingAmount.memberId) return;
    
    const amount = parseFloat(newRentAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error("Please enter a valid rent amount");
      return;
    }
    
    setMembers(prev => 
      prev.map(member => {
        if (member.id === editingAmount.memberId) {
          toast.success(`Updated ${member.name}'s rent amount to $${amount}`);
          return { ...member, rentAmount: amount };
        }
        return member;
      })
    );
    
    closeRentAmountDialog();
  };

  const handleUpdateKitchenHours = () => {
    if (!editingHours.memberId) return;
    
    const hours = parseFloat(newKitchenHours);
    if (isNaN(hours) || hours < 0) {
      toast.error("Please enter valid kitchen hours");
      return;
    }
    
    setMembers(prev => 
      prev.map(member => {
        if (member.id === editingHours.memberId) {
          toast.success(`Updated ${member.name}'s kitchen hours to ${hours} hours`);
          
          // Also update current month payment if already paid
          const updatedHistory = member.paymentHistory.map(record => {
            if (record.month === currentMonth && record.paid) {
              return {
                ...record,
                kitchenHours: hours,
                amountPaid: member.rentAmount - (hours * 5) // Update the amount paid based on new hours
              };
            }
            return record;
          });
          
          return { 
            ...member, 
            kitchenHours: hours,
            paymentHistory: updatedHistory
          };
        }
        return member;
      })
    );
    
    closeKitchenHoursDialog();
  };

  const openRentAmountDialog = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setNewRentAmount(member.rentAmount.toString());
      setEditingAmount({ isOpen: true, memberId });
    }
  };

  const closeRentAmountDialog = () => {
    setEditingAmount({ isOpen: false, memberId: null });
    setNewRentAmount("");
  };

  const openKitchenHoursDialog = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member && member.kitchenHours !== undefined) {
      setNewKitchenHours(member.kitchenHours.toString());
      setEditingHours({ isOpen: true, memberId });
    }
  };

  const closeKitchenHoursDialog = () => {
    setEditingHours({ isOpen: false, memberId: null });
    setNewKitchenHours("");
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
        paidOn: payment.paidOn,
        amountPaid: payment.amountPaid,
        monthlyKitchenHours: payment.kitchenHours
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
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-3">
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
                    
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between bg-white p-2 rounded-md">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Rent Amount:</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">${member.rentAmount}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 rounded-full"
                            onClick={() => openRentAmountDialog(member.id)}
                          >
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-xs text-blue-500">Edit</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit rent amount</p>
                              </TooltipContent>
                            </Tooltip>
                          </Button>
                        </div>
                      </div>
                      
                      {member.department === "Culinary" && (
                        <div className="flex items-center justify-between bg-white p-2 rounded-md">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm">Kitchen Hours:</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{member.kitchenHours || 0}h</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 rounded-full"
                              onClick={() => openKitchenHoursDialog(member.id)}
                            >
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-xs text-blue-500">Edit</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit kitchen hours</p>
                                </TooltipContent>
                              </Tooltip>
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {member.rentPaid && (
                        <div className={cn(
                          "flex items-center justify-between p-2 rounded-md col-span-2",
                          member.department === "Culinary" ? "bg-orange-50" : "bg-blue-50"
                        )}>
                          <span className="text-sm font-medium">
                            {member.department === "Culinary" 
                              ? `Paid $${member.amountPaid} (with ${member.monthlyKitchenHours} kitchen hours)` 
                              : `Paid $${member.amountPaid}`}
                          </span>
                        </div>
                      )}
                    </div>
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
                    <TableHead>Rent</TableHead>
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
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>${member.rentAmount}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 rounded-full"
                            onClick={() => openRentAmountDialog(member.id)}
                          >
                            <span className="text-xs text-blue-500">Edit</span>
                          </Button>
                        </div>
                        {member.department === "Culinary" && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 
                            <span>{member.kitchenHours || 0}h</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4 rounded-full"
                              onClick={() => openKitchenHoursDialog(member.id)}
                            >
                              <span className="text-xs text-blue-500">Edit</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      
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
                                  ? `Paid $${paymentRecord.amountPaid} on ${paymentRecord.paidOn}${
                                      paymentRecord.kitchenHours 
                                        ? ` (with ${paymentRecord.kitchenHours}h kitchen time)` 
                                        : ''
                                    }` 
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

      {/* Dialog for editing rent amount */}
      <Dialog open={editingAmount.isOpen} onOpenChange={(open) => !open && closeRentAmountDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Rent Amount</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rent-amount">Monthly Rent Amount ($)</Label>
              <Input
                id="rent-amount"
                type="number"
                min="0"
                value={newRentAmount}
                onChange={(e) => setNewRentAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeRentAmountDialog}>Cancel</Button>
            <Button onClick={handleUpdateRentAmount}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing kitchen hours */}
      <Dialog open={editingHours.isOpen} onOpenChange={(open) => !open && closeKitchenHoursDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Kitchen Hours</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="kitchen-hours">Monthly Kitchen Hours</Label>
              <Input
                id="kitchen-hours"
                type="number"
                min="0"
                value={newKitchenHours}
                onChange={(e) => setNewKitchenHours(e.target.value)}
              />
              <p className="text-sm text-gray-500">Each kitchen hour reduces rent by $5</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeKitchenHoursDialog}>Cancel</Button>
            <Button onClick={handleUpdateKitchenHours}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentTracker;
