import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { UserAvatar } from "~/displays/profile/user-avatar";
import { UserContent } from "~/displays/profile/user-content";
import { getCars } from "~/pages/api/content/get-cars";
import { getCurrentUser } from "~/utils/session";
import { getTracks } from "~/pages/api/content/get-tracks";

const ProfilePage = async () => {
  const user = await getCurrentUser();
  const tracks = await getTracks();
  const cars = await getCars();

  if (!user) return null;

  return (
    <div className="custom-scrollbar flex flex-col gap-2 overflow-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2">
            <UserAvatar user={user} />

            <div>
              <div className="font-bold dark:text-slate-50">{user?.name}</div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                {user?.email}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserContent user={user} tracks={tracks} cars={cars} />
    </div>
  );
};

export default ProfilePage;
