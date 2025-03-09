
import DashboardLayout from "@/components/DashboardLayout";
import CalendarComponent from "@/components/dashboard/CalendarComponent";

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-light">Calendar</h1>
        <CalendarComponent />
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
