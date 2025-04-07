
import DashboardLayout from "@/components/DashboardLayout";
import EventTracker from "@/components/dashboard/EventTracker";

const EventTrackingPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-light">Event Tracking</h1>
          <p className="text-gray-500 mt-1">
            Monitor member participation in pit sessions, chamber events, and education hours.
          </p>
        </div>
        <EventTracker />
      </div>
    </DashboardLayout>
  );
};

export default EventTrackingPage;
