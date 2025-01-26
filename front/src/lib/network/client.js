import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { BACKEND_PATH } from '@/constants'
import Cookies from 'js-cookie';

export const { getClient } = registerApolloClient(() => {
  const token = Cookies.get('token'); // Retrieve token from cookies
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProviderNews: {
              keyArgs: ['input', ['slug']],
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
      headers: {
        Authorization: token ? `Bearer ${token}` : '', 
      },
    }),
  });
});
