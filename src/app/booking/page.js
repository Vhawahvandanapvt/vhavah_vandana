"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingSteps from "@/components/BookingSteps";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppBookingUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Landmark, Flame, Heart, Package, UserCircle2, Settings, Home, MessageCircle, CheckCircle2, Loader2, Send } from "lucide-react";

function BookingContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState("");
  const [booking, setBooking] = useState({
    bookingType: searchParams.get("type") || "",
    ghatId: searchParams.get("ghat") || "",
    ghatName: "",
    serviceId: searchParams.get("service") || "",
    serviceName: "",
    panditId: searchParams.get("pandit") || "",
    panditName: "",
    products: [],
    date: "",
    time: "",
    guests: "",
    venue: "",
    customerName: "",
    phone: "",
    email: "",
    specialRequirements: "",
    estimatedAmount: parseInt(searchParams.get("price")) || 0,
  });

  // Set name from URL params
  useEffect(() => {
    const name = searchParams.get("name");
    const type = searchParams.get("type");
    if (name) {
      if (type === "ghat") setBooking((b) => ({ ...b, ghatName: name }));
      if (type === "puja" || type === "marriage") setBooking((b) => ({ ...b, serviceName: name }));
      if (type === "pandit") setBooking((b) => ({ ...b, panditName: name }));
    }
  }, [searchParams]);

  const updateBooking = (field, value) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
  };

  const BOOKING_TYPES = [
    { value: "ghat", icon: Landmark, label: t("booking.types.ghat.label") || "Ghat Booking", desc: t("booking.types.ghat.desc") || "Book a sacred ghat for ceremony" },
    { value: "puja", icon: Flame, label: t("booking.types.puja.label") || "Puja & Festival", desc: t("booking.types.puja.desc") || "Sacred puja or festival ceremony" },
    { value: "marriage", icon: Heart, label: t("booking.types.marriage.label") || "Marriage & Celebration", desc: t("booking.types.marriage.desc") || "Wedding or celebration ceremony" },
    { value: "pandit", icon: UserCircle2, label: t("booking.types.pandit.label") || "Pandit Ji", desc: t("booking.types.pandit.desc") || "Book an experienced pandit" },
    { value: "samagri", icon: Package, label: t("booking.types.samagri.label") || "Puja Samagri", desc: t("booking.types.samagri.desc") || "Order puja items" },
    { value: "custom", icon: Settings, label: t("booking.types.custom.label") || "Custom Request", desc: t("booking.types.custom.desc") || "Custom spiritual service" },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();

      if (data.success) {
        const whatsappUrl = generateWhatsAppBookingUrl({
          ...booking,
          bookingId: data.data.bookingId,
          language: locale || "en",
        });
        setSubmittedWhatsappUrl(whatsappUrl);
        window.open(whatsappUrl, "_blank");
        setStep(5);
      } else {
        alert("Booking failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">{t("booking.pageTitle") || "Book a Service"}</h1>
          <p className="text-gray-500 mt-2">{t("booking.pageSubtitle") || "Complete the form below. You'll be redirected to WhatsApp to confirm."}</p>
        </div>

        <BookingSteps currentStep={step} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-6">
          {/* Step 1: Booking Type */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-xl font-semibold text-gray-900">{t("booking.step1Title") || "What would you like to book?"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BOOKING_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => { updateBooking("bookingType", type.value); nextStep(); }}
                      className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-sm ${
                        booking.bookingType === type.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-100 hover:border-primary/30 bg-white"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                        booking.bookingType === type.value ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">{type.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-xl font-semibold text-gray-900">{t("booking.step2Title") || "Service Details"}</h2>

              {booking.bookingType === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.describeReq") || "Describe your requirement"}</label>
                  <textarea
                    value={booking.specialRequirements}
                    onChange={(e) => updateBooking("specialRequirements", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                    placeholder={t("booking.descPlaceholder") || "Tell us what you need..."}
                  />
                </div>
              )}

              {(booking.ghatName || booking.serviceName || booking.panditName) && (
                <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-primary font-medium mb-1">{t("booking.selectedService") || "Selected Service"}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {booking.ghatName || booking.serviceName || booking.panditName}
                  </p>
                  {booking.estimatedAmount > 0 && (
                    <p className="text-gray-600 font-medium mt-2">{formatPrice(booking.estimatedAmount)}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.venue") || "Venue / Location (optional)"}</label>
                <Input
                  type="text"
                  value={booking.venue}
                  onChange={(e) => updateBooking("venue", e.target.value)}
                  placeholder={t("booking.venuePlaceholder") || "e.g., Dashashwamedh Ghat, Home..."}
                  className="h-12"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={prevStep} variant="outline" size="lg" className="px-8">
                  {t("booking.back") || "Back"}
                </Button>
                <Button onClick={nextStep} size="lg" className="flex-1">
                  {t("booking.continue") || "Continue"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-xl font-semibold text-gray-900">{t("booking.step3Title") || "Date & Time"}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.preferredDate") || "Preferred Date"}</label>
                  <Input
                    type="date"
                    value={booking.date}
                    onChange={(e) => updateBooking("date", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.preferredTime") || "Preferred Time"}</label>
                  <Input
                    type="time"
                    value={booking.time}
                    onChange={(e) => updateBooking("time", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.numberOfGuests") || "Number of Guests"}</label>
                <Input
                  type="number"
                  min="1"
                  value={booking.guests}
                  onChange={(e) => updateBooking("guests", e.target.value)}
                  placeholder={t("booking.guestsPlaceholder") || "Expected number of guests"}
                  className="h-12"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={prevStep} variant="outline" size="lg" className="px-8">
                  {t("booking.back") || "Back"}
                </Button>
                <Button onClick={nextStep} size="lg" className="flex-1">
                  {t("booking.continue") || "Continue"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-xl font-semibold text-gray-900">{t("booking.step4Title") || "Your Information"}</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.fullName") || "Full Name *"}</label>
                <Input
                  type="text"
                  required
                  value={booking.customerName}
                  onChange={(e) => updateBooking("customerName", e.target.value)}
                  placeholder={t("booking.fullNamePlaceholder") || "Your full name"}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.phone") || "Phone Number *"}</label>
                <Input
                  type="tel"
                  required
                  value={booking.phone}
                  onChange={(e) => updateBooking("phone", e.target.value)}
                  placeholder={t("booking.phonePlaceholder") || "+91 99999 99999"}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.email") || "Email (optional)"}</label>
                <Input
                  type="email"
                  value={booking.email}
                  onChange={(e) => updateBooking("email", e.target.value)}
                  placeholder={t("booking.emailPlaceholder") || "your@email.com"}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("booking.specialReq") || "Special Requirements"}</label>
                <textarea
                  value={booking.specialRequirements}
                  onChange={(e) => updateBooking("specialRequirements", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                  placeholder={t("booking.specialReqPlaceholder") || "Any special requests or requirements..."}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={prevStep} variant="outline" size="lg" className="px-8">
                  {t("booking.back") || "Back"}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!booking.customerName || !booking.phone || loading}
                  size="lg"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> {t("booking.processing") || "Processing..."}</>
                  ) : (
                    <><MessageCircle className="w-5 h-5" /> {t("booking.confirmWhatsApp") || "Confirm & WhatsApp"}</>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 mx-auto rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-gray-900">{t("booking.successTitle") || "Booking Submitted!"}</h2>
              <p className="text-gray-600 max-w-md mx-auto text-lg">
                {t("booking.successMsg") || "Your booking details have been sent to our WhatsApp. Our team will confirm your booking within 2 hours."}
              </p>
              
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 max-w-sm mx-auto my-8">
                <p className="text-sm font-medium text-gray-500 mb-1">{t("booking.estimatedAmount") || "Estimated Amount"}</p>
                <p className="text-3xl font-bold text-gray-900">{formatPrice(booking.estimatedAmount)}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="/">
                    <Home className="w-4 h-4" /> {t("booking.goHome") || "Go Home"}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                  <a
                    href={submittedWhatsappUrl || "https://wa.me/916206687491"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" /> {t("booking.openWhatsApp") || "Open WhatsApp"}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="pt-28 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading booking form...</p>
          </div>
        </main>
      }>
        <BookingContent />
      </Suspense>
      <Footer />
    </>
  );
}
