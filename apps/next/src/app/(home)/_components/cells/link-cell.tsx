import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ReactNode } from "react";

interface LinkCellProps {
  getValue: () => string;
  href: string;
  icons?: ReactNode;
}

export const LinkCell = ({ getValue, href, icons }: LinkCellProps) => {
  return (
    <Button variant="link" className="flex flex-row gap-2 p-0 text-foreground">
      {icons && (
        <span className="flex flex-row items-center justify-center gap-1 hover:no-underline">
          {icons}
        </span>
      )}
      <Link href={href} prefetch={false}>
        {getValue()}
      </Link>
    </Button>
  );
};
