// src/components/SignUp.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient"; // Importamos nosso cliente

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage("Erro ao criar conta: " + error.message);
    } else if (data.user && data.user.identities.length === 0) {
      // Caso a confirmação de e-mail esteja desativada e o usuário já exista
      setMessage("Usuário já registrado. Tente fazer login.");
    } else if (data.user) {
      setMessage(
        "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
