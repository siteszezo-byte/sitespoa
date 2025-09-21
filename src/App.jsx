// src/App.jsx
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import "./App.css"; // Pode estilizar como quiser depois

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebApp - Produtos de Origem Animal</h1>
      </header>
      <main>
        <div className="auth-container">
          <div className="auth-box">
            <SignUp />
          </div>
          <div className="auth-box">
            <Login />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
