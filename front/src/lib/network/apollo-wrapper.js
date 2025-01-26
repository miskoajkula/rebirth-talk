'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { BACKEND_PATH } from '@/constants'
import { ReflectAdapter as Cookies } from 'next/dist/server/web/spec-extension/adapters/reflect'

function makeClient () {
  const token = Cookies.get('token');

  const httpLink = new HttpLink({
    uri: `${
      BACKEND_PATH}/graphql`,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
  })
}

export function ApolloWrapper ({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
