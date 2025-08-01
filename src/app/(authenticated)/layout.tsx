import React from "react";

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default AuthLayout;
