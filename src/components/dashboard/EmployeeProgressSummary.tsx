import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Member = {
  id: string;
  name: string;
  progress: number;
  task: string;
  type: '90-day' | 'graduation' | 'before-kitchen-use';
  department: "Fletcher" | "Culinary";
};

const MemberProgressSummary = () => {
  const [activeTab, setActiveTab] = useState("90-day");
  const navigate = useNavigate();

  const ninetyDayMembers: Member[] = [
    { id: '1', name: 'Alex Johnson', progress: 75, task: 'Q1 Analytics Report', type: '90-day', department: 'Fletcher' },
    { id: '2', name: 'Sarah Miller', progress: 45, task: 'Client Presentations', type: '90-day', department: 'Fletcher' },
    { id: '3', name: 'Michael Chen', progress: 90, task: 'Recipe Development', type: '90-day', department: 'Culinary' },
  ];

  const graduationMembers: Member[] = [
    { id: '4', name: 'Emily Parker', progress: 82, task: 'Market Research', type: 'graduation', department: 'Fletcher' },
    { id: '5', name: 'David Thompson', progress: 38, task: 'Menu Planning', type: 'graduation', department: 'Culinary' },
    { id: '6', name: 'Jessica Lee', progress: 95, task: 'Kitchen Management', type: 'graduation', department: 'Culinary' },
  ];

  const kitchenUseMembers: Member[] = [
    { id: '7', name: 'Robert Wilson', progress: 60, task: 'Safety Training', type: 'before-kitchen-use', department: 'Culinary' },
    { id: '8', name: 'Maria Rodriguez', progress: 80, task: 'Basic Techniques', type: 'before-kitchen-use', department: 'Culinary' },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress < 50) return "bg-red-500";
    return "bg-primary";
  };

  const getTextColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-800";
    if (progress < 50) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-light">Member Progress</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm gap-1" 
          onClick={() => navigate('/members')}
        >
          <span>View All</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="90-day" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="90-day">90 Day</TabsTrigger>
            <TabsTrigger value="graduation">Graduation</TabsTrigger>
            <TabsTrigger value="before-kitchen-use">Kitchen Use</TabsTrigger>
          </TabsList>
          
          <TabsContent value="90-day" className="max-h-[280px] overflow-auto">
            <div className="space-y-3">
              {ninetyDayMembers.map(member => (
                <div key={member.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.department}</p>
                    </div>
                    <div className={cn("text-xs font-medium px-2 py-1 rounded-full", getTextColor(member.progress))}>
                      {member.progress}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{member.task}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressColor(member.progress))} 
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="graduation" className="max-h-[280px] overflow-auto">
            <div className="space-y-3">
              {graduationMembers.map(member => (
                <div key={member.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.department}</p>
                    </div>
                    <div className={cn("text-xs font-medium px-2 py-1 rounded-full", getTextColor(member.progress))}>
                      {member.progress}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{member.task}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressColor(member.progress))} 
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="before-kitchen-use" className="max-h-[280px] overflow-auto">
            <div className="space-y-3">
              {kitchenUseMembers.map(member => (
                <div key={member.id} className="bg-white p-3 rounded-md border shadow-sm transition-all-200 card-hover">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.department}</p>
                    </div>
                    <div className={cn("text-xs font-medium px-2 py-1 rounded-full", getTextColor(member.progress))}>
                      {member.progress}%
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{member.task}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("rounded-full h-2", getProgressColor(member.progress))} 
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MemberProgressSummary;
