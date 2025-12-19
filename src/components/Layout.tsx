import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "../styles/layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <TopBar />
        {children}
      </main>
      <aside className="right-bar" />
    </div>
  );
}
