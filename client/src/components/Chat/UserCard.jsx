import { useContext } from "react"; // Importa il hook useContext per accedere ai contesti
import { Stack, Badge } from "react-bootstrap"; // Importa Stack e Badge da React-Bootstrap per il layout e le etichette
import avatar from "../../assets/avatar.svg"; // Importa un'icona di avatar di default
import { ChatContext } from "../../context/ChatContext"; // Importa il contesto ChatContext per accedere alle informazioni sulla chat
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage"; // Hook per recuperare l'ultimo messaggio della chat
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"; // Hook per recuperare il destinatario della chat
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"; // Funzione per ottenere le notifiche non lette
import moment from "moment"; // Importa moment per la gestione delle date

const UserCard = ({ chat, user }) => {
  // Usa il hook per ottenere informazioni sul destinatario della chat e l'ultimo messaggio
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { latestMessage } = useFetchLatestMessage(chat);

  // Accede al contesto per ottenere gli utenti online, le notifiche e le funzioni per gestirle
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);

  // Filtra le notifiche non lette usando la funzione esterna
  const unreadNotifications = unreadNotificationsFunc(notifications);

  // Verifica se il destinatario è online
  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  // Filtra le notifiche non lette relative al destinatario della chat
  const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId === recipientUser?._id);

  // Funzione per troncare il testo del messaggio se è troppo lungo
  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Stack
      direction="horizontal" // Usa una disposizione orizzontale per gli elementi
      gap={3} // Distanza tra gli elementi
      className="user-card p-3 justify-content-between align-items-center rounded shadow-sm mx-auto" 
      role="button" // Imposta il ruolo come "button" per l'accessibilità
      style={{
        background: "linear-gradient(145deg, #ffffff, #f3f3f3)", // Sfondo con gradiente
        border: "1px solid rgba(0, 0, 0, 0.1)", // Bordo sottile
        borderRadius: "15px", // Raggio angoli arrotondati
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)", // Ombra per profondità
        transition: "all 0.3s ease", // Transizione morbida quando lo stato cambia
        cursor: "pointer", // Il cursore cambia per indicare che è cliccabile
        marginBottom: "15px", // Distanza inferiore tra i vari UserCard
        maxWidth: "600px", // Larghezza massima per schermi più grandi
        width: "100%", // Larghezza al 100% per schermi piccoli
      }}
      onClick={() => {
        // Se ci sono notifiche non lette per questo utente, segnale come lette
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      {/* Avatar e informazioni utente */}
      <div
        className="d-flex align-items-center"
        style={{
          flex: "1", // Occupazione dello spazio orizzontale disponibile
          minWidth: "0", // Permette di ridurre la larghezza minima degli elementi
        }}
      >
        {/* Avatar */}
        <div
          className="avatar-wrapper me-3 position-relative"
          style={{
            position: "relative",
            width: "55px",
            height: "55px",
            flexShrink: "0", // Impedisce che l'avatar si restringa
          }}
        >
          <img
            src={avatar}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%", // Crea un cerchio perfetto
              objectFit: "cover", // Adatta l'immagine all'elemento senza distorcerla
              border: "3px solid rgba(0, 0, 0, 0.1)", // Bordo leggero intorno all'avatar
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Ombra intorno all'avatar
            }}
          />
          {/* Se l'utente è online, mostra un indicatore verde */}
          {isOnline && (
            <span
              style={{
                position: "absolute",
                bottom: "4px",
                right: "4px",
                width: "14px",
                height: "14px",
                background: "limegreen", // Colore verde per indicare che è online
                borderRadius: "50%", // Circolare
                border: "2px solid white", // Bordo bianco attorno all'indicatore
                boxShadow: "0 0 10px rgba(0, 255, 0, 0.7)", // Ombra per accentuare l'indicatore
              }}
              title={isOnline ? "Online" : "Offline"} // Mostra il titolo on hover
            ></span>
          )}
        </div>

        {/* Informazioni utente */}
        <div
          className="text-content"
          style={{
            flex: "1", // Occupazione dello spazio orizzontale disponibile
            overflow: "hidden", // Evita che il testo vada fuori dal contenitore
            textOverflow: "ellipsis", // Mostra i puntini di sospensione se il testo è troppo lungo
            whiteSpace: "nowrap", // Evita che il testo vada a capo
            maxWidth: "100%", // Impedisce che il contenitore superi la larghezza disponibile
          }}
        >
          {/* Nome dell'utente */}
          <div
            className="name"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#333",
              marginBottom: "5px",
              lineHeight: "1.2",
            }}
          >
            {recipientUser?.name || "Unknown User"} {/* Se non c'è nome, mostra "Unknown User" */}
          </div>
          {/* Ultimo messaggio */}
          <div
            className="text text-muted"
            style={{
              fontSize: "0.9rem",
              color: "#6c757d",
            }}
          >
            {latestMessage?.text
              ? truncateText(latestMessage?.text) // Mostra il testo del messaggio e lo tronca se necessario
              : "No messages yet."} {/* Mostra "No messages yet" se non ci sono messaggi */}
          </div>
          {/* Data dell'ultimo messaggio */}
          <div
            className="date text-muted"
            style={{
              fontSize: "0.8rem",
              color: "#888",
              marginTop: "5px",
            }}
          >
            {latestMessage?.createdAt
              ? moment(latestMessage?.createdAt).calendar() // Mostra la data con moment.js in formato calendario
              : ""} {/* Se non ci sono messaggi, non mostrare la data */}
          </div>
        </div>
      </div>

      {/* Notifiche */}
      <div
        className="d-flex flex-column align-items-end text-end"
        style={{
          flex: "0", // Non occupa spazio orizzontale
          minWidth: "auto", // La larghezza minima viene determinata automaticamente
        }}
      >
        {/* Se ci sono notifiche non lette per questo utente, mostra un Badge rosso con il conteggio */}
        {thisUserNotifications?.length > 0 && (
          <Badge
            bg="danger" // Badge rosso per notifiche urgenti
            text="light"
            style={{
              fontSize: "0.8rem",
              padding: "5px 8px",
              borderRadius: "20px", // Raggio per angoli arrotondati
              boxShadow: "0 2px 4px rgba(255, 0, 0, 0.4)", // Ombra per evidenziare
            }}
          >
            {thisUserNotifications.length} {/* Numero di notifiche non lette */}
          </Badge>
        )}
      </div>
    </Stack>
  );
};

export default UserCard;
