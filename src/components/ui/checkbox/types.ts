export interface CheckboxProps {
  checked?: boolean;
  label: string;
  onChange?: (checked: boolean, id: string) => void;
  id: string;
}
