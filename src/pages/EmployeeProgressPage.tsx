
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeProgress from "@/components/dashboard/EmployeeProgress";

const EmployeeProgressPage = () => {
  const [activeTab, setActiveTab] = useState("90-day");

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Employee Progress</h1>
        
        <Tabs defaultValue="90-day" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="90-day">90 Day Program</TabsTrigger>
            <TabsTrigger value="graduation">Graduation Program</TabsTrigger>
          </TabsList>
          
          <TabsContent value="90-day" className="animate-in fade-in-50">
            <EmployeeProgress programType="90-day" />
          </TabsContent>
          
          <TabsContent value="graduation" className="animate-in fade-in-50">
            <EmployeeProgress programType="graduation" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeProgressPage;
