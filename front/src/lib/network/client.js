import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { BACKEND_PATH } from '@/constants'

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProviderNews: {
              keyArgs: ['input', ['slug']], // Ensure each slug's data is cached separately
              merge(existing = [], incoming) {
                const merged = existing ? existing.slice(0) : [];

                incoming.forEach((item) => {
                  if (
                    !merged.some(
                      (existingItem) => existingItem.link === item.link,
                    )
                  ) {
                    merged.push(item);
                  }
                });

                return merged;
              },
            },
          },
        },
      },
    }),
    link: new HttpLink({
      uri: `${BACKEND_PATH}/graphql`,
    }),
  });
});
