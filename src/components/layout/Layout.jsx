import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { cn } from "@/utils/classnames";

const Layout = ({
  children,
  title,
  description,
  keywords,
  ogImage,
  showSidebar = false,
  sidebarPosition = "left",
  fullWidth = false,
  className,
  footerVariant = "default",
  headerVariant = "default",
  mainClassName,
}) => {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  // Default meta values
  const siteName = process.env.NEXT_PUBLIC_STORE_NAME || "E-Commerce Store";
  const defaultTitle = `${title ? `${title} | ` : ""}${siteName}`;
  const defaultDescription =
    description || "Find the best products at the best prices";
  const defaultKeywords = keywords || "ecommerce, online shopping, products";
  const defaultOgImage = ogImage || "/images/og-image.jpg";

  // Layout classes
  const mainClasses = cn(
    "flex-1 flex flex-col min-h-[calc(100vh-var(--header-height))]",
    mainClassName
  );

  const contentClasses = cn(
    "flex-1",
    fullWidth ? "w-full" : "container mx-auto px-4 sm:px-6 py-8",
    className
  );

  // Admin layout
  if (isAdminRoute) {
    return (
      <>
        <Head>
          <title>{`Admin | ${defaultTitle}`}</title>
          <meta name="description" content="Admin Dashboard" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex h-screen bg-primary-50 dark:bg-primary-950">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header variant="admin" />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-50 dark:bg-primary-950 p-4">
              {children}
            </main>
          </div>
        </div>
      </>
    );
  }

  // Standard layout
  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
        <meta name="keywords" content={defaultKeywords} />
        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defaultTitle} />
        <meta name="twitter:description" content={defaultDescription} />
        <meta name="twitter:image" content={defaultOgImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-background dark:bg-primary-950">
        <Header variant={headerVariant} />

        <div className={mainClasses}>
          {showSidebar ? (
            <div
              className={`container mx-auto px-4 sm:px-6 py-8 flex ${
                sidebarPosition === "right" ? "flex-row-reverse" : "flex-row"
              } gap-8`}
            >
              <aside className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
                <Sidebar />
              </aside>
              <div
                className={`w-full ${
                  showSidebar ? "md:w-3/4 lg:w-4/5" : "w-full"
                }`}
              >
                {children}
              </div>
            </div>
          ) : (
            <div className={contentClasses}>{children}</div>
          )}
        </div>

        <Footer variant={footerVariant} />
      </div>
    </>
  );
};

export default Layout;
