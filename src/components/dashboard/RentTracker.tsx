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
import { User, CheckCircle, Circle, Receipt, Calendar, History, Clock, DollarSign, PiggyBank } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

type Member = {
  id: string;
  name: string;
  department: "Fletcher" | "Culinary";
  rentAmount: number;
  kitchenHours?: number;
  totalRentPaid: number;
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
      totalRentPaid: 1950,
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
      totalRentPaid: 725,
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
      totalRentPaid: 1350,
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
      totalRentPaid: 1350,
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
      totalRentPaid: 525,
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
      totalRentPaid: 525,
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
      totalRentPaid: 1170,
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
      totalRentPaid: 1590,
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
              const amountPaid = calculateEffectiveRent(member);
              
              const updated = { 
                ...record, 
                paid: isPaid,
                paidOn: isPaid ? format(new Date(), "PP") : undefined,
                amountPaid,
                kitchenHours: isPaid && member.department === "Culinary" ? member.kitchenHours : undefined
              };
              
              // Show toast notification
              toast(
                isPaid 
                  ? `${member.name}'s rent for ${month} has been marked as paid` 
                  : `${member.name}'s rent for ${month} has been marked as unpaid`
              );
              
              // Update total rent paid
              let newTotalPaid = member.totalRentPaid;
              if (isPaid && amountPaid) {
                newTotalPaid += amountPaid;
              } else if (!isPaid && record.amountPaid) {
                newTotalPaid -= record.amountPaid;
              }
              
              // Update member's total rent paid
              setTimeout(() => {
                setMembers(prev => 
                  prev.map(m => 
                    m.id === member.id ? { ...m, totalRentPaid: newTotalPaid } : m
                  )
                );
              }, 0);
              
              return updated;
            }
            return record;
          });
          
          // If the month doesn't exist in history, add it
          if (!member.paymentHistory.some(record => record.month === month)) {
            const isPaid = true;
            const amountPaid = calculateEffectiveRent(member);
            
            updatedHistory.push({
              month,
              paid: isPaid,
              paidOn: format(new Date(), "PP"),
              amountPaid,
              kitchenHours: member.department === "Culinary" ? member.kitchenHours : undefined
            });
            
            // Update total rent paid
            const newTotalPaid = member.totalRentPaid + amountPaid;
            
            // Update member's total rent paid
            setTimeout(() => {
              setMembers(prev => 
                prev.map(m => 
                  m.id === member.id ? { ...m, totalRentPaid: newTotalPaid } : m
                )
              );
            }, 0);
            
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
    
    // Calculate: add $5 per kitchen hour (changed from reducing to increasing)
    const additional = member.kitchenHours * 5;
    return member.rentAmount + additional;
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
          toast.success(`Updated ${member.name}'s additional kitchen hours to ${hours} hours`);
          
          // Also update current month payment if already paid
          const updatedHistory = member.paymentHistory.map(record => {
            if (record.month === currentMonth && record.paid) {
              return {
                ...record,
                kitchenHours: hours,
                amountPaid: member.rentAmount + (hours * 5) // Update the amount paid based on new hours
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
    <div className="space-y-6">
      <Tabs 
        defaultValue="current"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "current" | "history")}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Monthly Rent Status</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
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
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
          
          <div className="flex items-center gap-4 text-sm">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <Card key={member.id} className={cn(
                "border transition-all duration-200",
                member.rentPaid ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"
              )}>
                <CardContent className="p-5">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
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
                            <p className="text-xs text-gray-500">{member.department}</p>
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
                    
                    <div className="space-y-3">
                      {/* Total Rent Paid */}
                      <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <PiggyBank className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Total Paid:</span>
                          </div>
                          <span className="font-medium text-blue-600">${member.totalRentPaid}</span>
                        </div>
                      </div>
                      
                      {/* Monthly Rent Amount */}
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">Monthly Rent:</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium">${member.rentAmount}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 text-blue-500"
                              onClick={() => openRentAmountDialog(member.id)}
                            >
                              <span className="sr-only">Edit</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {member.department === "Culinary" && (
                        <div className="bg-amber-50 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-amber-600" />
                              <span className="text-sm">Additional Kitchen Hours:</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium">{member.kitchenHours || 0}h</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 text-blue-500"
                                onClick={() => openKitchenHoursDialog(member.id)}
                              >
                                <span className="sr-only">Edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {member.rentPaid && (
                        <div className={cn(
                          "p-3 rounded-md",
                          member.department === "Culinary" ? "bg-green-50 text-green-700" : "bg-green-50 text-green-700"
                        )}>
                          <span className="text-sm font-medium">
                            {member.department === "Culinary" 
                              ? `Paid $${member.amountPaid} (with ${member.monthlyKitchenHours || 0} additional hours)` 
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
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Monthly Rent</TableHead>
                      <TableHead>Total Paid</TableHead>
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
                              size="sm" 
                              className="h-6 w-6 p-0 text-blue-500"
                              onClick={() => openRentAmountDialog(member.id)}
                            >
                              <span className="sr-only">Edit</span>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                              </svg>
                            </Button>
                          </div>
                          {member.department === "Culinary" && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> 
                              <span>{member.kitchenHours || 0}h additional</span>
                              <Button 
                                variant="ghost"
                                size="sm" 
                                className="h-5 w-5 p-0 text-blue-500"
                                onClick={() => openKitchenHoursDialog(member.id)}
                              >
                                <span className="sr-only">Edit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium text-blue-600">
                          ${member.totalRentPaid}
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
                                          ? ` (with ${paymentRecord.kitchenHours}h additional kitchen time)` 
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for editing rent amount - Simplified UI */}
      <Dialog open={editingAmount.isOpen} onOpenChange={(open) => !open && closeRentAmountDialog()}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Update Monthly Rent</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="rent-amount"
                type="number"
                min="0"
                value={newRentAmount}
                onChange={(e) => setNewRentAmount(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeRentAmountDialog}>Cancel</Button>
            <Button onClick={handleUpdateRentAmount}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing kitchen hours - Simplified UI */}
      <Dialog open={editingHours.isOpen} onOpenChange={(open) => !open && closeKitchenHoursDialog()}>
        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Additional Kitchen Hours</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="relative">
              <Input
                id="kitchen-hours"
                type="number"
                min="0"
                value={newKitchenHours}
                onChange={(e) => setNewKitchenHours(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">hours</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Additional hours will increase the monthly rent.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeKitchenHoursDialog}>Cancel</Button>
            <Button onClick={handleUpdateKitchenHours}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentTracker;
