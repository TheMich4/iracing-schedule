import type { CheckboxProps } from "./types";

const Checkbox = ({ checked = false, label, onChange, id }: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-1">
      <input checked={checked} id={id} onChange={onChange} type="checkbox" />
      <span>{label}</span>
    </div>
  );
};
export default Checkbox;
