"use client";

// TODO: Add support for system theme

import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const ThemeIcon = useMemo(
    () => (theme === "dark" ? MoonIcon : SunIcon),
    [theme]
  );

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      size="sm"
      variant="ghost"
    >
      <ThemeIcon className="h-4 w-4" />
      <span>Theme</span>
    </Button>
  );
};

export default ThemeSwitch;
