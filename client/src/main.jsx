// Importa le librerie necessarie
import React from "react"; // Importa React per utilizzare JSX e la libreria React
import ReactDOM from "react-dom/client"; // Importa ReactDOM per il rendering dell'app
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter per la gestione delle rotte
import App from "./App"; // Importa il componente principale dell'applicazione
import { AuthContextProvider } from "./context/AuthContext"; // Importa il contesto di autenticazione
import "./main.css"; // Importa il file CSS globale per lo stile

// Rendering dell'applicazione nella root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Il provider del contesto AuthContext è avvolto attorno a tutta l'app */}
    <AuthContextProvider>
      {/* BrowserRouter è utilizzato per la gestione delle rotte nell'app */}
      <BrowserRouter>
        <App /> {/* Il componente principale che contiene la logica dell'app */}
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
