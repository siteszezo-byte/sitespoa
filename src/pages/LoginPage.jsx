// src/pages/LoginPage.jsx

import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

function LoginPage() {
  const [authView, setAuthView] = useState("login");

  return (
    <div className="app-container">
      {" "}
      {/* Usamos o mesmo container para centralizar */}
      <div className="login-card">
        {/* Coluna da Esquerda: Imagem/Logo */}
        <div className="login-image-section">
          <img src="/logo.png" alt="Logo GestorPOA" className="logo-overlay" />
        </div>

        {/* Coluna da Direita: Formulários */}
        <div className="login-form-section">
          <main>
            {!authView ? null : ( // Apenas para manter a estrutura, o conteúdo muda abaixo
              <div className="auth-container">
                {authView === "login" ? (
                  <>
                    <Login />
                    <p className="auth-toggle">
                      Não tem cadastro?{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setAuthView("signup");
                        }}
                      >
                        Cadastre-se aqui
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <SignUp />
                    <p className="auth-toggle">
                      Já tem uma conta?{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setAuthView("login");
                        }}
                      >
                        Faça o login
                      </a>
                    </p>
                  </>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
