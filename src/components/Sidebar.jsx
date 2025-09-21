// src/components/Sidebar.jsx
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* Você pode colocar sua logo aqui novamente se quiser */}
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <h2>GestorPOA</h2>
      </div>
      <nav className="sidebar-nav">
        {/* Usamos NavLink para que o link ativo ganhe uma classe especial */}
        <NavLink to="/dashboard/materias-primas" className="nav-link">
          Matérias-Primas
        </NavLink>
        <NavLink
          to="/dashboard/produtos-industrializados"
          className="nav-link disabled-link"
        >
          Produto Industrializado
        </NavLink>
        <NavLink
          to="/dashboard/fornecedores"
          className="nav-link disabled-link"
        >
          Adicionar Fornecedor
        </NavLink>
        {/* Adicione outros links aqui conforme for criando as páginas */}
      </nav>
    </aside>
  );
}

export default Sidebar;
