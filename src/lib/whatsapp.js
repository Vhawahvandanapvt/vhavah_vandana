/**
 * WhatsApp integration utilities for Vhavah Vandana
 * All payments happen via WhatsApp — no payment gateway.
 */

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  process.env.WHATSAPP_BUSINESS_NUMBER ||
  "916206687491";

const I18N_WHATSAPP = {
  en: {
    header: "🙏 *Namaste! New Booking Request — Vhavah Vandana*",
    bookingId: "Booking ID",
    name: "Name",
    phone: "Phone",
    email: "Email",
    bookingType: "Booking Type",
    ghat: "Ghat",
    service: "Service",
    pandit: "Pandit Ji",
    products: "Products",
    date: "Date",
    time: "Time",
    guests: "Guests",
    venue: "Venue",
    specialReq: "Special Requirements",
    estimatedAmount: "Estimated Amount",
    toBeDecided: "To be decided",
    notAvailable: "N/A",
    closing: "🙏 *Har Har Mahadev!*",
    types: {
      ghat: "🏛️ Ghat Booking",
      puja: "🪔 Puja / Festival",
      marriage: "💍 Marriage / Celebration",
      pandit: "🙏 Pandit Ji Booking",
      samagri: "🛍️ Puja Samagri",
      custom: "✨ Custom Request",
    },
  },
  hi: {
    header: "🙏 *नमस्ते! नया बुकिंग अनुरोध — भाव वंदना*",
    bookingId: "बुकिंग आईडी",
    name: "नाम",
    phone: "फ़ोन",
    email: "ईमेल",
    bookingType: "बुकिंग प्रकार",
    ghat: "घाट",
    service: "पूजा / सेवा",
    pandit: "पंडित जी",
    products: "सामग्री",
    date: "दिनांक",
    time: "समय",
    guests: "अतिथियों की संख्या",
    venue: "स्थान / पता",
    specialReq: "विशेष आवश्यकताएं",
    estimatedAmount: "अनुमानित राशि",
    toBeDecided: "तय किया जाना बाकी",
    notAvailable: "उपलब्ध नहीं",
    closing: "🙏 *हर हर महादेव!*",
    types: {
      ghat: "🏛️ घाट बुकिंग",
      puja: "🪔 पूजा / उत्सव",
      marriage: "💍 विवाह / मांगलिक कार्य",
      pandit: "🙏 पंडित जी बुकिंग",
      samagri: "🛍️ पूजा सामग्री",
      custom: "✨ विशेष अनुरोध",
    },
  },
  bn: {
    header: "🙏 *নমস্কার! নতুন বুকিং অনুরোধ — ভাব বন্দনা*",
    bookingId: "বুকিং আইডি",
    name: "নাম",
    phone: "ফোন",
    email: "ইমেল",
    bookingType: "বুকিংয়ের ধরন",
    ghat: "ঘাট",
    service: "পূজা / সেবা",
    pandit: "পণ্ডিত জী",
    products: "সামগ্রী",
    date: "তারিখ",
    time: "সময়",
    guests: "অতিথির সংখ্যা",
    venue: "স্থান",
    specialReq: "বিশেষ প্রয়োজনীয়তা",
    estimatedAmount: "আনুমানিক পরিমাণ",
    toBeDecided: "স্থির করা বাকি",
    notAvailable: "প্রযোজ্য নয়",
    closing: "🙏 *হর হর মহাদেব!*",
    types: {
      ghat: "🏛️ ঘাট বুকিং",
      puja: "🪔 পূজা ও উৎসব",
      marriage: "💍 বিবাহ ও অনুষ্ঠান",
      pandit: "🙏 পণ্ডিত জী বুকিং",
      samagri: "🛍️ পূজা সামগ্রী",
      custom: "✨ বিশেষ অনুরোধ",
    },
  },
  te: {
    header: "🙏 *నమస్కారం! కొత్త బుకింగ్ అభ్యర్థన — భావ వందన*",
    bookingId: "బుకింగ్ ఐడి",
    name: "పేరు",
    phone: "ఫోన్",
    email: "ఈమెయిల్",
    bookingType: "బుకింగ్ రకం",
    ghat: "ఘాట్",
    service: "పూజ / సేవ",
    pandit: "పండిట్ జీ",
    products: "సామగ్రి",
    date: "తేదీ",
    time: "సమయం",
    guests: "అతిథులు",
    venue: "వేదిక",
    specialReq: "ప్రత్యేక అవసరాలు",
    estimatedAmount: "అంచనా మొత్తం",
    toBeDecided: "నిర్ణయించాల్సి ఉంది",
    notAvailable: "వర్తించదు",
    closing: "🙏 *హర్ హర్ మహాదేవ్!*",
    types: {
      ghat: "🏛️ ఘాట్ బుకింగ్",
      puja: "🪔 పూజ & పండుగలు",
      marriage: "💍 వివాహం & వేడుకలు",
      pandit: "🙏 పండిట్ జీ బుకింగ్",
      samagri: "🛍️ పూజా సామగ్రి",
      custom: "✨ ప్రత్యేక అభ్యర్థన",
    },
  },
  mr: {
    header: "🙏 *नमस्ते! नवीन बुकिंग विनंती — भाव वंदना*",
    bookingId: "बुकिंग आयडी",
    name: "नाव",
    phone: "फोन",
    email: "ईमेल",
    bookingType: "बुकिंग प्रकार",
    ghat: "घाट",
    service: "पूजा / सेवा",
    pandit: "पंडित जी",
    products: "साहित्य",
    date: "तारीख",
    time: "वेळ",
    guests: "पाहुण्यांची संख्या",
    venue: "ठिकाण",
    specialReq: "विशेष आवश्यकता",
    estimatedAmount: "अंदाजे रक्कम",
    toBeDecided: "निश्चित करायचे आहे",
    notAvailable: "लागू नाही",
    closing: "🙏 *हर हर महादेव!*",
    types: {
      ghat: "🏛️ घाट बुकिंग",
      puja: "🪔 पूजा आणि उत्सव",
      marriage: "💍 विवाह व सोहळा",
      pandit: "🙏 पंडित जी बुकिंग",
      samagri: "🛍️ पूजा साहित्य",
      custom: "✨ विशेष विनंती",
    },
  },
  ta: {
    header: "🙏 *வணக்கம்! புதிய முன்பதிவு கோரிக்கை — பாவ வந்தனா*",
    bookingId: "முன்பதிவு ஐடி",
    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    bookingType: "முன்பதிவு வகை",
    ghat: "காட்",
    service: "பூஜை / சேவை",
    pandit: "பண்டிட் ஜி",
    products: "பொருட்கள்",
    date: "தேதி",
    time: "நேரம்",
    guests: "விருந்தினர்கள்",
    venue: "இடம்",
    specialReq: "சிறப்பு தேவைகள்",
    estimatedAmount: "மதிப்பிடப்பட்ட தொகை",
    toBeDecided: "தீர்மானிக்கப்பட வேண்டும்",
    notAvailable: "பொருந்தாது",
    closing: "🙏 *ஹர ஹர மகாதேவ்!*",
    types: {
      ghat: "🏛️ காட் முன்பதிவு",
      puja: "🪔 பூஜை & திருவிழாக்கள்",
      marriage: "💍 திருமணம் & கொண்டாட்டங்கள்",
      pandit: "🙏 பண்டிட் ஜி முன்பதிவு",
      samagri: "🛍️ பூஜை பொருட்கள்",
      custom: "✨ தனிப்பயன் கோரிக்கை",
    },
  },
  gu: {
    header: "🙏 *નમસ્તે! નવી બુકિંગ વિનંતી — ભાવ વંદના*",
    bookingId: "બુકિંગ આઈડી",
    name: "નામ",
    phone: "ફોન",
    email: "ઈમેલ",
    bookingType: "બુકિંગ પ્રકાર",
    ghat: "ઘાટ",
    service: "પૂજા / સેવા",
    pandit: "પંડિત જી",
    products: "સામગ્રી",
    date: "તારીખ",
    time: "સમય",
    guests: "મહેમાનોની સંખ્યા",
    venue: "સ્થળ",
    specialReq: "વિશેષ જરૂરિયાતો",
    estimatedAmount: "અંદાજિત રકમ",
    toBeDecided: "નક્કી કરવાનું બાકી",
    notAvailable: "લાગુ નથી",
    closing: "🙏 *હર હર મહાદેવ!*",
    types: {
      ghat: "🏛️ ઘાટ બુકિંગ",
      puja: "🪔 પૂજા અને ઉત્સવો",
      marriage: "💍 લગ્ન અને ઉજવણી",
      pandit: "🙏 પંડિત જી બુકિંગ",
      samagri: "🛍️ પૂજા સામગ્રી",
      custom: "✨ વિશેષ વિનંતી",
    },
  },
  kn: {
    header: "🙏 *ನಮಸ್ಕಾರ! ಹೊಸ ಬುಕಿಂಗ್ ವಿನಂತಿ — ಭಾವ ವಂದನಾ*",
    bookingId: "ಬುಕಿಂಗ್ ಐಡಿ",
    name: "ಹೆಸರು",
    phone: "ಫೋನ್",
    email: "ಇಮೇಲ್",
    bookingType: "ಬುಕಿಂಗ್ ಪ್ರಕಾರ",
    ghat: "ಘಾಟ್",
    service: "ಪೂಜೆ / ಸೇವೆ",
    pandit: "ಪಂಡಿತ್ ಜಿ",
    products: "ಸಾಮಗ್ರಿ",
    date: "ದಿನಾಂಕ",
    time: "ಸಮಯ",
    guests: "ಅತಿಥಿಗಳು",
    venue: "ಸ್ಥಳ",
    specialReq: "ವಿಶೇಷ ಅವಶ್ಯಕತೆಗಳು",
    estimatedAmount: "ಅಂದಾಜು ಮೊತ್ತ",
    toBeDecided: "ನಿರ್ಧರಿಸಬೇಕಾಗಿದೆ",
    notAvailable: "ಅನ್ವಯಿಸುವುದಿಲ್ಲ",
    closing: "🙏 *ಹರ್ ಹರ್ ಮಹಾದೇವ್!*",
    types: {
      ghat: "🏛️ ಘಾಟ್ ಬುಕಿಂಗ್",
      puja: "🪔 ಪೂಜೆ ಮತ್ತು ಹಬ್ಬಗಳು",
      marriage: "💍 ವಿವಾಹ ಮತ್ತು ಆಚರಣೆಗಳು",
      pandit: "🙏 ಪಂಡಿತ್ ಜಿ ಬುಕಿಂಗ್",
      samagri: "🛍️ ಪೂಜಾ ಸಾಮಗ್ರಿ",
      custom: "✨ ವಿಶೇಷ ವಿನಂತಿ",
    },
  },
  ml: {
    header: "🙏 *നമസ്കാരം! പുതിയ ബുക്കിംഗ് അഭ്യർത്ഥന — ഭാവ വന്ദന*",
    bookingId: "ബുക്കിംഗ് ഐഡി",
    name: "പേര്",
    phone: "ഫോൺ",
    email: "ഇമെയിൽ",
    bookingType: "ബുക്കിംഗ് തരം",
    ghat: "ഘട്ട്",
    service: "പൂജ / സേവനം",
    pandit: "പണ്ഡിറ്റ് ജി",
    products: "സാമഗ്രികൾ",
    date: "തീയതി",
    time: "സമയം",
    guests: "അതിഥികൾ",
    venue: "സ്ഥലം",
    specialReq: "പ്രത്യേക ആവശ്യങ്ങൾ",
    estimatedAmount: "കണക്കാക്കിയ തുക",
    toBeDecided: "തീരുമാനിക്കേണ്ടതുണ്ട്",
    notAvailable: "ബാധകമല്ല",
    closing: "🙏 *ഹർ ഹർ മഹാദേവ്!*",
    types: {
      ghat: "🏛️ ഘട്ട് ബുക്കിംഗ്",
      puja: "🪔 പൂജയും ഉത്സവങ്ങളും",
      marriage: "💍 വിവാഹവും ആഘോഷങ്ങളും",
      pandit: "🙏 പണ്ഡിറ്റ് ജി ബുക്കിംഗ്",
      samagri: "🛍️ പൂജാ സാമഗ്രികൾ",
      custom: "✨ പ്രത്യേക അഭ്യർത്ഥന",
    },
  },
  or: {
    header: "🙏 *ନମସ୍କାର! ନୂତନ ବୁକିଂ ଅନୁରୋଧ — ଭାବ ବନ୍ଦନା*",
    bookingId: "ବୁକିଂ ଆଇଡି",
    name: "ନାମ",
    phone: "ଫୋନ୍",
    email: "ଇମେଲ୍",
    bookingType: "ବୁକିଂ ପ୍ରକାର",
    ghat: "ଘାଟ",
    service: "ପୂଜା / ସେବା",
    pandit: "ପଣ୍ଡିତ ଜୀ",
    products: "ସାମଗ୍ରୀ",
    date: "ତାରିଖ",
    time: "ସମୟ",
    guests: "ଅତିଥି ସଂଖ୍ୟା",
    venue: "ସ୍ଥାନ",
    specialReq: "ବିଶେଷ ଆବଶ୍ୟକତା",
    estimatedAmount: "ଆନୁମାନିକ ପରିମାଣ",
    toBeDecided: "ସ୍ଥିର ହେବା ବାକି",
    notAvailable: "ପ୍ରଯୁଜ୍ୟ ନୁହେଁ",
    closing: "🙏 *ହର ହର ମହାଦେବ!*",
    types: {
      ghat: "🏛️ ଘାଟ ବୁକିଂ",
      puja: "🪔 ପୂଜା ଏବଂ ପର୍ବପର୍ବାଣୀ",
      marriage: "💍 ବିବାହ ଏବଂ ଉତ୍ସବ",
      pandit: "🙏 ପଣ୍ଡିତ ଜୀ ବୁକିଂ",
      samagri: "🛍️ ପୂଜା ସାମଗ୍ରୀ",
      custom: "✨ ବିଶେଷ ଅନୁରୋଧ",
    },
  },
  pa: {
    header: "🙏 *ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਨਵੀਂ ਬੁਕਿੰਗ ਬੇਨਤੀ — ਭਾਵ ਵੰਦਨਾ*",
    bookingId: "ਬੁਕਿੰਗ ਆਈਡੀ",
    name: "ਨਾਮ",
    phone: "ਫ਼ੋਨ",
    email: "ਈਮੇਲ",
    bookingType: "ਬੁਕਿੰਗ ਕਿਸਮ",
    ghat: "ਘਾਟ",
    service: "ਪੂਜਾ / ਸੇਵਾ",
    pandit: "ਪੰਡਿਤ ਜੀ",
    products: "ਸਮੱਗਰੀ",
    date: "ਮਿਤੀ",
    time: "ਸਮਾਂ",
    guests: "ਮਹਿਮਾਨਾਂ ਦੀ ਗਿਣਤੀ",
    venue: "ਸਥਾਨ",
    specialReq: "ਵਿਸ਼ੇਸ਼ ਲੋੜਾਂ",
    estimatedAmount: "ਅੰਦਾਜ਼ਨ ਰਕਮ",
    toBeDecided: "ਫੈਸਲਾ ਕਰਨਾ ਬਾਕੀ",
    notAvailable: "ਲਾਗੂ ਨਹੀਂ",
    closing: "🙏 *ਹਰ ਹਰ ਮਹਾਦੇਵ!*",
    types: {
      ghat: "🏛️ ਘਾਟ ਬੁਕਿੰਗ",
      puja: "🪔 ਪੂਜਾ ਅਤੇ ਤਿਉਹਾਰ",
      marriage: "💍 ਵਿਆਹ ਅਤੇ ਜਸ਼ਨ",
      pandit: "🙏 ਪੰਡਿਤ ਜੀ ਬੁਕਿੰਗ",
      samagri: "🛍️ ਪੂਜਾ ਸਮੱਗਰੀ",
      custom: "✨ ਵਿਸ਼ੇਸ਼ ਬੇਨਤੀ",
    },
  },
};

/**
 * Generate a WhatsApp booking message in the user's selected language
 */
export function generateBookingMessage(booking, preferredLanguage) {
  const lang = preferredLanguage || booking.language || booking.locale || "en";
  const dict = I18N_WHATSAPP[lang] || I18N_WHATSAPP.en;

  const lines = [
    dict.header,
    "",
    `📋 *${dict.bookingId}:* ${booking.bookingId}`,
    `👤 *${dict.name}:* ${booking.customerName}`,
    `📱 *${dict.phone}:* ${booking.phone}`,
    `📧 *${dict.email}:* ${booking.email || dict.notAvailable}`,
    "",
    `📌 *${dict.bookingType}:* ${formatBookingType(booking.bookingType, dict)}`,
  ];

  if (booking.ghatName) {
    lines.push(`🏛️ *${dict.ghat}:* ${booking.ghatName}`);
  }

  if (booking.serviceName) {
    lines.push(`🪔 *${dict.service}:* ${booking.serviceName}`);
  }

  if (booking.panditName) {
    lines.push(`🙏 *${dict.pandit}:* ${booking.panditName}`);
  }

  if (booking.products && booking.products.length > 0) {
    lines.push("", `🛍️ *${dict.products}:*`);
    booking.products.forEach((p) => {
      lines.push(`  • ${p.name} (${p.purchaseType}) x${p.quantity} — ₹${p.price}`);
    });
  }

  lines.push(
    "",
    `📅 *${dict.date}:* ${booking.date || dict.toBeDecided}`,
    `⏰ *${dict.time}:* ${booking.time || dict.toBeDecided}`,
    `👥 *${dict.guests}:* ${booking.guests || dict.notAvailable}`,
    `📍 *${dict.venue}:* ${booking.venue || dict.notAvailable}`,
  );

  if (booking.specialRequirements) {
    lines.push("", `📝 *${dict.specialReq}:*`, booking.specialRequirements);
  }

  lines.push(
    "",
    `💰 *${dict.estimatedAmount}:* ₹${booking.estimatedAmount || 0}`,
    "",
    dict.closing,
  );

  return lines.join("\n");
}

/**
 * Generate WhatsApp URL with pre-filled booking message
 */
export function generateWhatsAppBookingUrl(booking, preferredLanguage) {
  const message = generateBookingMessage(booking, preferredLanguage);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Generate a simple WhatsApp URL with custom message
 */
export function generateWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Format booking type for display
 */
function formatBookingType(type, dict) {
  if (dict && dict.types && dict.types[type]) {
    return dict.types[type];
  }
  const defaultTypes = {
    ghat: "🏛️ Ghat Booking",
    puja: "🪔 Puja / Festival",
    marriage: "💍 Marriage / Celebration",
    pandit: "🙏 Pandit Ji Booking",
    samagri: "🛍️ Puja Samagri",
    custom: "✨ Custom Request",
  };
  return defaultTypes[type] || type;
}
