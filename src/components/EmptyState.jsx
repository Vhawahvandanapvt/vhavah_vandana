import { SearchX } from "lucide-react";

export default function EmptyState({ icon: Icon = SearchX, title = "Nothing here yet", message = "Check back later!", action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-5 shadow-sm border border-gray-100">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">{message}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
