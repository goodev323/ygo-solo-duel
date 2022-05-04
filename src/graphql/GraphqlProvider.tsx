import { useAuth0 } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { PropsWithChildren, useMemo } from "react";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql";

export const GraphqlProvider = ({ children }: PropsWithChildren<{}>) => {
  const { getAccessTokenSilently } = useAuth0();
  const authConfig: AuthConfig<GetTokenSilentlyVerboseResponse> = useMemo(
    () => ({
      getAuth: async () => {
        return await getAccessTokenSilently({ detailedResponse: true });
      },
      willAuthError: ({ authState }) => {
        if (authState?.expires_in) {
          return authState.expires_in < Date.now();
        }
        return !authState || !authState.id_token;
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.id_token) {
          return operation;
        }
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.id_token}`,
            },
          },
        });
      },
    }),
    [getAccessTokenSilently]
  );

  const client = useMemo(
    () =>
      createClient({
        url: import.meta.env.VITE_HASURA_ENDPOINT,
        suspense: true,
        exchanges: [dedupExchange, cacheExchange, authExchange(authConfig), fetchExchange],
      }),
    [authConfig]
  );

  return <Provider value={client}>{children}</Provider>;
};
