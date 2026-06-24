import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Report from "./pages/Report";
import Items from "./pages/Items";
import ClaimPage from "./pages/ClaimPage";
import Admin from "./pages/Admin";
import ItemDetails from "./pages/ItemDetails";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/items"
          element={<Items />}
        />

        <Route
          path="/item/:id"
          element={<ItemDetails />}
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claim/:id"
          element={
            <ProtectedRoute>
              <ClaimPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;