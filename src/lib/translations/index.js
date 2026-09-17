import en from "./en";
import hi from "./hi";
import bn from "./bn";
import te from "./te";
import mr from "./mr";
import ta from "./ta";
import gu from "./gu";
import kn from "./kn";
import ml from "./ml";
import or from "./or";
import pa from "./pa";

export const translations = {
  en,
  hi,
  bn,
  te,
  mr,
  ta,
  gu,
  kn,
  ml,
  or,
  pa,
};

export const languages = Object.keys(translations).map((key) => ({
  code: key,
  name: translations[key].nativeName,
  engName: translations[key].langName,
}));
