import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError("Credenciales incorrectas");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="emoji-float" style={{ top: "15%", left: "10%" }}>
        🔮
      </div>
      <div
        className="emoji-float"
        style={{ bottom: "20%", right: "10%", animationDelay: "1s" }}
      >
        ⚰️
      </div>

      <div className="gothic-card">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🧛</div>
          <h1 className="title-main" style={{ fontSize: "2.5rem", margin: 0 }}>
            Admin
          </h1>
          <p className="subtitle" style={{ marginTop: "5px", marginBottom: 0 }}>
            Zona restringida
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@chupaween.com"
              className="gothic-input"
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="gothic-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-blood">
            {loading ? "🩸 Verificando..." : "🩸 Ingresar al panel"}
          </button>
        </form>

        <div className="admin-link">
          <Link to="/">← Volver al login de invitados</Link>
        </div>
      </div>
    </div>
  );
}
