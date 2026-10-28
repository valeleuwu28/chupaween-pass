import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, checked: 0, candy: 0 });

  const fetchGuests = async () => {
    const { data } = await supabase.from("guests").select("*").order("name");
    const list = data || [];
    setGuests(list);
    setStats({
      total: list.length,
      checked: list.filter((g) => g.checked_in).length,
      candy: list.filter((g) => g.sustogomis_delivered).length,
    });
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const toggleCheckIn = async (id, currentStatus) => {
    await supabase
      .from("guests")
      .update({ checked_in: !currentStatus })
      .eq("id", id);
    fetchGuests();
  };

  const toggleSustogomis = async (id, currentStatus) => {
    await supabase
      .from("guests")
      .update({ sustogomis_delivered: !currentStatus })
      .eq("id", id);
    fetchGuests();
  };

  // AQUI ESTÁ LA CORRECCIÓN: Validamos que el teléfono no sea nulo antes de buscar
  const filteredGuests = guests.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.phone && g.phone.includes(search)),
  );

  return (
    <div className="app-container">
      {/* Header */}
      <div className="admin-header">
        <h1>Control</h1>
        <button onClick={() => supabase.auth.signOut()} className="btn-logout">
          Cerrar Sesión
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-number">{stats.total}</p>
          <p className="stat-label">Total</p>
        </div>
        <div className="stat-card">
          <p
            className="stat-number"
            style={{
              color: "#4ade80",
              textShadow: "0 0 10px rgba(74, 222, 128, 0.6)",
            }}
          >
            {stats.checked}
          </p>
          <p className="stat-label">Adentro</p>
        </div>
        <div className="stat-card">
          <p
            className="stat-number"
            style={{
              color: "#c084fc",
              textShadow: "0 0 10px rgba(192, 132, 252, 0.6)",
            }}
          >
            {stats.candy}
          </p>
          <p className="stat-label">Dulces</p>
        </div>
      </div>

      {/* Botón escanear */}
      <Link to="/admin/scan" className="btn-scan">
        📷 Escanear QR de invitado
      </Link>

      {/* Buscador */}
      <div className="input-group">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o celular..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="gothic-input"
          style={{ marginBottom: "20px" }}
        />
      </div>

      {/* Lista */}
      <div>
        {filteredGuests.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px 0", color: "#666" }}
          >
            <p style={{ fontSize: "2rem", marginBottom: "10px" }}>🕸️</p>
            <p>No se encontraron invitados</p>
          </div>
        )}

        {filteredGuests.map((guest) => (
          <div key={guest.id} className="guest-card">
            <div className="guest-info">
              <h3>{guest.name}</h3>
              {/* Ocultamos el icono de teléfono si no hay número */}
              <p>{guest.phone ? `📱 ${guest.phone}` : "📱 Sin teléfono"}</p>
            </div>
            <div className="guest-actions">
              <button
                onClick={() => toggleCheckIn(guest.id, guest.checked_in)}
                className={`btn-toggle ${guest.checked_in ? "btn-checked" : "btn-unchecked"}`}
              >
                {guest.checked_in ? "✅ Ingresó" : "⏳ Sin ingreso"}
              </button>
              <button
                onClick={() =>
                  toggleSustogomis(guest.id, guest.sustogomis_delivered)
                }
                className={`btn-toggle ${guest.sustogomis_delivered ? "btn-candy-given" : "btn-candy-pending"}`}
              >
                {guest.sustogomis_delivered ? "🍬 Dulces ✓" : "🍭 Sin dulces"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
