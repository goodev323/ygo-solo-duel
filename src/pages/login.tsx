import { LoadingSplash } from "@/components/LoadingSplash";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense } from "react";

const Page = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClick = async () => {
    await loginWithRedirect({ redirectUri: window.location.origin });
  };
  return (
    <div
      style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <button onClick={handleClick} style={{ height: "2rem" }}>
        ログイン
      </button>
    </div>
  );
};

export const LoginPage = () => (
  <Suspense fallback={<LoadingSplash />}>
    <Page />
  </Suspense>
);
