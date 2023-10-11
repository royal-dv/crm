import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./PrivateRoute";
import MainPage from "./pages/MainPage/MainPage";
import DealsPage from "./pages/DealsPage/DealsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { checkAuthenticated } from "./helpers/checkAuth";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Organization from "./pages/Organization/Organization";
import Panorama from "./pages/Panorama/Panorama";
import { getPermittedPages } from "./helpers/checkPagePermission";
import { pageNames } from "./settings/content";
import { UserProvider } from "./context/useUser";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const authenticated = checkAuthenticated();
  const [pagePermission, setPagePermission] = useState<boolean>(authenticated);

  useEffect(() => {
    getPermittedPages().then((data) => {
      if (!data) return;
      setPagePermission(authenticated && data.includes(pageNames.organization_page));
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute isAuthenticated={!authenticated} authenticationPath={"/"} path={"/signin"} exact component={LoginPage} />
            <ProtectedRoute isAuthenticated={!authenticated} authenticationPath={"/"} path={"/reset-password"} component={ResetPassword} />
            <ProtectedRoute isAuthenticated={authenticated} authenticationPath={"/signin"} path={"/"} exact component={MainPage} />
            <ProtectedRoute isAuthenticated={authenticated} authenticationPath={"/signin"} path={"/deals"} exact component={DealsPage} />
            <ProtectedRoute
              isAuthenticated={pagePermission}
              authenticationPath={"/signin"}
              path={"/organization"}
              exact
              component={Organization}
            />
            <Route path={"/panorama-view/:id/pano/:pano"} exact component={Panorama} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
