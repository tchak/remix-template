import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';
import { TwitterStrategy } from 'remix-auth-twitter';
import {
  Strategy,
  StrategyVerifyCallback,
  AuthenticateOptions,
} from 'remix-auth';
import type { SessionStorage } from 'remix';

import { sessionStorage } from './session.server';
import { getEnv } from '.';

export type User = { id: string; name: string };

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
      };
    }
  )
);

authenticator.use(
  new TwitterStrategy(
    {
      clientID: getEnv('TWITTER_CLIENT_ID'),
      clientSecret: getEnv('TWITTER_CLIENT_SECRET'),
      callbackURL: getEnv(
        'TWITTER_CALLBACK_URL',
        'http://localhost:3000/auth/twitter/callback'
      ),
    },
    async ({ profile }) => {
      return {
        id: String(profile.id),
        name: profile.name,
      };
    }
  )
);

if (process.env.NODE_ENV != 'production') {
  class DevStrategy<User> extends Strategy<User, void> {
    name = 'dev';

    constructor(verify: StrategyVerifyCallback<User, void>) {
      super(verify);
    }

    async authenticate(
      request: Request,
      sessionStorage: SessionStorage,
      options: AuthenticateOptions
    ): Promise<User> {
      return this.success(
        await this.verify(),
        request,
        sessionStorage,
        options
      );
    }
  }

  authenticator.use(
    new DevStrategy(async () => {
      return {
        id: 'dev',
        name: 'Test User',
      };
    })
  );
}
