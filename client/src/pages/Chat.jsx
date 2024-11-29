// Importa gli hook e componenti necessari
import { useContext, useState, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import AllUsers from "../components/Chat/AllUsers"; // Componente per mostrare tutti gli utenti
import ChatBox from "../components/Chat/ChatBox"; // Componente per la finestra di chat
import UserCard from "../components/Chat/UserCard"; // Componente per mostrare una singola chat
import { AuthContext } from "../context/AuthContext"; // Contesto per l'autenticazione
import { ChatContext } from "../context/ChatContext"; // Contesto per la gestione delle chat

// Componente principale della pagina Chat
const Chat = () => {
  // Estrae l'utente corrente dal contesto di autenticazione
  const { user } = useContext(AuthContext);
  // Estrae le informazioni relative alle chat dall'oggetto ChatContext
  const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } = useContext(ChatContext);

  // Stato per rilevare se il dispositivo è mobile o meno
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effetto che si attiva ogni volta che la finestra viene ridimensionata
  useEffect(() => {
    // Funzione per aggiornare lo stato `isMobile` in base alla larghezza della finestra
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // Aggiungi l'evento di resize per monitorare il cambiamento della larghezza della finestra
    window.addEventListener("resize", handleResize);
    // Rimuove l'evento quando il componente viene smontato
    return () => window.removeEventListener("resize", handleResize);
  }, []); // L'effetto viene eseguito solo al primo rendering (componente montato)

  // Oggetto `styles` per gestire dinamicamente lo stile in base alla larghezza della finestra
  const styles = {
    container: {
      padding: "1rem 0", // Padding per il contenitore principale
    },
    chatContainer: {
      display: "flex", // Usa flexbox per la disposizione dei componenti
      flexDirection: isMobile ? "column" : "row", // Se mobile, mostra gli elementi in colonna
      gap: "1rem", // Aggiungi uno spazio tra gli elementi
      alignItems: isMobile ? "center" : "start", // Centra gli elementi se mobile, altrimenti allineati a sinistra
    },
    chatSidebar: {
      flex: isMobile ? "0 0 auto" : "0 0 auto", // Imposta la larghezza dinamica
      width: isMobile ? "100%" : "30%", // Imposta la larghezza della sidebar in base alla larghezza dello schermo
      maxWidth: isMobile ? "100%" : "300px", // Imposta una larghezza massima per la sidebar
      textAlign: isMobile ? "center" : "left", // Centra il testo su dispositivi mobili
    },
    userCardContainer: {
      width: isMobile ? "100%" : "auto", // Larghezza dinamica per il contenitore della user card
    },
    chatBox: {
      width: "100%", // ChatBox prende tutta la larghezza disponibile
      marginTop: "1rem", // Margine superiore per distanziare dal contenuto sopra
    },
  };

  // Funzione per chiudere la ChatBox
  const closeChatBox = () => updateCurrentChat(null); // Resetta la chat corrente

  return (
    <Container fluid style={styles.container}>
      {/* Mostra la lista di tutti gli utenti */}
      <AllUsers />

      {/* Se l'utente ha delle chat, mostra la lista delle chat */}
      {userChats?.length > 0 && (
        <div style={styles.chatContainer}>
          <div style={styles.chatSidebar}>
            <Stack gap={3}>
              {/* Se le chat stanno caricando, mostra un messaggio di caricamento */}
              {isUserChatsLoading && <p>Fetching Chats...</p>}
              {/* Se non ci sono chat o le chat non sono state caricate, mostra un messaggio */}
              {(!isUserChatsLoading && !userChats) || (!userChats?.length && <p>No Chats...</p>)}
              {/* Mappa su tutte le chat e mostra la user card */}
              {userChats?.map((chat, index) => (
                <div key={index} style={styles.userCardContainer}>
                  {/* Singola chat, cliccando si seleziona quella chat */}
                  <div
                    onClick={() => updateCurrentChat(chat)} // Seleziona la chat e aggiorna lo stato
                    style={{ cursor: "pointer" }}
                  >
                    <UserCard chat={chat} user={user} /> {/* Componente che mostra l'utente nella chat */}
                  </div>

                  {/* Mostra ChatBox sotto la chat selezionata solo se è mobile */}
                  {isMobile && currentChat?._id === chat._id && (
                    <div style={styles.chatBox}>
                      <ChatBox closeChatBox={closeChatBox} /> {/* Componente per la chat */}
                    </div>
                  )}
                </div>
              ))}
            </Stack>
          </div>

          {/* ChatBox per Desktop */}
          {!isMobile && currentChat && (
            <div style={styles.chatBox}>
              <ChatBox closeChatBox={closeChatBox} /> {/* Componente della chat che si mostra solo su desktop */}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Chat;
