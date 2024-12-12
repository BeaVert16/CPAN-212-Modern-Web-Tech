import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import InterfaceOutput from "./Global/Bars/InterfaceOuput/InterfaceOuput";

//----Authentication----//
import { IsLoggedInContext } from "./auth/IsLoggedInCheck";
import RouteProtector from "./auth/RouteProtector";

//----Pages----//
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import DinoGame from "./pages/DinoGame/DinoGame";
import Settings from "./pages/Settings/Settings";
import SystemListPage from "./pages/Systems/SystemListPage";
import SystemDetail from "./pages/Systems/SystemDetail";

import HistoryList from "./pages/History/HistoryList";
import HistoryDetail from "./pages/History/HistoryDetail";

import PageNotFound from "./pages/Error/PageNotFound";
import LoginPage from "./pages/Login/LoginPage";
import WhatAreYouDoing from "./pages/WhatAreYouDoing/WhatAreYouDoing";

import LoadingCat from "./Global/LoadingCat/LoadingCat";
import Graph from "./pages/Graph/Graph";

const App = () => {
  const { isAuthenticated, loading } = useContext(IsLoggedInContext);

  if (loading) {
    return <LoadingCat />;
  }

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<InterfaceOutput />}>
          <Route
            index
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <HomePage />
              </RouteProtector>
            }
          />
          <Route
            path="about"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <AboutPage />
              </RouteProtector>
            }
          />
          <Route
            path="systems"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <SystemListPage />
              </RouteProtector>
            }
          />
          <Route
            path="systems/:hostname/:client_id"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <SystemDetail />
              </RouteProtector>
            }
          />
          <Route
            path="dinogame"
            element={
              <RouteProtector requiredRole="admin">
                <DinoGame />
              </RouteProtector>
            }
          />
          <Route
            path="settings"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <Settings />
              </RouteProtector>
            }
          />
          <Route
            path="history"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <HistoryList />
              </RouteProtector>
            }
          />
          <Route
            path="history/:hostname/:client_id"
            element={
              <RouteProtector isAuthenticated={isAuthenticated}>
                <HistoryDetail />
              </RouteProtector>
            }
          />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<WhatAreYouDoing />} />
          <Route path="graph" element={<Graph />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
