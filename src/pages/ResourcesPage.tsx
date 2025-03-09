
import DashboardLayout from "@/components/DashboardLayout";
import ResourceCard from "@/components/dashboard/ResourceCard";

const ResourcesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-light">Resources</h1>
        <ResourceCard />
      </div>
    </DashboardLayout>
  );
};

export default ResourcesPage;
