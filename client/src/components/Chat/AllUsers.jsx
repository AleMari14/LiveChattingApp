import { useContext } from "react";
// Importa `useContext` da React, un hook per accedere ai dati del contesto.
import { AuthContext } from "../../context/AuthContext";
// Importa il contesto `AuthContext`, che contiene informazioni sull'utente autenticato.
import { ChatContext } from "../../context/ChatContext";
// Importa il contesto `ChatContext`, che contiene informazioni sui potenziali utenti di chat e sugli utenti online.

const AllUsers = () => {
  // Estrae l'utente autenticato (user) e le funzioni createChat e onlineUsers dal contesto.
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(ChatContext);

  return (
    <div
      className="all-users-container"
      style={{
        display: "grid", // Usa una griglia CSS per disporre gli utenti.
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Definisce le colonne della griglia, con larghezza minima di 200px.
        gap: "20px", // Distanza tra gli elementi della griglia.
        padding: "20px", // Padding per la griglia.
        maxWidth: "800px", // Limita la larghezza massima della griglia.
        margin: "0 auto", // Centra la griglia orizzontalmente.
      }}
    >
      {/* Mappa attraverso gli utenti potenziali di chat (potentialChats). */}
      {potentialChats &&
        potentialChats.map((receiver, index) => (
          <div
            className="single-user shadow-sm"
            key={index} // Usa l'indice dell'utente come chiave per la lista.
            onClick={() => createChat(user._id, receiver._id)} // Crea una nuova chat quando un utente clicca su un altro utente.
            style={{
              display: "flex", // Imposta il contenitore come un elemento flex per allineare gli elementi orizzontalmente.
              alignItems: "center", // Allinea gli elementi verticalmente al centro.
              justifyContent: "space-between", // Distanza tra gli elementi.
              backgroundColor: "#ffffff", // Colore di sfondo bianco.
              padding: "15px", // Padding interno.
              borderRadius: "10px", // Angoli arrotondati.
              cursor: "pointer", // Cambia il cursore in un puntatore quando si passa sopra.
              transition: "transform 0.2s ease, box-shadow 0.2s ease", // Aggiunge una transizione per la trasformazione e l'ombra.
              border: "1px solid #ddd", // Colore del bordo grigio chiaro.
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)", // Ombra leggera intorno al contenitore.
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.1)")} // Aumenta l'ombra quando il mouse entra nell'area dell'elemento.
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.05)")} // Riduce l'ombra quando il mouse esce dall'elemento.
          >
            <div
              style={{
                display: "flex", // Utilizza flexbox per disporre gli elementi figli (nome utente).
                flexDirection: "column", // Dispone gli elementi in colonna.
                overflow: "hidden", // Nasconde il contenuto che va oltre i limiti.
                whiteSpace: "nowrap", // Evita che il testo vada a capo.
                textOverflow: "ellipsis", // Aggiunge i puntini di sospensione per i nomi troppo lunghi.
                maxWidth: "150px", // Limita la larghezza massima del nome utente.
              }}
            >
              <strong style={{ fontSize: "1rem", color: "#333" }}>
                {receiver.name} {/* Mostra il nome dell'utente potenziale */}
              </strong>
            </div>
            <span
              style={{
                width: "12px", // Definisce la larghezza del cerchio per lo stato online.
                height: "12px", // Definisce l'altezza del cerchio.
                borderRadius: "50%", // Rende il cerchio perfetto.
                backgroundColor: onlineUsers?.some(
                  (user) => user?.userId === receiver?._id
                )
                  ? "#28a745" // Se l'utente è online, imposta il colore verde.
                  : "#ccc", // Se l'utente non è online, imposta il colore grigio.
                marginLeft: "10px", // Distanza tra il nome utente e l'indicatore di stato.
              }}
            ></span>
          </div>
        ))}
    </div>
  );
};

export default AllUsers;
