
import DashboardLayout from "@/components/DashboardLayout";
import ProgressTracker from "@/components/dashboard/ProgressTracker";

const ProgressPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Progress Tracker</h1>
        <ProgressTracker />
      </div>
    </DashboardLayout>
  );
};

export default ProgressPage;
