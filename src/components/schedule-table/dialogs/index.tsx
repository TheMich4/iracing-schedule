import CarsDialog from "./cars-dialog";

const ScheduleTableDialogs = ({ selectedRow, setSelectedRow }) => {
  return (
    <>
      <CarsDialog
        close={() => setSelectedRow(null)}
        isOpen={Boolean(selectedRow)}
        series={selectedRow}
      />
    </>
  );
};

export default ScheduleTableDialogs;
