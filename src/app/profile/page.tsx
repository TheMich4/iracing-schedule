import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import UserContent from "~/displays/profile/user-content";
import { getCurrentUser } from "~/utils/session";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-2 overflow-auto p-4">
      <Card className="bg-inherit">
        <CardHeader>
          <CardTitle className="dark:text-slate-50">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2">
            {/* <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback className="dark:text-slate-200">
                {user?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar> */}

            <div>
              <div className="font-bold dark:text-slate-50">{user?.name}</div>
              <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                {user?.email}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <UserContent user={user} />
    </div>
  );
};

export default ProfilePage;
