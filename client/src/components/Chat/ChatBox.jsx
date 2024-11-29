import { useRef, useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ closeChatBox }) => {
  // Recupera l'utente autenticato dal contesto di autenticazione
  const { user } = useContext(AuthContext);
  // Recupera la logica della chat e i messaggi dal contesto della chat
  const { currentChat, messages, sendTextMessage, isMessagesLoading } = useContext(ChatContext);
  // Utilizza un hook personalizzato per recuperare l'utente destinatario dalla chat corrente
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  // Stato per gestire il testo del messaggio in uscita
  const [textMessage, setTextMessage] = useState("");
  // Riferimento per scorrere automaticamente la finestra dei messaggi
  const scroll = useRef();

  // Effetto per fare lo scroll automatico verso l'ultimo messaggio quando vengono ricevuti nuovi messaggi
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Questo effetto è eseguito ogni volta che i messaggi cambiano

  // Funzione per inviare il messaggio
  const handleSendMessage = () => {
    // Controlla se il messaggio non è vuoto
    if (textMessage.trim()) {
      // Invia il messaggio e resetta lo stato del messaggio
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };

  // Gestione dell'invio del messaggio con il tasto "Enter"
  const handleKeyDown = (e) => {
    // Se l'utente preme "Enter" senza "Shift", invia il messaggio
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita che venga creata una nuova linea
      handleSendMessage();
    }
  };

  // Se non ci sono dati sull'utente destinatario, mostra un messaggio di caricamento
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Loading chat box...
      </p>
    );

  // Se i messaggi sono ancora in fase di caricamento, mostra un messaggio di caricamento
  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  // Ritorna il layout della chat
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "80vh", // Imposta l'altezza del contenitore della chat
        backgroundColor: "#f9fafb", // Colore di sfondo chiaro per la chat
        padding: "1rem", // Spaziatura interna
      }}
    >
      <div
        className="chat-box shadow-lg"
        style={{
          backgroundColor: "#ffffff", // Colore di sfondo bianco per la chat box
          borderRadius: "15px", // Angoli arrotondati per la chat box
          width: "100%", // Larghezza al 100% del contenitore
          maxWidth: "500px", // Larghezza massima di 500px
          height: "100%", // Altezza al 100% del contenitore
          maxHeight: "600px", // Altezza massima di 600px
          display: "flex", // Layout flessibile per la chat box
          flexDirection: "column", // Disposizione verticale degli elementi nella chat
          overflow: "hidden", // Nasconde eventuali contenuti in eccesso
        }}
      >
        {/* Header della chat (visualizza il nome del destinatario) */}
        <div
          className="chat-header d-flex align-items-center justify-content-between p-3"
          style={{
            background: "linear-gradient(to right, #6c757d, #343a40)", // Colore di sfondo con gradiente
            color: "white", // Colore del testo bianco
            fontSize: "1rem", // Imposta la dimensione del testo
            borderTopLeftRadius: "15px", // Angolo arrotondato in alto a sinistra
            borderTopRightRadius: "15px", // Angolo arrotondato in alto a destra
          }}
        >
          <strong>{recipientUser?.name}</strong> {/* Nome del destinatario */}
          <button
            onClick={closeChatBox} // Funzione per chiudere la chat box
            style={{
              background: "transparent", // Nessuno sfondo
              border: "none", // Nessun bordo
              color: "white", // Colore del testo bianco
              fontSize: "1.2rem", // Dimensione del testo
              cursor: "pointer", // Mostra il cursore a mano
            }}
          >
            × {/* Icona per chiudere la chat */}
          </button>
        </div>

        {/* Sezione dei messaggi */}
        <div
          className="messages flex-grow-1 p-3"
          style={{
            overflowY: "auto", // Abilita lo scroll verticale
            background: "#f8f9fa", // Colore di sfondo chiaro per i messaggi
            display: "flex", // Layout flessibile per i messaggi
            flexDirection: "column", // Disposizione verticale dei messaggi
          }}
        >
          {messages &&
            messages.map((message, index) => (
              <div
                key={index} // Ogni messaggio deve avere una chiave unica
                ref={scroll} // Referenza per scorrere verso il basso
                className={`message ${
                  message?.senderId === user?._id
                    ? "align-self-end bg-primary text-white" // Messaggi inviati dall'utente
                    : "align-self-start bg-light text-dark" // Messaggi ricevuti
                } p-2 mb-2 shadow-sm`}
                style={{
                  maxWidth: "75%", // Imposta la larghezza massima del messaggio
                  borderRadius: "10px", // Angoli arrotondati per il messaggio
                  wordWrap: "break-word", // Gestisce il ritorno a capo del testo
                  fontSize: "0.9rem", // Imposta la dimensione del testo
                }}
              >
                <span>{message.text}</span> {/* Testo del messaggio */}
                <div
                  className="message-footer"
                  style={{
                    marginTop: "5px", // Distanza tra il testo del messaggio e la data
                    textAlign: "right", // Allinea la data a destra
                    fontSize: "0.8rem", // Dimensione del testo della data
                    color:
                      message?.senderId === user?._id
                        ? "rgba(255, 255, 255, 0.7)" // Colore della data per i messaggi inviati
                        : "rgba(0, 0, 0, 0.6)", // Colore della data per i messaggi ricevuti
                  }}
                >
                  {moment(message.createdAt).format("HH:mm")} {/* Orario del messaggio */}
                </div>
              </div>
            ))}
        </div>

        {/* Sezione di input per inviare i messaggi */}
        <div
          className="chat-input d-flex align-items-center p-2"
          style={{
            backgroundColor: "white", // Colore di sfondo per il campo di input
            borderTop: "1px solid rgba(0, 0, 0, 0.1)", // Bordi sottili sopra l'input
            borderBottomLeftRadius: "15px", // Angolo arrotondato in basso a sinistra
            borderBottomRightRadius: "15px", // Angolo arrotondato in basso a destra
            display: "flex", // Layout flessibile
            flexDirection: "column", // Disposizione verticale
            gap: "10px", // Distanza tra input e pulsante
          }}
        >
          <div
            style={{
              display: "flex", // Layout flessibile
              alignItems: "center", // Allinea gli elementi al centro verticalmente
              gap: "10px", // Distanza tra emoji e campo di input
              width: "100%", // L'input occupa tutta la larghezza disponibile
            }}
          >
            <InputEmoji
              value={textMessage} // Valore del messaggio in uscita
              onChange={setTextMessage} // Aggiorna il valore del messaggio
              fontFamily="nunito" // Font utilizzato per l'input
              borderColor="rgba(0, 0, 0, 0.2)" // Colore del bordo
              placeholder="Type a message..." // Placeholder del campo di input
              onKeyDown={handleKeyDown} // Gestione dell'evento "keydown" (inviare il messaggio)
              maxLength={500} // Limite massimo per il numero di caratteri nel messaggio
            />
            <button
              onClick={handleSendMessage} // Invia il messaggio
              style={{
                backgroundColor: "#007bff", // Colore di sfondo blu
                color: "white", // Colore del testo bianco
                border: "none", // Nessun bordo
                borderRadius: "50%", // Bordo arrotondato
                padding: "10px", // Padding interno per il pulsante
                cursor: "pointer", // Mostra il cursore a mano
                fontSize: "1.5rem", // Dimensione del testo
              }}
            >
              &#8594; {/* Icona per inviare il messaggio */}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatBox;
