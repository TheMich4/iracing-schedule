import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";

import Checkbox from "@ui/checkbox";
import { type ConfigDialogProps } from "./types";

const ConfigDialog = ({
  isOpen,
  close,
  columns,
  setColumnVisibility,
}: ConfigDialogProps) => {
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
                  id={column.id}
                  label={(column.columnDef.header as string) ?? column.id}
                  onChange={(checked) => {
                    setColumnVisibility((prev) => ({
                      ...prev,
                      [column.id]: checked,
                    }));
                  }}
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