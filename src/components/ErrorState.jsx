import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorState({ title = "Something went wrong", message = "Please try again later.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-5 shadow-sm border border-red-100">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-8">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="min-w-[120px]">
          Try Again
        </Button>
      )}
    </div>
  );
}
