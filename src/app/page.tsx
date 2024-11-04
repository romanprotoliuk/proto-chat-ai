import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientPage from "./client-page";

export default async function Page() {
  // const session = await getServerSession(authOptions);

  return <ClientPage />;
}
