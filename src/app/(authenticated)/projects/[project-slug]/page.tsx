"use client";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/constants/project-data";
import { useModalStore } from "@/store/modal-store";

const ProjectDetailPage = () => {
  const categories = ["all", "analytics", "reports", "notifications"];
  const { openModal } = useModalStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Contents</h1>
        <Button onClick={() => openModal("create-content", { data: projects[0] })}>
          <PlusIcon />
          Create content
        </Button>
      </div>
      <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="space-y-4"></TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;
