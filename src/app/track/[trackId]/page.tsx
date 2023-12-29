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
    <main className="container flex flex-col gap-2 bg-background py-2">
      {track.trackName}
    </main>
  );
}
