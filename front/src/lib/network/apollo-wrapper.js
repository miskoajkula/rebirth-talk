'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { BACKEND_PATH } from '@/constants'
import Cookies from 'js-cookie'

function makeClient () {
  // Create a middleware link that fetches the token for every request.
  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token')
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  // Create the HTTP link that will send the requests.
  const httpLink = new HttpLink({
    uri: `${BACKEND_PATH}/graphql`,
  })

  // Combine the auth middleware with the HTTP link.
  const combinedLink = authLink.concat(httpLink)

  // Return the Apollo client instance with the correct link.
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          combinedLink,
        ])
        : combinedLink,
  })
}

export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
