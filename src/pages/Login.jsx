import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login({ setGuest }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Si el celular está vacío, lo enviamos como null
    const phoneToSend = phone.trim() === "" ? null : phone.trim();

    const { data, error } = await supabase.rpc("guest_login", {
      guest_name: name.trim(),
      guest_phone: phoneToSend,
    });

    setLoading(false);

    if (error) {
      setError("Error de conexión. Intenta de nuevo.");
    } else if (data && data.length > 0) {
      setGuest(data[0]);
      navigate("/pass");
    } else {
      setError(
        "👻 No te encontramos. Revisa que tu nombre esté escrito exactamente igual a la lista.",
      );
    }
  };

  return (
    <div className="login-wrapper">
      {/* Emojis decorativos de fondo */}
      <div className="emoji-float" style={{ top: "10%", left: "10%" }}>
        🦇
      </div>
      <div
        className="emoji-float"
        style={{ bottom: "20%", right: "10%", animationDelay: "1s" }}
      >
        💀
      </div>
      <div
        className="emoji-float"
        style={{ top: "25%", right: "15%", animationDelay: "2s" }}
      >
        🎃
      </div>

      <div className="gothic-card">
        <h1 className="title-main">CHUPAWEEN</h1>
        <p className="subtitle">✦ Pass de entrada ✦</p>

        <div className="form-header">
          <h2>¿Estás en la lista?</h2>
          <p>Ingresa con tu nombre registrado</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Como estás en la lista"
              className="gothic-input"
              required
            />
          </div>

          <div className="input-group">
            <label>
              Número de celular{" "}
              <span
                style={{
                  color: "#666",
                  textTransform: "lowercase",
                  fontWeight: "normal",
                }}
              >
                (opcional)
              </span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: 3001234567"
              className="gothic-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="btn-blood">
            {loading ? "🩸 Abriendo portal..." : "🩸 Entrar a Chupaween"}
          </button>
        </form>

        <div className="admin-link">
          ¿Eres admin? <a href="/admin/login">Accede aquí</a>
        </div>
      </div>
    </div>
  );
}
