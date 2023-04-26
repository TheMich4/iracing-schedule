import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import type { CheckboxProps } from "./types";
import { Check } from "lucide-react";

const Checkbox = ({ checked = false, label, onChange, id }: CheckboxProps) => {
  const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState) => {
    if (!onChange) return;
    if (typeof checked !== "boolean") return;

    onChange(checked, id);
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <CheckboxPrimitive.Root
        checked={checked}
        className="peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
        onCheckedChange={handleCheckedChange}
      >
        <CheckboxPrimitive.CheckboxIndicator>
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.CheckboxIndicator>
      </CheckboxPrimitive.Root>
      <label className="font-extra-light text-slate-200">{label}</label>
    </div>
  );
};

export default Checkbox;
