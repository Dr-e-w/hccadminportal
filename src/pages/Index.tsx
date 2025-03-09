
import DashboardLayout from "@/components/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import CalendarComponent from "@/components/dashboard/CalendarComponent";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import ResourceCard from "@/components/dashboard/ResourceCard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CalendarComponent />
          <div className="flex flex-col gap-4">
            <ProgressTracker />
            <ResourceCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
