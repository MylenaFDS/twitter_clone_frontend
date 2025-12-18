import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Header />
        {children}
      </main>
      <aside className="right-bar" />
    </div>
  );
}
