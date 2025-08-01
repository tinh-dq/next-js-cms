import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface ToastOptions {
  description?: string | React.ReactNode;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  actionButton?: {
    label: string;
    onClick?: () => void;
    dismissOnClick?: boolean;
  };
}

export const showToast = (message: string | React.ReactNode, options?: ToastOptions) => {
  const {
    description,
    type = "info",
    duration = 4000,
    position = "bottom-right",
    actionButton,
  } = options || {};

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="size-5 text-success" />;
      case "error":
        return <AlertCircle className="size-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="size-5 text-yellow-500" />;
      case "info":
        return <Info className="size-5 text-blue-500" />;
      default:
        return null;
    }
  };

  toast(
    <div className="flex items-center justify-between w-full gap-3">
      {getIcon()}
      <div className="flex flex-row gap-4 items-center justify-between w-full pr-5">
        <div className="flex items-center gap-2 flex-1">
          <div>
            <div className="font-semibold">{message}</div>
            {description && <div className="text-sm mt-2 text-muted-foreground">{description}</div>}
          </div>
        </div>

        {actionButton && (
          <div
            className="border rounded-sm py-1 px-4 cursor-pointer text-nowrap"
            onClick={() => {
              if (actionButton.dismissOnClick) {
                toast.dismiss();
              }
              actionButton.onClick?.();
            }}
          >
            {actionButton.label}
          </div>
        )}
      </div>
    </div>,
    {
      duration,
      position,
      closeButton: true,
    }
  );
};
