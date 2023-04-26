import CarsDialog from "./cars-dialog";
import ConfigDialog from "./config-dialog";
import type { ScheduleTableDialogsProps } from "./types";

const ScheduleTableDialogs = ({
  selectedRow,
  setSelectedRow,
  showConfig,
  setShowConfig,
  columns,
  setColumnVisibility,
}: ScheduleTableDialogsProps) => {
  return (
    <>
      <CarsDialog
        close={() => setSelectedRow(null)}
        isOpen={Boolean(selectedRow)}
        series={selectedRow}
      />
      <ConfigDialog
        close={() => setShowConfig(false)}
        columns={columns}
        isOpen={showConfig}
        setColumnVisibility={setColumnVisibility}
      />
    </>
  );
};

export default ScheduleTableDialogs;
