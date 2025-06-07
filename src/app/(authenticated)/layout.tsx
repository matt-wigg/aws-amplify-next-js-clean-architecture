"use server";

import { Nav } from "@nextjs/components/layout/nav";
import { Footer } from "@nextjs/components/layout/footer";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-[100dvh]">
      <Nav />
      <div className="flex-1 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
}
