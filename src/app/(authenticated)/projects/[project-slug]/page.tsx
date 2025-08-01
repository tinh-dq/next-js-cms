import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectDetailPage = () => {
  const categories = ["all", "analytics", "reports", "notifications"];
  return (
    <div className="space-y-6">
      <h1>ProjectDetailPage</h1>
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
