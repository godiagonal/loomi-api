import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

export const apiKeyStrategyCreator = (
  apiKeys: string[],
  apiClients: string[]
) => {
  const clients = apiKeys.reduce<{ [key: string]: string }>(
    (acc, key, index) => ({
      ...acc,
      [key]: apiClients[index]
    }),
    {}
  );

  return new HeaderAPIKeyStrategy(
    { header: 'X-Api-Key', prefix: '' },
    false,
    (requestKey, done) => {
      const client = clients[requestKey];
      if (!client) {
        return done(new Error('Invalid API key.'));
      }
      return done(null, { client });
    }
  );
};

export const apiKeyStrategyName = 'headerapikey';
