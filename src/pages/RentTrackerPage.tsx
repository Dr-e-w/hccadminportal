
import DashboardLayout from "@/components/DashboardLayout";
import RentTracker from "@/components/dashboard/RentTracker";

const RentTrackerPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Rent Tracker</h1>
        <RentTracker />
      </div>
    </DashboardLayout>
  );
};

export default RentTrackerPage;
