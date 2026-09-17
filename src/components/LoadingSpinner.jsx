import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
      <Loader2 className={`${sizes[size]} text-primary animate-spin`} />
      {text && (
        <p className="mt-4 text-sm text-gray-500 animate-pulse">{text}</p>
      )}
    </div>
  );
}
