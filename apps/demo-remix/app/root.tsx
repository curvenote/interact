import type { MetaFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-3 flex space-x-2 justify-center">
          <Link to="/" className="text-xl text-blue-600 underline">
            Home
          </Link>
          <Link to="/explore" className="text-xl text-blue-600 underline">
            Explore
          </Link>
          <Link to="/simulate" className="text-xl text-blue-600 underline">
            Simulate
          </Link>
          <Link to="/sessions" className="text-xl text-blue-600 underline">
            User Sessions
          </Link>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
