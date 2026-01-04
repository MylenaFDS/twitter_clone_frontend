import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";
import "../styles/layout.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 🧱 Layout principal (desktop + mobile) */}
      <div className="layout">
        <Sidebar />

        <main className="content">
          {children}
        </main>

        <aside className="right-bar" />
      </div>

      {/* 📱 Bottom Bar (somente mobile) */}
      <BottomBar />
    </>
  );
}
