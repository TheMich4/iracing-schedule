import { getCurrentUser } from "@/lib/session"
import { Schedule } from "@/components/displays/schedule"

export default async function IndexPage() {
  const user = await getCurrentUser()

  console.log({ user })

  return <Schedule user={user} />
}
