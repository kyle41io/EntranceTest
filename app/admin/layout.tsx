import HeaderAdmin from "../components/HeaderAdmin";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HeaderAdmin />
 
      {children}
    </section>
  );
}