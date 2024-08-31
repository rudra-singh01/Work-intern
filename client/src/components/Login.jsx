import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
function Login() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
    {
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )
    }
      <div className="flex items-center justify-center gap-10">
        {isAuthenticated ?(
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
          </button>
        ):(
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )}
      </div>
    </>
  );
}

export default Login;
