import { api } from "@/trpc/server";

export default async function SpecialEventsPage() {
  const specialEvents = await api.specialEvents.get.query();

  if (!specialEvents) {
    return <div>No special events found</div>;
  }

  return (
    <div className="container flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold tracking-tighter">Special Events</h1>

      <div className="grid grid-cols-1 gap-2 font-semibold xl:grid-cols-2 xl:gap-4">
        {specialEvents.map((event) => (
          <div
            key={event.name}
            className="flex flex-row justify-around gap-4 rounded-md border p-4 font-bold"
          >
            <div className="flex w-full flex-row gap-4">
              <div className="flex w-[60px] flex-col items-center justify-around">
                <div className="text-2xl">{event.date.month}</div>
                <div className="text-xl tracking-tighter">
                  {event.date.days}
                </div>
              </div>

              <div className="flex w-full flex-col justify-around">
                <div className="flex flex-row items-baseline justify-between">
                  <div className="text-2xl">{event.name}</div>
                  <div className="text-sm font-normal uppercase tracking-wide">
                    {event.type}
                  </div>
                </div>

                <div className="flex flex-row items-baseline justify-between">
                  <div className="text-md text-sm font-normal uppercase italic tracking-wider">
                    {event.track}
                  </div>
                  <div className="text-xs font-normal tracking-wide">
                    {event.cars}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
