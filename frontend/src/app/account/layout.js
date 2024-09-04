import SideNav from "@/components/SideNav";

export default function Layout({ children }) {
  return (
    <div className="pt-16 grid grid-cols-[16rem_1fr] h-full gap-12">
            <SideNav />
            <div className="py-1">{children}</div>
    </div>
  );
}