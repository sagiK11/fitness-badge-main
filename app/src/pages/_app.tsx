import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "@/store";

export default function App({
  Component,
  pageProps: { session, ...rest },
}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </SessionProvider>
  );
}
