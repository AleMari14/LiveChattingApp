// Importa i necessari hook e il contesto (ChatContext) per interagire con lo stato globale e la logica del chat.
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";  // Importa il contesto ChatContext per l'accesso ai messaggi e alle notifiche
import { baseUrl, getRequest } from "../utils/service"; // Importa la funzione di richiesta HTTP (getRequest) e l'URL base per le API

// Custom hook per ottenere l'ultimo messaggio di una chat specifica.
export const useFecthLatestMessage = (chat) => {
  // Estrae i valori dal contesto ChatContext, inclusi i nuovi messaggi e le notifiche.
  const { newMessage, notifications } = useContext(ChatContext);
  
  // Stato per memorizzare l'ultimo messaggio della chat.
  const [latestMessage, setLatestMessage] = useState(null);

  // Effetto collaterale (useEffect) che viene eseguito quando il componente viene montato o quando ci sono nuovi messaggi o notifiche.
  useEffect(() => {
    // Funzione asincrona per recuperare i messaggi dalla API.
    const getMessages = async () => {
      try {
        // Fa una richiesta HTTP GET per ottenere i messaggi associati alla chat.
        const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
        
        // Se c'è un errore nel recupero dei messaggi, viene stampato nel log.
        if (response.error) {
          console.log("Error getting messages...", response.error);
          return;
        }

        // Se la richiesta è riuscita, ottieni l'ultimo messaggio dall'array dei messaggi.
        const lastMessage = response[response?.length - 1];

        // Aggiorna lo stato con l'ultimo messaggio recuperato.
        setLatestMessage(lastMessage);
      } catch (error) {
        // Gestione degli errori in caso di problemi con la richiesta o l'elaborazione.
        console.log("Error fetching messages:", error);
      }
    };

    // Chiama la funzione di recupero dei messaggi.
    getMessages();
  }, [newMessage, notifications, chat?._id]);  // L'effetto si attiva ogni volta che cambia un nuovo messaggio, una notifica o la chat selezionata.

  // Restituisce l'ultimo messaggio trovato.
  return { latestMessage };
};
