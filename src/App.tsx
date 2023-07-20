import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";
import { Header } from "./components/header";


import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { ProjectList } from "./pages/projects";
import { RequestCreate } from "./pages/projects/create";



function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={notificationProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
              resources={[
                {
                  name: "projects",
                  list: "/projects",
                  // create: "/projects/create",
                  // create: "/blog-posts/create",
                  // edit: "/blog-posts/edit/:id",
                  // show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
            >
              <Routes>
              <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      {/* <ThemedLayoutV2 Header={() => <Header sticky />}> */}
                      <Header sticky />
                        <Outlet />
                      {/* </ThemedLayoutV2> */}
                    </Authenticated>
                  }
                >
                   <Route index
              element={<NavigateToResource resource="projects" />}
            />
                <Route path="/projects" index element={<ProjectList />} />
                <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        formProps={{
                          defaultValues: {
                            email: "shwetakale144@gmail.com",
                            password: "Shweta123@",
                          },
                        }}
                        title={<h3>Media Wave</h3>}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                </Route>
              </Routes>
              <RefineKbar />
              {/* <UnsavedChangesNotifier /> */}
              {/* <DocumentTitleHandler /> */}
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
