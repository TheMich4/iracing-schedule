import { type ChangeEventHandler } from "react";

export interface CheckboxProps {
  checked?: boolean;
  label: string;
  onChange?: (event: ChangeEventHandler<HTMLInputElement>) => void;
  id?: string;
}
