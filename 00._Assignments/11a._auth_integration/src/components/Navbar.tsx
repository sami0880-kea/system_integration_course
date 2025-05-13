import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="bg-[#0d0d0f] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white font-bold text-xl">
            SI - Auth Integration
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/account" className="text-gray-300 hover:text-white">
              Account
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()}>Log In</Button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.name}</span>
              <Button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
