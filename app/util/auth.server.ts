import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';

import { sessionStorage } from './session.server';
import { getEnv } from '.';

type User = { id: string; name: string; email: string };

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: getEnv('GITHUB_CLIENT_ID'),
      clientSecret: getEnv('GITHUB_CLIENT_SECRET'),
      callbackURL: getEnv(
        'GITHUB_CALLBACK_URL',
        'http://localhost:3000/auth/github/callback'
      ),
    },
    async ({ profile }) => {
      return {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };
    }
  )
);
