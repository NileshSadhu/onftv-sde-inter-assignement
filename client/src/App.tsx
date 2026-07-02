import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

// public
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/Notfound";

// campaign
import EditCampaign from "./pages/campaign/EditCampaign";
import CreateCampaign from "./pages/campaign/CreateCampaign";
import Journeys from "./pages/journey/Journeys";
import CreateJourney from "./pages/journey/CreateJourney";
import EditJourney from "./pages/journey/EditJourney";

// journey

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/create"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/:id/edit"
          element={
            <ProtectedRoute>
              <EditCampaign />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journeys"
          element={
            <ProtectedRoute>
              <Journeys />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journeys/create"
          element={
            <ProtectedRoute>
              <CreateJourney />
            </ProtectedRoute>
          }
        />

        <Route
          path="/journeys/:id/edit"
          element={
            <ProtectedRoute>
              <EditJourney />
            </ProtectedRoute>
          }
        />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
