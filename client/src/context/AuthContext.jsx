import { useEffect } from "react";
import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

// Crea il contesto per l'autenticazione
export const AuthContext = createContext();

// Componente provider per l'autenticazione
export const AuthContextProvider = ({ children }) => {
  // Stato per l'utente loggato
  const [user, setUser] = useState(null);

  // Stati per la gestione degli errori e del caricamento nella registrazione
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Stati per la gestione degli errori e del caricamento nel login
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Log per il debug
  console.log("Userr:", user);
  console.log("registerError:", registerError);
  console.log("isRegisterLoading:", isRegisterLoading);
  console.log("loginError:", loginError);
  console.log("isLoginLoading:", isLoginLoading);

  // Effetto per recuperare l'utente dal localStorage al caricamento del componente
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user)); // Imposta l'utente se esiste nel localStorage
  }, []);

  // Funzione per aggiornare le informazioni di registrazione
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // Funzione per aggiornare le informazioni di login
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // Funzione per registrare un nuovo utente
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      // Imposta lo stato di caricamento
      setIsRegisterLoading(true);
      setRegisterError(null);

      // Invia la richiesta di registrazione al server
      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false); // Imposta lo stato di caricamento a falso

      if (response.error) {
        // Se c'è un errore, aggiorna lo stato degli errori
        return setRegisterError(response);
      }

      // Se la registrazione è riuscita, salva l'utente nel localStorage
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response); // Aggiorna lo stato dell'utente
    },
    [registerInfo]
  );

  // Funzione per il login dell'utente
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      // Imposta lo stato di caricamento per il login
      setIsLoginLoading(true);
      setLoginError(null);

      // Invia la richiesta di login al server
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false); // Imposta lo stato di caricamento a falso

      if (response.error) {
        // Se c'è un errore, aggiorna lo stato degli errori
        return setLoginError(response);
      }

      // Se il login ha successo, salva l'utente nel localStorage
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response); // Aggiorna lo stato dell'utente
    },
    [loginInfo]
  );

  // Funzione per il logout dell'utente
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User"); // Rimuove l'utente dal localStorage
    setUser(null); // Resetta lo stato dell'utente
  }, []);

  // Fornisce il contesto con tutti i valori e le funzioni necessarie ai figli
  return (
    <AuthContext.Provider
      value={{
        user, // Stato dell'utente
        registerUser, // Funzione per registrare l'utente
        loginUser, // Funzione per loggare l'utente
        registerInfo, // Dati di registrazione
        updateRegisterInfo, // Funzione per aggiornare i dati di registrazione
        loginInfo, // Dati di login
        updateLoginInfo, // Funzione per aggiornare i dati di login
        loginError, // Errori del login
        isLoginLoading, // Stato di caricamento del login
        registerError, // Errori della registrazione
        isRegisterLoading, // Stato di caricamento della registrazione
        logoutUser, // Funzione per eseguire il logout
      }}
    >
      {children} {/* Renderizza i figli passati come prop */}
    </AuthContext.Provider>
  );
};
