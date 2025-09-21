// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage"; // Vamos criar esta página
import MateriaPrimaPage from "./pages/MateriaPrimaPage";
// Importe outras páginas que criar
import ProdutoIndustrializadoPage from "./pages/ProdutoIndustrializadoPage";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Ou um componente de spinner
  }

  return (
    <Routes>
      {/* Rota de Login */}
      <Route
        path="/"
        element={!session ? <LoginPage /> : <Navigate to="/dashboard" />}
      />

      {/* Rotas Protegidas do Dashboard */}
      <Route
        path="/dashboard"
        element={session ? <MainLayout /> : <Navigate to="/" />}
      >
        {/* Rota inicial do dashboard, redireciona para matérias-primas */}
        <Route index element={<Navigate to="materias-primas" replace />} />
        <Route path="materias-primas" element={<MateriaPrimaPage />} />
        <Route
          path="produtos-industrializados"
          element={<ProdutoIndustrializadoPage />}
        />
        {/* Adicione as rotas para as outras páginas aqui */}
      </Route>
    </Routes>
  );
}

export default App;
