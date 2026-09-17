export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mx-4" />
      <div className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}
