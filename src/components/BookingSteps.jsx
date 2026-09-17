import { useLanguage } from "@/lib/LanguageContext";

export default function BookingSteps({ currentStep = 1, totalSteps = 5 }) {
  const { t } = useLanguage();
  
  const steps = [
    { num: 1, label: t("booking.steps.type") || "Type" },
    { num: 2, label: t("booking.steps.details") || "Details" },
    { num: 3, label: t("booking.steps.dateTime") || "Date & Time" },
    { num: 4, label: t("booking.steps.personalInfo") || "Personal Info" },
    { num: 5, label: t("booking.steps.confirm") || "Confirm" },
  ];

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-6">
      {steps.slice(0, totalSteps).map((step, i) => (
        <div key={step.num} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.num < currentStep
                  ? "bg-green-500 text-white shadow-md shadow-green-200"
                  : step.num === currentStep
                  ? "bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg shadow-saffron-200 scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.num < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={`text-[10px] sm:text-xs mt-1.5 font-medium transition-colors ${
              step.num === currentStep ? "text-saffron-600" : step.num < currentStep ? "text-green-600" : "text-gray-400"
            }`}>
              {step.label}
            </span>
          </div>

          {/* Connector */}
          {i < totalSteps - 1 && (
            <div className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 mb-5 rounded-full transition-colors ${
              step.num < currentStep ? "bg-green-400" : "bg-gray-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
