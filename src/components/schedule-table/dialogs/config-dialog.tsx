import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog";

import Checkbox from "~/components/checkbox";

const ConfigDialog = ({ isOpen, close, columns }) => {
  return (
    <Dialog onOpenChange={close} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Config</DialogTitle>
          <DialogDescription>Configure the schedule table</DialogDescription>
        </DialogHeader>

        <div>
          {columns.map((column) => {
            return (
              <div className="flex flex-row gap-2" key={column.id}>
                <Checkbox
                  checked={column.getIsVisible()}
                  label={column.id}
                  // onChange={column.getToggleVisibilityHandler()}
                />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDialog;
