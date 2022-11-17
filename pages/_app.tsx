import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config.js";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '../components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
const client = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <Layout>
            <ErrorBoundary onReset={reset}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
    </>
  );
}

export default MyApp;
