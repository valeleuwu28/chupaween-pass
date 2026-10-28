import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { QRCodeSVG } from "qrcode.react";

export default function GuestPass({ guest }) {
  const [config, setConfig] = useState({ address: "", rules: "" });

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("event_config")
        .select("address, rules")
        .single();
      if (data) setConfig(data);
    };
    fetchConfig();
  }, []);

  return (
    <div className="app-container" style={{ paddingBottom: "40px" }}>
      {/* Emojis de fondo */}
      <div className="emoji-float" style={{ top: "5%", right: "5%" }}>
        🦇
      </div>
      <div
        className="emoji-float"
        style={{ top: "40%", left: "3%", animationDelay: "1s" }}
      >
        🕸️
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header de agradecimiento */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "10px",
              animation: "float 4s ease-in-out infinite",
            }}
          >
            🎃
          </div>
          <h1
            className="title-main"
            style={{ fontSize: "2.5rem", marginBottom: "10px" }}
          >
            ¡GRACIAS POR TU COMPRA!
          </h1>
          <div className="blood-divider" style={{ margin: "15px 0" }}></div>
          <p style={{ fontSize: "1.1rem", color: "#e8e3e8" }}>
            Nos vemos en{" "}
            <span
              style={{
                fontFamily: "Creepster, cursive",
                color: "#ff1f1f",
                fontSize: "1.5rem",
              }}
            >
              Chupaween
            </span>
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#fff",
              marginTop: "5px",
            }}
          >
            {guest.name}
          </p>
        </div>

        {/* BOLETO VIP DEL QR */}
        <div className="qr-ticket">
          <div className="qr-info">
            <h2 className="qr-info-title">✦ PASE VIP ✦</h2>
            <p className="qr-info-subtitle">Entrada Única</p>
          </div>

          <div className="qr-ticket-divider"></div>

          <div className="qr-frame">
            <div className="qr-corners"></div>
            <QRCodeSVG value={guest.qr_token} size={180} level="H" />
          </div>

          <p className="qr-ticket-id">
            ID: {guest.id.split("-")[0].toUpperCase()}
          </p>

          <div className="qr-ticket-divider"></div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "#aaa",
              textAlign: "center",
              padding: "0 10px",
            }}
          >
            Muestra este boleto en la puerta. Código único e intransferible.
          </p>
        </div>

        {/* Estados */}
        <div className="stats-grid" style={{ marginBottom: "20px" }}>
          <div className="stat-card">
            <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
              {guest.checked_in ? "✅" : "⏳"}
            </p>
            <p className="stat-label">Ingreso</p>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                marginTop: "5px",
                color: guest.checked_in ? "#4ade80" : "#facc15",
              }}
            >
              {guest.checked_in ? "Confirmado" : "Pendiente"}
            </p>
          </div>
          <div className="stat-card">
            <p style={{ fontSize: "1.5rem", marginBottom: "5px" }}>
              {guest.sustogomis_delivered ? "🍬" : "🍭"}
            </p>
            <p className="stat-label">Sustogomis</p>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                marginTop: "5px",
                color: guest.sustogomis_delivered ? "#c084fc" : "#888",
              }}
            >
              {guest.sustogomis_delivered ? "Entregados" : "Pendientes"}
            </p>
          </div>
        </div>

        {/* Dirección */}
        <div className="gothic-card" style={{ marginBottom: "15px" }}>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}
          >
            <div style={{ fontSize: "1.5rem" }}>📍</div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#ff1f1f",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                Dirección secreta
              </h2>
              <p
                style={{
                  color: "#e8e3e8",
                  fontSize: "1.1rem",
                  lineHeight: "1.5",
                }}
              >
                {config.address || "Cargando..."}
              </p>
            </div>
          </div>
        </div>

        {/* Reglas */}
        <div className="gothic-card">
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}
          >
            <div style={{ fontSize: "1.5rem" }}>📜</div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#ff1f1f",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                Reglas de la fiesta
              </h2>
              <p
                style={{
                  color: "#e8e3e8",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  whiteSpace: "pre-line",
                }}
              >
                {config.rules || "Cargando..."}
              </p>
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#555",
            marginTop: "30px",
          }}
        >
          🦇 Chupaween 2026 • No compartas tu QR 🦇
        </p>
      </div>
    </div>
  );
}
