import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Add Event":"Add Event",
        "Login":"Login",
        "Select Topic":"Select Topic",
        "Kids":"Kids",
        "Lectures":"Lectures",
        "Fitness":"Fitness",
        "Fun":"Fun",
        "Clear":"Clear",
        "Select Date":"Select Date",
        "Today":"Today",
        "Sunday":"Sunday",
        "Monday":"Monday",
        "Tuesday":"Tuesday",
        "Wednesday":"Wednesday",
        "Thursday":"Thursday",
        "Friday":"Friday",
        "Saturday":"Saturday",
        "Search Results":"Search Results",
        "Results":"Results",
        "Link to Live Event":"Link to Live Event",
        "Save":"Save",
        "Share":"Share",
        "View Host":"View Host",
        "Report":"Report",
        "Views":"Views"
      }
    },
    he: {
      translations: {
        "Add Event":"הוספת אירוע",
        "Login":"התחבר/י",
        "Select Topic":"בחירת קטגוריה",
        "Kids":"ילדים",
        "Lectures":"הרצאות",
        "Fitness":"ספורט",
        "Fun":"לכיף",
        "Clear":"נקה",
        "Select Date":"בחירת תאריך",
        "Today":"היום",
        "Sunday":"ראשון",
        "Monday":"שני",
        "Tuesday":"שלישי",
        "Wednesday":"רביעי",
        "Thursday":"חמישי",
        "Friday":"שישי",
        "Saturday":"שבת",
        "Search Results":"תוצאות חיפוש",
        "Results":"תוצאות",
        "Link to Live Event":"לינק לצפייה באירוע",
        "Save":"שמירה",
        "Share":"שיתוף",
        "View Host":"עמוד המארח",
        "Report":"דיווח",
        "Views":"צפיות"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // Content used in place of keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;