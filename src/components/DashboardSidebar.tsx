
import { Calendar, Users, FileText, Home, DollarSign, Award } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      title: "Calendar",
      icon: Calendar,
      path: "/calendar",
    },
    {
      title: "Employee Progress",
      icon: Users,
      path: "/employees",
    },
    {
      title: "Rent Tracker",
      icon: DollarSign,
      path: "/rent-tracker",
    },
    {
      title: "Event Tracking",
      icon: Award,
      path: "/event-tracking",
    },
    {
      title: "Resources",
      icon: FileText,
      path: "/resources",
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">A</span>
          </div>
          <span className="font-medium text-lg">Admin</span>
        </div>
        <SidebarTrigger className="absolute right-4 top-5" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={`${location.pathname === item.path ? 'bg-sidebar-accent text-primary' : ''}`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
