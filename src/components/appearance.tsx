"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/context/theme-context";

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(theme as "light" | "dark");

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <label className="text-sm font-medium leading-none">Theme</label>
        <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>

        <RadioGroup
          onValueChange={(value) => setSelectedTheme(value as "light" | "dark")}
          defaultValue={selectedTheme}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
        >
          <div>
            <label className="[&:has([data-state=checked])>div]:border-primary block">
              <RadioGroupItem value="light" className="sr-only" />
              <div className="border-muted hover:border-accent items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">Light</span>
            </label>
          </div>

          <div>
            <label className="[&:has([data-state=checked])>div]:border-primary block">
              <RadioGroupItem value="dark" className="sr-only" />
              <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">Dark</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={() => setTheme(selectedTheme)}>Update preferences</Button>
    </div>
  );
}
