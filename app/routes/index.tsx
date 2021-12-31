import type { MetaFunction } from 'remix';
import { useTransition, Form } from 'remix';
import { SkipNavContent } from '@reach/skip-nav';

export const meta: MetaFunction = () => ({ title: 'Remix Template' });
export const handle = { hydrate: true };

export default function IndexRoute() {
  const transition = useTransition();
  const connecting = transition.type == 'actionSubmission';

  return (
    <div>
      <h1 className="py-6">Remix Template</h1>
      <SkipNavContent />
      <Form action="/auth/github" method="post" replace>
        <button
          type="submit"
          disabled={connecting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {connecting ? 'Connecting with GitHub...' : 'Continue with GitHub'}
        </button>
      </Form>
    </div>
  );
}
