import { Eye, EyeOff, LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className={cn("relative rounded-md", className)}>
        <div className="w-full relative">
          {StartIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <StartIcon size={18} className="text-muted-foreground" />
            </div>
          )}
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 dark:text-white disabled:cursor-not-allowed disabled:opacity-50",
              startIcon ? "pl-10" : "",
              endIcon ? "pr-10" : "",
              className
            )}
            ref={ref}
            {...props}
          />
          {EndIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <EndIcon className="text-muted-foreground" size={18} />
            </div>
          )}
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
