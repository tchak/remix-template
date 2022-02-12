import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { SkipNavContent } from '@reach/skip-nav';

import type { Schema } from '~/models/user';
import { authenticator } from '~/util/auth.server';
import { LinkButton } from '~/components/Button';

export const meta: MetaFunction = () => ({ title: 'Remix Template' });
export const handle = { hydrate: true };
export const loader: LoaderFunction = ({ request }) =>
  authenticator.isAuthenticated(request, { failureRedirect: '/signin' });

export default function IndexRoute() {
  const user = useLoaderData<Schema>();
  return (
    <div>
      <h1 className="py-6">Remix Template</h1>
      <SkipNavContent />

      <p className="mb-4 text-base">Hello {user.email}</p>

      <LinkButton to="/signout">Sign Out</LinkButton>
    </div>
  );
}
