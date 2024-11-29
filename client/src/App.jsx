// Importa i componenti e le librerie necessari
import { Routes, Route, Navigate } from "react-router-dom"; // Per la gestione delle rotte
import "bootstrap/dist/css/bootstrap.min.css"; // Importa il CSS di Bootstrap per lo stile
import Chat from "./pages/Chat"; // Pagina della chat
import Login from "./pages/Login"; // Pagina di login
import Register from "./pages/Register"; // Pagina di registrazione
import Container from "react-bootstrap/Container"; // Container di Bootstrap per il layout
import NavBar from "./components/NavBar"; // Barra di navigazione
import { ChatContextProvider } from "./context/ChatContext"; // Provider del contesto Chat
import { useContext } from "react"; // Hook per usare il contesto
import { AuthContext } from "./context/AuthContext"; // Contesto per l'autenticazione

// Componente principale dell'applicazione
function App() {
  // Usa il contesto AuthContext per ottenere le informazioni sull'utente loggato
  const { user } = useContext(AuthContext); // Se l'utente è loggato, user conterrà le informazioni dell'utente

  return (
    // ChatContextProvider avvolge l'applicazione per fornire il contesto della chat
    <ChatContextProvider user={user}>
      {/* Barra di navigazione comune a tutte le pagine */}
      <NavBar />
      
      {/* Container per il contenuto principale */}
      <Container className="text-secondary">
        {/* Gestione delle rotte */}
        <Routes>
          {/* Rotta per la home page, se l'utente è loggato visualizza la chat, altrimenti il login */}
          <Route path="/" element={user ? <Chat /> : <Login />} />
          
          {/* Rotta per la pagina di registrazione, se l'utente è loggato visualizza la chat, altrimenti il form di registrazione */}
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          
          {/* Rotta per la pagina di login, se l'utente è loggato visualizza la chat, altrimenti il form di login */}
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          
          {/* Rotta di fallback per qualsiasi URL non definito, reindirizza alla home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
