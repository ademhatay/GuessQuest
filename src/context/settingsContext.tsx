import { createContext, useContext, useEffect, useState } from "react";

// Yeni türler ekleyerek başlayın
type Theme = "dark" | "light" | "system";
type Sound = "on" | "off";
type Language = "en" | "tr";

// SettingsProvider için yeni bir state türü oluşturun
type SettingsProviderState = {
  theme: Theme;
  sound: Sound;
  language: Language;
  setTheme: (theme: Theme) => void;
  setSound: (sound: Sound) => void;
  setLanguage: (language: Language) => void;
};

// Başlangıç durumunu tanımlayın
const initialState: SettingsProviderState = {
  theme: "system",
  sound: "on",
  language: "en",
  setTheme: () => null,
  setSound: () => null,
  setLanguage: () => null,
};

// Yeni context'i oluşturun
const SettingsProviderContext = createContext<SettingsProviderState>(initialState);

// SettingsProvider componentini oluşturun
export function SettingsProvider({
  children,
  defaultTheme = "system",
  defaultSound = "on",
  defaultLanguage = "en",
  storageKeyTheme = "app-ui-theme",
  storageKeySound = "app-ui-sound",
  storageKeyLanguage = "app-ui-language",
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultSound?: Sound;
  defaultLanguage?: Language;
  storageKeyTheme?: string;
  storageKeySound?: string;
  storageKeyLanguage?: string;
}) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKeyTheme) as Theme) || defaultTheme
  );
  const [sound, setSound] = useState<Sound>(
    () => (localStorage.getItem(storageKeySound) as Sound) || defaultSound
  );
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKeyLanguage) as Language) || defaultLanguage
  );

  // Tema, ses ve dil için etkileri ayarlayın
  useEffect(() => {
    // Tema ayarları
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Ses ve dil ayarlarını burada yapabilirsiniz
    // Örneğin, sesi kapatmak için bir fonksiyon çağırabilir veya dil değişikliğini işleyebilirsiniz
  }, [theme, sound, language]);

  // Context değerini güncelleyin
  const value = {
    theme,
    sound,
    language,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKeyTheme, newTheme);
      setTheme(newTheme);
    },
    setSound: (newSound: Sound) => {
      localStorage.setItem(storageKeySound, newSound);
      setSound(newSound);
    },
    setLanguage: (newLanguage: Language) => {
      localStorage.setItem(storageKeyLanguage, newLanguage);
      setLanguage(newLanguage);
    },
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

// Yeni bir hook oluşturun
// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
