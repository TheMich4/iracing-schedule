import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/server";

interface TrackPageProps {
  params: {
    trackId: string;
  };
}

export default async function TrackPage({
  params: { trackId },
}: TrackPageProps) {
  const track = await api.track.get.query(+trackId);
  console.log({ trackId, track });
  return (
    <main className="container flex flex-col gap-2 bg-background py-4">
      <div className="text-2xl font-bold">{`${track.trackName} - ${track.configName}`}</div>
      {track.freeWithSubscription && (
        <Badge className="w-fit" size="xs">
          FREE
        </Badge>
      )}
    </main>
  );
}
