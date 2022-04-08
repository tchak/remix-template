import type { MetaFunction } from 'remix';

export const meta: MetaFunction = () => ({ title: 'Remix Template' });
export const handle = { hydrate: true };

export default function IndexRoute() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="py-6">Remix Template</h1>
    </div>
  );
}
