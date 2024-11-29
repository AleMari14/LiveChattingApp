import { useContext } from "react"; // Importa il hook useContext per accedere ai contesti
import { Container, Nav, Navbar, Stack } from "react-bootstrap"; // Importa componenti da React-Bootstrap per il layout e la navigazione
import { Link } from "react-router-dom"; // Importa Link da react-router-dom per la navigazione tra le pagine
import { AuthContext } from "../context/AuthContext"; // Importa il contesto AuthContext per ottenere informazioni sull'autenticazione
import Notifications from "./Chat/Notifications"; // Importa il componente Notifications per mostrare le notifiche

const NavBar = () => {
  // Usa il contesto AuthContext per ottenere l'utente autenticato e la funzione di logout
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" style={{ height: "3.75rem" }}>
      {/* Contenitore principale per la navbar */}
      <Container>
        {/* Marca della navbar con il link al sito */}
        <Navbar.Brand>
          <Link to="/" className="link-light text-decoration-none">
            ChattApp {/* Nome dell'app, visibile come brand nel navbar */}
          </Link>
        </Navbar.Brand>

        {/* Toggle per la versione mobile della navbar */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Sezione di navigazione */}
          <Nav className="ms-auto">
            {/* Se un utente è autenticato, mostra il suo nome */}
            {user && <span className="text-warning me-3">Logged in as {user.name}</span>}

            {/* Barra di navigazione per login, registrazione, notifiche e logout */}
            <Stack direction="horizontal" gap={3}>
              {/* Se l'utente non è autenticato, mostra i link per il login e la registrazione */}
              {!user && (
                <>
                  <Link to="/login" className="link-light text-decoration-none">
                    Login {/* Link alla pagina di login */}
                  </Link>
                  <Link to="/register" className="link-light text-decoration-none">
                    Register {/* Link alla pagina di registrazione */}
                  </Link>
                </>
              )}
              {/* Se l'utente è autenticato, mostra il componente delle notifiche e il link per il logout */}
              {user && (
                <>
                  <Notifications /> {/* Mostra le notifiche per l'utente autenticato */}
                  <Link
                    onClick={() => logoutUser()} // Logout dell'utente quando clicca su questo link
                    to="/login" // Redirige alla pagina di login dopo il logout
                    className="link-light text-decoration-none"
                  >
                    Logout {/* Link per eseguire il logout */}
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
