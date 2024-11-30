import { useRef, useState, useEffect, useContext } from "react"; // Importa gli hook di React
import { Container } from "react-bootstrap"; // Importa un contenitore da React Bootstrap
import { AuthContext } from "../../context/AuthContext"; // Importa il contesto di autenticazione
import { ChatContext } from "../../context/ChatContext"; // Importa il contesto per la chat
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"; // Hook per ottenere i dati dell'utente destinatario
import moment from "moment"; // Libreria per la gestione di date e orari
import InputEmoji from "react-input-emoji"; // Libreria per un input con supporto alle emoji

const ChatBox = ({ closeChatBox }) => {
  // Recupera i dati dell'utente corrente dal contesto
  const { user } = useContext(AuthContext);

  // Recupera dati relativi alla chat corrente dal contesto
  const { currentChat, messages, sendTextMessage, isMessagesLoading } = useContext(ChatContext);

  // Ottiene i dati dell'utente destinatario
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  // Stato locale per il messaggio di testo
  const [textMessage, setTextMessage] = useState("");

  // Riferimento per gestire lo scorrimento automatico della chat
  const scroll = useRef();

  // Effetto per scorrere automaticamente la chat quando arrivano nuovi messaggi
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Gestisce l'invio di un messaggio
  const handleSendMessage = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage); // Invoca la funzione per inviare il messaggio
    }
  };

  // Gestisce la pressione del tasto Enter per inviare un messaggio
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita il comportamento predefinito (nuova riga)
      handleSendMessage();
    }
  };

  // Se i dati dell'utente destinatario non sono ancora disponibili, mostra un messaggio di caricamento
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Loading chat box...
      </p>
    );

  // Se i messaggi sono in fase di caricamento, mostra un messaggio di caricamento
  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  // Struttura della chat box
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "80vh",
        backgroundColor: "#f9fafb", // Colore di sfondo
        padding: "1rem", // Spaziatura interna
      }}
    >
      {/* Contenitore principale della chat */}
      <div
        className="chat-box shadow-lg"
        style={{
          backgroundColor: "#ffffff", // Colore bianco per la chat box
          borderRadius: "15px", // Angoli arrotondati
          width: "100%", // Larghezza responsiva
          maxWidth: "500px", // Larghezza massima
          height: "100%", // Altezza responsiva
          maxHeight: "600px", // Altezza massima
          display: "flex",
          flexDirection: "column", // Imposta la disposizione verticale
          overflow: "hidden", // Nasconde il contenuto eccedente
        }}
      >
        {/* Intestazione della chat */}
        <div
          className="chat-header d-flex align-items-center justify-content-between p-3"
          style={{
            background: "linear-gradient(to right, #6c757d, #343a40)", // Gradiente di sfondo
            color: "white", // Testo bianco
            fontSize: "1rem",
            borderTopLeftRadius: "15px", // Arrotonda gli angoli superiori
            borderTopRightRadius: "15px",
          }}
        >
          <strong>{recipientUser?.name}</strong> {/* Nome dell'utente destinatario */}
          <button
            onClick={closeChatBox} // Funzione per chiudere la chat
            style={{
              background: "transparent", // Pulsante trasparente
              border: "none",
              color: "white", // Colore del testo
              fontSize: "1.2rem",
              cursor: "pointer", // Cambia il cursore quando il pulsante è selezionato
            }}
          >
            × {/* Icona per chiudere */}
          </button>
        </div>

        {/* Area dei messaggi */}
        <div
          className="messages flex-grow-1 p-3"
          style={{
            overflowY: "auto", // Scorrimento verticale
            background: "#f8f9fa", // Colore di sfondo
            display: "flex",
            flexDirection: "column", // Messaggi disposti verticalmente
          }}
        >
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                ref={scroll} // Imposta il riferimento per lo scroll
                className={`message ${
                  message?.senderId === user?._id
                    ? "align-self-end bg-primary text-white" // Messaggi dell'utente corrente
                    : "align-self-start bg-light text-dark" // Messaggi del destinatario
                } p-2 mb-2 shadow-sm`}
                style={{
                  maxWidth: "75%", // Larghezza massima per i messaggi
                  borderRadius: "10px",
                  wordWrap: "break-word", // Consente il ritorno a capo
                  fontSize: "0.9rem",
                }}
              >
                <span>{message.text}</span> {/* Testo del messaggio */}
                <div
                  className="message-footer"
                  style={{
                    marginTop: "5px",
                    textAlign: "right", // Allinea il timestamp a destra
                    fontSize: "0.8rem",
                    color:
                      message?.senderId === user?._id
                        ? "rgba(255, 255, 255, 0.7)"
                        : "rgba(0, 0, 0, 0.6)", // Colore del timestamp
                  }}
                >
                  {moment(message.createdAt).format("HH:mm")} {/* Orario del messaggio */}
                </div>
              </div>
            ))}
        </div>

        {/* Area di input */}
        <div
          className="chat-input d-flex align-items-center p-2"
          style={{
            backgroundColor: "white", // Sfondo bianco
            borderTop: "1px solid rgba(0, 0, 0, 0.1)", // Bordo superiore
            borderBottomLeftRadius: "15px", // Arrotonda gli angoli inferiori
            borderBottomRightRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center", // Allinea verticalmente
              gap: "10px", // Spaziatura tra input e pulsante
              width: "100%",
            }}
          >
            {/* Input per il messaggio */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <InputEmoji
                value={textMessage}
                onChange={setTextMessage} // Aggiorna lo stato
                fontFamily="nunito"
                borderColor="rgba(0, 0, 0, 0.2)"
                placeholder="Type a message..." // Placeholder
                onKeyDown={handleKeyDown} // Gestisce Enter
                maxLength={500} // Lunghezza massima
                style={{
                  width: "100%",
                }}
              />
            </div>
            {/* Pulsante per inviare */}
            <button
              onClick={handleSendMessage} // Invia il messaggio
              style={{
                backgroundColor: "#007bff", // Colore blu
                color: "white", // Testo bianco
                border: "none", // Nessun bordo
                borderRadius: "50%", // Forma circolare
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center", // Allinea il contenuto
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0, // Non si restringe
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white" // Colore bianco per l'icona
                width="20px"
                height="20px"
              >
                <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" /> {/* Icona invio */}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatBox;
