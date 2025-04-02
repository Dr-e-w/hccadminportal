
import DashboardLayout from "@/components/DashboardLayout";
import RentTracker from "@/components/dashboard/RentTracker";

const RentTrackerPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-light">Rent Tracker</h1>
        <div className="text-gray-500">
          Track rent payments, manage rent amounts, and monitor kitchen hours for culinary members.
        </div>
        <RentTracker />
      </div>
    </DashboardLayout>
  );
};

export default RentTrackerPage;
