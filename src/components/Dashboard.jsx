// src/components/Dashboard.jsx

import { supabase } from "../supabaseClient";
import ProductManager from "./ProductManager"; // 1. IMPORTA O NOVO COMPONENTE

function Dashboard({ session }) {
  const handleLogout = async () => {
    // A função de logout continua a mesma
    await supabase.auth.signOut();
  };

  return (
    // A classe 'auth-box' aqui foi usada para manter um estilo base,
    // mas os estilos internos do dashboard vão predominar.
    <div className="auth-box">
      {/* Cabeçalho do Dashboard com boas-vindas e botão de sair */}
      <div className="dashboard-header">
        <p className="dashboard-info">
          Logado como: <strong>{session.user.email}</strong>
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {/* 2. ADICIONA O GERENCIADOR DE PRODUTOS ABAIXO DO CABEÇALHO */}
      <ProductManager />
    </div>
  );
}

export default Dashboard;
