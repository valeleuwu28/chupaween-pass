import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { QRCodeSVG } from "qrcode.react";

export default function GuestPass({ guest }) {
  const [config, setConfig] = useState({ address: "", rules: "" });
  const [activeTab, setActiveTab] = useState("reglas"); // 'reglas', 'dinamicas', 'evento'

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("event_config")
        .select("address")
        .single();
      if (data) setConfig(data);
    };
    fetchConfig();
  }, []);

  return (
    <div className="app-container" style={{ paddingBottom: "40px" }}>
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
        {/* Header */}
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

        {/* ESTADOS */}
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

        {/* ALERTA ROJA IMPORTANTE */}
        <div className="alert-box">
          <p className="alert-title">⚠️ ADVERTENCIA CRÍTICA ⚠️</p>
          <p className="alert-text">
            Prohibido el ingreso a <strong>menores de 18 años</strong>.<br />
            Es <strong>OBLIGATORIO</strong> presentar el carnet de identidad
            físico.
            <br />
            Sin carnet o siendo menor,{" "}
            <strong>NO SE PERMITIRÁ EL INGRESO Y NO HABRÁ DEVOLUCIONES.</strong>
          </p>
        </div>

        {/* MENÚ DE PESTAÑAS */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "reglas" ? "active" : ""}`}
            onClick={() => setActiveTab("reglas")}
          >
            📜 Reglas
          </button>
          <button
            className={`tab-btn ${activeTab === "dinamicas" ? "active" : ""}`}
            onClick={() => setActiveTab("dinamicas")}
          >
            🕸️ Dinámicas
          </button>
          <button
            className={`tab-btn ${activeTab === "evento" ? "active" : ""}`}
            onClick={() => setActiveTab("evento")}
          >
            📍 Ubicacion
          </button>
        </div>

        {/* CONTENIDO DE LAS PESTAÑAS */}
        <div className="gothic-card" style={{ minHeight: "250px" }}>
          {/* PESTAÑA: REGLAS */}
          {activeTab === "reglas" && (
            <div>
              <h3
                style={{
                  color: "#fff",
                  marginBottom: "15px",
                  fontSize: "1.2rem",
                }}
              >
                Reglas de Convivencia
              </h3>

              <div className="rule-item">
                <div className="rule-icon">⏰</div>
                <div className="rule-text">
                  <strong>Horarios de Ingreso:</strong>
                  <br />
                  Preventa hasta las 20:30. Venta en puerta hasta las 19:30.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">🥃</div>
                <div className="rule-text">
                  Pueden traer su propio consumo,{" "}
                  <strong>excepto sustancias ilícitas</strong>.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">👊</div>
                <div className="rule-text">
                  <strong>Cero peleas</strong>, agresiones o problemas. ¡Venimos
                  a pasarla bien!
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">🍻</div>
                <div className="rule-text">
                  No se permitirá el ingreso de personas en estado de ebriedad.
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">🏠</div>
                <div className="rule-text">
                  Respeten las instalaciones.{" "}
                  <strong>Cualquier daño será cobrado</strong> al responsable.
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA: DINÁMICAS */}
          {activeTab === "dinamicas" && (
            <div>
              <h3
                style={{
                  color: "#fff",
                  marginBottom: "15px",
                  fontSize: "1.2rem",
                }}
              >
                Dinámicas de la Noche
              </h3>

              <div className="dynamic-card">
                <p className="dynamic-title">🩸 1. SHOT O TRUCO 👻</p>
                <p className="dynamic-text">
                  ¿Te atreves a elegir? Toma un shot o cumple un reto. Podrás
                  ganar premios como cócteles o dulces. ¡Opcional!
                </p>
              </div>

              <div className="dynamic-card">
                <p className="dynamic-title">🎭 2. CONCURSO DE DISFRACES 🏆</p>
                <p className="dynamic-text">
                  ¡Saca tu lado más terrorífico!
                  <br />
                  🥇 1er lugar: Una botella 🍾
                  <br />
                  🥈 2do lugar: 2 baldes de Chupisangre 🩸
                  <br />
                  🥉 3er lugar: 1 balde de Chupisangre 🩸
                </p>
              </div>

              <div className="dynamic-card">
                <p className="dynamic-title">
                  🍬 3. SUSTOGOMIS DE BIENVENIDA 👹
                </p>
                <p className="dynamic-text">
                  Cada entrada incluye sus sustogomis para comenzar la noche con
                  un toque dulce y terrorífico. 🍭
                </p>
              </div>

              <div className="dynamic-card">
                <p className="dynamic-title">🎃 4. PIÑATA DEL TERROR 💀</p>
                <p className="dynamic-text">
                  ¡Prepárense para romperla! Habrá dulces y sorpresas para
                  adultos. 🍬
                </p>
              </div>

              <div className="dynamic-card">
                <p className="dynamic-title">🎧 MÚSICA 🎶</p>
                <p className="dynamic-text">
                  ¡Obvio que habrá DJ para poner la fiesta a otro nivel!
                  Prepárense para bailar toda la noche. 🪩
                </p>
              </div>
            </div>
          )}

          {/* PESTAÑA: EVENTO Y UBICACIÓN */}
          {activeTab === "evento" && (
            <div>
              <h3
                style={{
                  color: "#fff",
                  marginBottom: "15px",
                  fontSize: "1.2rem",
                }}
              >
                Datos del Evento
              </h3>

              <div
                className="rule-item"
                style={{ borderLeftColor: "#c084fc", marginBottom: "20px" }}
              >
                <div className="rule-icon">📅</div>
                <div className="rule-text">
                  <strong>31 de Octubre</strong>
                  <br />
                  Open doors: 18:00
                  <br />
                  <span style={{ color: "#ff1f1f", fontWeight: "bold" }}>
                    Disfraz Obligatorio 🧛
                  </span>
                </div>
              </div>

              <h3
                style={{
                  color: "#fff",
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                }}
              >
                ¿Cómo llegar?
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#aaa",
                  marginBottom: "15px",
                }}
              >
                La ubicación es secreta. Haz clic en el botón para abrir el mapa
                en tu celular:
              </p>

              {config.address && config.address.includes("http") ? (
                <a
                  href={
                    config.address.split("http")[1]
                      ? "http" + config.address.split("http")[1]
                      : config.address
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blood"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    marginTop: "10px",
                  }}
                >
                  🗺️ Abrir en Google Maps
                </a>
              ) : (
                <p style={{ color: "#e8e3e8", fontSize: "1.1rem" }}>
                  {config.address || "Cargando..."}
                </p>
              )}

              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "0.75rem", color: "#888" }}>
                  📲 Si tienes problemas con tu QR, comunícate con el
                  organizador que te vendió tu entrada.
                </p>
              </div>
            </div>
          )}
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
