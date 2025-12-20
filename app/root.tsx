import { useState, useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";
import { getLayoutSettings } from "~/lib/contentful";
import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [navigation, setNavigation] = useState({
    home: true,
    research: true,
    team: true,
    publications: true,
    news: true,
    joinUs: true,
    contact: true,
  });

  useEffect(() => {
    const env = {
      CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    };

    getLayoutSettings(env).then((layoutSettings) => {
      if (layoutSettings?.fields) {
        setNavigation(layoutSettings.fields);
      }
    });
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navigation navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer navigation={navigation} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-navy-500 mb-4">{message}</h1>
        <p className="text-gray-600 mb-8">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded-lg text-left text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
