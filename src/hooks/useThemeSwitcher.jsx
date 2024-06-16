import React, { useEffect, useState } from "react";

const useThemeSwitcher = () => {
  //creating the active theme
  const [theme, setTheme] = useState(localStorage.theme);
  const activeTheme = theme === "dark" ? "light" : "dark";       

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(activeTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, activeTheme]);

  return [activeTheme, setTheme];
};

export default useThemeSwitcher;
