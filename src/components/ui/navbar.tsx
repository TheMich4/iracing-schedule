"use client"

import { useRouter } from "next/navigation"
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const Navbar = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex flex-row items-center justify-between gap-2 p-2 lg:hidden">
      <div className="flex flex-row items-center gap-2">
        <Button size="sm" variant="ghost">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div
          className="cursor-pointer font-semibold"
          onClick={() => void router.push("/")}
        >
          iRacing Schedule
        </div>
      </div>
      <Button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
        size="sm"
        variant="ghost"
      >
        {theme === "dark" ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </Button>
    </nav>
  )
}

export { Navbar }
