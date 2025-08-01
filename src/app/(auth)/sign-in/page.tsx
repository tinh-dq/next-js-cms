import { Suspense } from "react";

import AuthLayout from "@/components/layout/auth-layout";
import { UserAuthForm } from "@/components/sign-in/user-auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignIn() {
  return (
    <Suspense>
      <AuthLayout>
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg">Login</CardTitle>
            <CardDescription>
              Enter your email and password below to login your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
        </Card>
      </AuthLayout>
    </Suspense>
  );
}
