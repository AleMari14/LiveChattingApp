// Importa gli hook necessari per gestire lo stato e gli effetti collaterali nel componente.
import { useEffect, useState } from "react";
// Importa le funzioni di utilità per fare richieste HTTP.
import { baseUrl, getRequest } from "../utils/service";

// Custom hook per ottenere le informazioni sull'utente destinatario di un messaggio in una chat.
export const useFetchRecipientUser = (chat, user) => {
  // Stato per memorizzare l'utente destinatario.
  const [recipientUser, setRecipientUser] = useState(null);
  // Stato per memorizzare eventuali errori.
  const [error, setError] = useState(null);

  // Estrae l'ID dell'utente destinatario dalla lista dei membri della chat.
  // Supponiamo che la chat abbia un array di membri, e cerchiamo l'ID che non corrisponde all'ID dell'utente attualmente loggato.
  const recipientId = chat?.members.find((id) => id !== user?._id);

  // Effetto collaterale che si attiva ogni volta che l'ID del destinatario cambia (ovvero quando cambia la chat o l'utente).
  useEffect(() => {
    // Funzione asincrona per recuperare i dati dell'utente destinatario tramite una richiesta HTTP.
    const getRecipientUser = async () => {
      // Se non c'è un recipientId valido, non eseguire nulla.
      if (!recipientId) return null;

      // Fai una richiesta GET per ottenere i dati dell'utente destinatario utilizzando il suo ID.
      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      // Se la risposta contiene un errore, imposta lo stato dell'errore.
      if (response.error) {
        return setError(response.error);
      }

      // Se la richiesta è andata a buon fine, imposta lo stato con i dati dell'utente destinatario.
      setRecipientUser(response);
    };

    // Chiama la funzione per ottenere l'utente destinatario.
    getRecipientUser();
  }, [recipientId]); // L'effetto si attiva ogni volta che cambia recipientId, cioè quando la chat o l'utente cambiano.

  // Restituisce l'utente destinatario, che può essere utilizzato da altri componenti.
  return { recipientUser };
};
