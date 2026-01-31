import { Container } from "@/components/layout/Container";
import { Sidebar } from "@/components/layout/Sidebar";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
