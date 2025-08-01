import { IconLayoutDashboard, IconPackages, IconUsers } from "@tabler/icons-react";

import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "Admin",
    email: "",
  },
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Projects",
          url: "/projects",
          icon: IconPackages,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Users",
          url: "/users",
          icon: IconUsers,
        },
      ],
    },
  ],
};
