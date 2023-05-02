"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoonIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarButtonProps {
  expanded: boolean
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
      titleId?: string | undefined
    }
  >
  label: string
  onClick?: () => void
  isActive?: boolean
}

const SidebarButton = ({
  label,
  expanded = true,
  Icon,
  onClick,
  isActive,
}: SidebarButtonProps) => {
  // TODO: Find better solution for hydration issue
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    setShowIcon(true)
  }, [])

  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={onClick}
      size="sm"
      variant={isActive ? "secondary" : "ghost"}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      {expanded && label}
    </Button>
  )
}

const Sidebar = () => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [expanded, setExpanded] = useState(true)

  return (
    <div
      className={cn(
        "hidden h-full flex-col justify-between py-2 lg:flex",
        expanded ? "w-64 md:translate-x-0" : "sm:translate-x-0"
      )}
    >
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          {expanded ? "iRacing Schedule" : "iRS"}
        </h2>

        <div className="space-y-1">
          <SidebarButton
            Icon={CalendarDays}
            expanded={expanded}
            //   isActive={router.pathname === "/"}
            label="Schedule"
            onClick={() => void router.push("/")}
          ></SidebarButton>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex flex-col gap-2">
          <SidebarButton
            Icon={theme === "dark" ? MoonIcon : SunIcon}
            label={expanded ? "Theme" : ""}
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          />
          <SidebarButton
            Icon={expanded ? ChevronLeft : ChevronRight}
            expanded={expanded}
            label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((prev) => !prev)}
          />
          {/* <SidebarButton
              Icon={sessionData ? ArrowLeftCircle : ArrowRightCircle}
              expanded={expanded}
              label={sessionData ? "Log out" : "Log in"}
              onClick={handleAuth}
            /> */}
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
