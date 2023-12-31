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
    <Button variant="link" className="p-0 text-foreground">
      {icons}
      <Link href={href} prefetch={false}>
        {getValue()}
      </Link>
    </Button>
  );
};
