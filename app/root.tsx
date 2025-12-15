import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";
import { getLayoutSettings } from "~/lib/contentful.server";
import "./app.css";

export async function loader({ context }: Route.LoaderArgs) {
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const layoutSettings = await getLayoutSettings(env);

  // Default to all true if no layout settings found
  const navigation = layoutSettings?.fields || {
    home: true,
    research: true,
    team: true,
    publications: true,
    news: true,
    joinUs: true,
    contact: true,
  };

  return { navigation };
}

export const links: Route.LinksFunction = () => [
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
  // Try to get loader data, but provide defaults if not available
  let navigation;
  try {
    const data = useLoaderData() as { navigation: any } | undefined;
    navigation = data?.navigation;
  } catch {
    // If loader data isn't available (like in error boundary), use defaults
    navigation = undefined;
  }

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
