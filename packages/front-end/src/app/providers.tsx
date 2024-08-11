'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { AlchemyClientState } from '@account-kit/core';
import { config, queryClient } from '../../config';
import { AlchemyAccountProvider } from '@account-kit/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import AppKitProvider from '@/context';

export default function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: any;
}) {

  const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/86205/realize-it/version/latest',
    cache: new InMemoryCache(),
  });
  return (
    <AppKitProvider initialState={initialState}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppKitProvider>
  );
}
