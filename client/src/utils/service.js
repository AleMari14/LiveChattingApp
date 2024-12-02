//funzioni sono utilizzate per interagire con un'API, facilitando il recupero e l'invio di informazioni tra il client e il server.

// Base URL per le richieste API
export const baseUrl = "https://livechattingapp.onrender.com/api";

// Funzione per inviare una richiesta POST
export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Indica che il corpo della richiesta è in formato JSON
    },
    body, // Dati da inviare nel corpo della richiesta
  });

  const data = await response.json(); // Parsing della risposta in formato JSON

  // Gestione degli errori
  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message; // Messaggio d'errore specifico dal server
    } else {
      message = data; // Messaggio generico
    }

    // Ritorna un oggetto che rappresenta l'errore
    return { error: true, status: response.status, message };
  }

  return data; // Restituisce i dati in caso di successo
};

// Funzione per inviare una richiesta GET
export const getRequest = async (url) => {
  const response = await fetch(url); // Richiesta GET semplice

  const data = await response.json(); // Parsing della risposta in formato JSON

  // Gestione degli errori
  if (!response.ok) {
    let message = "An error occured..."; // Messaggio d'errore predefinito

    if (data?.message) {
      message = data.message; // Messaggio d'errore specifico dal server
    }

    // Ritorna un oggetto che rappresenta l'errore
    return { error: true, status: response.status, message };
  }

  return data; // Restituisce i dati in caso di successo
};
