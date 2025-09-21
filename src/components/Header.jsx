// src/components/Header.jsx
import { supabase } from "../supabaseClient";

function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Espaço para futuras funcionalidades como busca global */}
        <div className="user-info">
          {/* Você pode adicionar o email do usuário aqui no futuro */}
          <button onClick={handleLogout} className="logout-button-header">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
