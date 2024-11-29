import { useContext, useState } from "react"; // Importa i hook useContext e useState
import { ChatContext } from "../../context/ChatContext"; // Importa il contesto ChatContext
import moment from "moment"; // Importa la libreria moment per la gestione delle date
import { AuthContext } from "../../context/AuthContext"; // Importa il contesto AuthContext
import { unreadNotificationsFunc } from "../../utils/unreadNotifications"; // Funzione per recuperare le notifiche non lette

const Notifications = () => {
  // Recupera l'utente autenticato dal contesto AuthContext
  const { user } = useContext(AuthContext);
  // Recupera variabili e funzioni da ChatContext per gestire le notifiche e le chat
  const {
    notifications, // Elenco delle notifiche
    allUsers, // Tutti gli utenti per associare le notifiche agli utenti
    markAllNotificationsAsRead, // Funzione per segnare tutte le notifiche come lette
    userChats, // Le chat dell'utente
    markNotificationAsRead, // Funzione per segnare una singola notifica come letta
  } = useContext(ChatContext);

  // Stato per gestire se il pannello delle notifiche è aperto o chiuso
  const [isOpen, setIsOpen] = useState(false);

  // Filtra le notifiche non lette utilizzando una funzione esterna
  const unreadNotifications = unreadNotificationsFunc(notifications);

  // Modifica le notifiche aggiungendo il nome del mittente
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId); // Trova il mittente della notifica

    return {
      ...n, // Mantieni tutte le proprietà della notifica
      senderName: sender?.name, // Aggiungi il nome del mittente
    };
  });

  return (
    <div className="notifications">
      {/* Icona delle notifiche, cliccabile per aprire/chiudere il pannello */}
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        {/* Icona chat */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-chat-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        </svg>

        {/* Se ci sono notifiche non lette, mostra il numero delle notifiche */}
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>

      {/* Se il pannello delle notifiche è aperto, mostra le notifiche */}
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            {/* Titolo del pannello delle notifiche */}
            <h3>Notifications</h3>

            {/* Bottone per segnare tutte le notifiche come lette */}
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Mark all as read
            </div>
          </div>

          {/* Se non ci sono notifiche, mostra un messaggio */}
          {modifiedNotifications?.length === 0 ? (
            <span className="notification">No notifications yet...</span>
          ) : null}

          {/* Mappa tutte le notifiche e mostra ogni notifica */}
          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => (
              <div
                key={index} // Ogni notifica ha una chiave unica
                className={n.isRead ? `notification` : `notification not-read`} // Aggiunge la classe "not-read" se la notifica non è letta
                onClick={() => {
                  // Segna la notifica come letta e chiude il pannello
                  markNotificationAsRead(n, userChats, user, notifications);
                  setIsOpen(false); // Chiude il pannello delle notifiche
                }}
              >
                <span>{`${n.senderName} sent you a new message...`}</span> {/* Mostra il nome del mittente e il messaggio */}
                <span className="notification-time">
                  {/* Mostra la data della notifica formattata con moment.js */}
                  {moment(n.date).calendar()}
                </span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
