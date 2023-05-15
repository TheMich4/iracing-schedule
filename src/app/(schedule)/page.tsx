import ScheduleTable from "~/displays/schedule/schedule-table";
import { getCurrentUser } from "~/utils/session";

const NewSchedulePage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="h-full">
      <ScheduleTable content={user?.content} />
    </div>
  );
};

export default NewSchedulePage;
