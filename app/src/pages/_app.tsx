import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { Slide, ToastContainer } from "react-toastify";

export default function App({
  Component,
  pageProps: { session, ...rest },
}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...props} />
        <ToastContainer
          position="top-center"
          hideProgressBar
          newestOnTop
          closeButton={false}
          transition={Slide}
          toastClassName="!bg-transparent !shadow-none !relative !mb-3 !p-0"
          bodyClassName="!p-0"
          rtl
        />
      </Provider>
    </SessionProvider>
  );
}
