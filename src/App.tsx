import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { LoadingSplash } from "./components/LoadingSplash";
import { GraphqlProvider } from "./graphql/GraphqlProvider";
import { Layout } from "./layout";
import { LoginPage } from "./pages/login";
import { UsersPage } from "./pages/users";

const App = () => {
  console.log(import.meta.env.VITE_HASURA_ENDPOINT);
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        redirectUri={import.meta.env.VITE_AUTH0_REDIRECT_URI}
        cacheLocation="localstorage"
      >
        <GraphqlProvider>
          <Routes>
            <Route path="/" element={<AuthRoute />}>
              <Route element={<Layout />}>
                <Route path="users" element={<UsersPage />} />
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GraphqlProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
};

export const AuthRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);
  if (isLoading) return <LoadingSplash />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
};

export default App;
