import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
  hideSidebar?: boolean;
}

const Layout = ({ children, hideSidebar }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
