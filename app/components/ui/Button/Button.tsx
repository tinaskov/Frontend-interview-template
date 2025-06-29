import { LoadingSpinner } from "~/assets/LoadingSpinner";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  loading?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  loading = false,
  disabled,
  className,
  variant = "contained",
  children,
  label,
  color,
  ...props
}) => {
  const isIconOnly = icon && !children;

  return (
    <button
      className={clsx(
        "inline-flex items-center p-1 px-3 rounded justify-center font-medium transition-colors duration-200 text-gray-800",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        isIconOnly && "bg-transparent p-2",
        variant === "text" && "bg-transparent hover:bg-gray-100",
        variant === "contained" && "bg-amber-200 hover:bg-amber-300",
        variant === "outlined" && "border border-amber-300",
        color === "success" && "bg-emerald-500 text-white",
        color === "error" && "bg-red-500 text-white",
        className
      )}
      disabled={disabled || loading}
      {...props}>
      {loading ? <LoadingSpinner /> : icon && <span className={clsx("w-4 h-4", children && "mr-2")}>{icon}</span>}
      {children || label}
    </button>
  );
};

Button.displayName = "Button";
