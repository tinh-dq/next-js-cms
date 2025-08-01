"use client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import SkipToMain from "@/components/skip-to-main";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
}

export function AuthenticatedLayout({ children }: Props) {
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "sm:transition-[width] sm:duration-200 sm:ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
          )}
        >
          <Header>
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeSwitch />
            </div>
          </Header>
          <Main>{children}</Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
