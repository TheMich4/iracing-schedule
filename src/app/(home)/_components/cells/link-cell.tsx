import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkCellProps {
  getValue: () => string;
  href: string;
}

export const LinkCell = ({ getValue, href }: LinkCellProps) => {
  return (
    <Button variant="link" className="p-0 text-foreground">
      <Link href={href} prefetch={false}>
        {getValue()}
      </Link>
    </Button>
  );
};
