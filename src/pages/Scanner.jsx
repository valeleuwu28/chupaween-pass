import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);
  const navigate = useNavigate();

  const startScan = () => {
    setScanResult(null);
    setError("");
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 10,
    });

    const onScanSuccess = async (decodedText) => {
      scanner.clear().catch(() => {});
      const { data, error } = await supabase.rpc("admin_verify_qr", {
        token: decodedText,
      });
      if (error) {
        setError("Error al verificar. Asegúrate de tener permisos de admin.");
      } else if (data && data.length > 0) {
        setScanResult(data[0]);
      } else {
        setError("❌ QR inválido o invitado no encontrado");
      }
    };

    scanner.render(onScanSuccess, () => {});
    return () => scanner.clear().catch(() => {});
  };

  useEffect(() => {
    const cleanup = startScan();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const markCheckIn = async () => {
    if (!scanResult) return;
    setMarking(true);
    await supabase
      .from("guests")
      .update({ checked_in: true })
      .eq("id", scanResult.id);
    setMarking(false);
    setScanResult({ ...scanResult, checked_in: true });
  };

  const markCandy = async () => {
    if (!scanResult) return;
    setMarking(true);
    await supabase
      .from("guests")
      .update({ sustogomis_delivered: true })
      .eq("id", scanResult.id);
    setMarking(false);
    setScanResult({ ...scanResult, sustogomis_delivered: true });
  };

  return (
    <div className="app-container">
      <div className="admin-header" style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem" }}>Escanear</h1>
        <button onClick={() => navigate("/admin")} className="btn-logout">
          ← Volver
        </button>
      </div>

      {!scanResult && !error && (
        <div className="gothic-card">
          <p
            style={{
              textAlign: "center",
              color: "#aaa",
              fontSize: "0.9rem",
              marginBottom: "15px",
            }}
          >
            Apunta la cámara al código QR del invitado
          </p>
          <div id="reader"></div>
        </div>
      )}

      {error && (
        <div className="gothic-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "10px" }}>👻</p>
          <p
            style={{
              color: "#ff8888",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-blood"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {scanResult && (
        <div className="gothic-card">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🎃</div>
            <p
              style={{
                color: "#4ade80",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              ✅ QR Válido
            </p>
            <h2 style={{ fontSize: "1.8rem", color: "#fff", margin: "5px 0" }}>
              {scanResult.name}
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem" }}>
              📱 {scanResult.phone}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={markCheckIn}
              disabled={scanResult.checked_in || marking}
              className={`btn-toggle ${scanResult.checked_in ? "btn-checked" : "btn-blood"}`}
              style={
                !scanResult.checked_in
                  ? { padding: "15px" }
                  : { padding: "15px" }
              }
            >
              {scanResult.checked_in
                ? "✅ Ya ingresó"
                : marking
                  ? "⏳..."
                  : "🚪 Confirmar ingreso"}
            </button>

            <button
              onClick={markCandy}
              disabled={scanResult.sustogomis_delivered || marking}
              className="btn-toggle"
              style={{
                padding: "15px",
                background: scanResult.sustogomis_delivered
                  ? "rgba(168, 85, 247, 0.15)"
                  : "linear-gradient(135deg, #4a1a5c, #2a0b30)",
                color: scanResult.sustogomis_delivered ? "#c084fc" : "#fff",
                borderColor: scanResult.sustogomis_delivered
                  ? "rgba(168, 85, 247, 0.4)"
                  : "#7a1f9c",
              }}
            >
              {scanResult.sustogomis_delivered
                ? "🍬 Dulces ya entregados"
                : "🍭 Entregar sustogomis"}
            </button>
          </div>

          <button
            onClick={() => window.location.reload()}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#888",
              textDecoration: "underline",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Escanear otro QR
          </button>
        </div>
      )}
    </div>
  );
}
