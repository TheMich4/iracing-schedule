import CarsDialog from "./cars-dialog";
import ConfigDialog from "./config-dialog";

const ScheduleTableDialogs = ({
  selectedRow,
  setSelectedRow,
  showConfig,
  setShowConfig,
  columns,
}) => {
  return (
    <>
      <CarsDialog
        close={() => setSelectedRow(null)}
        isOpen={Boolean(selectedRow)}
        series={selectedRow}
      />
      <ConfigDialog
        close={() => setShowConfig(false)}
        isOpen={showConfig}
        columns={columns}
      />
    </>
  );
};

export default ScheduleTableDialogs;
