import { Check } from "lucide-react";
import { useMemo } from "react";

interface CheckmarkCellProps {
  getValue: () => unknown;
}

export const CheckmarkCell = ({ getValue }: CheckmarkCellProps) => {
  const Icon = useMemo(() => {
    return getValue() ? <Check className="h-4 w-4" /> : null;
  }, [getValue]);

  return <div>{Icon}</div>;
};
