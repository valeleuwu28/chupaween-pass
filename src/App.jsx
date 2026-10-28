import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Login from "./pages/Login";
import GuestPass from "./pages/GuestPass";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Scanner from "./pages/Scanner";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(null); // Datos del invitado en sesión

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gothic-red text-2xl">
        Cargando...
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login de invitado */}
        <Route
          path="/"
          element={
            guest ? <GuestPass guest={guest} /> : <Login setGuest={setGuest} />
          }
        />

        {/* Ruta de la entrada del invitado (protegida por estado local) */}
        <Route
          path="/pass"
          element={guest ? <GuestPass guest={guest} /> : <Navigate to="/" />}
        />

        {/* Rutas de Administrador */}
        <Route
          path="/admin/login"
          element={session ? <Navigate to="/admin" /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={session ? <AdminPanel /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/scan"
          element={session ? <Scanner /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
