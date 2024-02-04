import { Check } from "lucide-react";
import { useMemo } from "react";

interface CheckmarkCellProps {
  getValue: () => boolean;
}

export const CheckmarkCell = ({ getValue }: CheckmarkCellProps) => {
  const Icon = useMemo(() => {
    return getValue() ? <Check className="h-4 w-4 self-center" /> : null;
  }, [getValue]);

  if (!Icon) {
    return null;
  }

  return <div className="ml-2 flex w-full">{Icon}</div>;
};
