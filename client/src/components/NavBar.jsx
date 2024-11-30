import { useContext, useState } from "react"; // Importa i moduli React necessari per gestire il contesto e lo stato.
import { Container, Nav, Navbar, Offcanvas, Button, Stack } from "react-bootstrap"; // Importa i componenti di Bootstrap per la creazione della navbar.
import { Link } from "react-router-dom"; // Importa il componente Link per la navigazione tra le pagine.
import { AuthContext } from "../context/AuthContext"; // Importa il contesto di autenticazione.
import Notifications from "./Chat/Notifications"; // Importa il componente per le notifiche.

const NavBar = () => {
  // Estrae l'utente autenticato e la funzione di logout dal contesto di autenticazione.
  const { user, logoutUser } = useContext(AuthContext);
  // Stato per controllare la visibilità dell'Offcanvas.
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Funzione per alternare la visibilità dell'Offcanvas.
  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  // Stile base per i pulsanti.
  const buttonStyle = {
    borderWidth: "2px",
    transition: "all 0.3s ease",
    borderRadius: "30px",
    width: "100%",
    marginBottom: "0.5rem",
  };

  // Funzione per gestire gli effetti hover sui pulsanti.
  const hoverEffect = (e, backgroundColor, color, borderColor) => {
    e.target.style.backgroundColor = backgroundColor;
    e.target.style.color = color;
    e.target.style.borderColor = borderColor;
  };

  return (
    <>
      {/* Navbar principale */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          {/* Logo del brand */}
          <Navbar.Brand>
            <Link
              to="/"
              className="text-light text-decoration-none"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              ChatApp
            </Link>
          </Navbar.Brand>

          {/* Testo "Logged in as" visibile solo su desktop */}
          {user ? (
            <div
              className="d-none d-lg-flex justify-content-center align-items-center flex-grow-1"
              style={{
                color: "orange",
                fontSize: "1rem",
              }}
            >
                  Logged in as: <b>{" "}{user.name}</b>
                  </div>
          ) : null}

          {/* Pulsante notifiche visibile solo per gli utenti autenticati */}
          {user && (
            <div className="d-flex align-items-center ms-auto">
              <Notifications />
            </div>
          )}

          {/* Toggle per il menu Offcanvas */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleOffcanvas}
            className="border-0"
          />

          {/* Pulsanti Login & Register visibili su desktop per utenti non autenticati */}
          {!user && (
            <div className="d-none d-lg-flex ms-auto">
              <Link
                to="/login"
                className="btn btn-outline-light rounded-pill mx-2"
                style={{
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-light rounded-pill mx-2"
                style={{
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                }}
              >
                Register
              </Link>
            </div>
          )}

          {/* Pulsante Logout visibile su desktop per utenti autenticati */}
          {user && (
            <div className="d-none d-lg-block">
              <Button
                variant="outline-light"
                size="sm"
                onClick={logoutUser}
                className="text-light rounded-pill ms-3"
                style={{
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                  borderRadius: "30px",
                }}
                onMouseEnter={(e) => hoverEffect(e, "red", "white", "red")} // Effetto hover: sfondo rosso.
                onMouseLeave={(e) => hoverEffect(e, "transparent", "white", "white")} // Effetto hover: torna trasparente.
              >
                Logout
              </Button>
            </div>
          )}
        </Container>
      </Navbar>

      {/* Offcanvas per dispositivi mobili */}
      <Offcanvas
        show={showOffcanvas}
        onHide={toggleOffcanvas}
        placement="end"
        className="bg-dark text-light"
      >
        {/* Header dell'Offcanvas */}
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <Link to="/" className="text-light text-decoration-none">
              ChatApp
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {/* Corpo dell'Offcanvas */}
        <Offcanvas.Body>
          <Nav className="flex-column align-items-center">
            {/* Pulsanti Login & Register per utenti non autenticati */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-light rounded-pill mb-3 w-100"
                  style={buttonStyle}
                  onClick={toggleOffcanvas}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-outline-light rounded-pill mb-3 w-100"
                  style={buttonStyle}
                  onClick={toggleOffcanvas}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Pulsante Logout per dispositivi mobili */}
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => {
                    logoutUser();
                    toggleOffcanvas();
                  }}
                  className="text-light rounded-pill mb-3 w-100"
                  style={buttonStyle}
                >
                  Logout
                </Button>

                {/* Testo "Logged in as" visibile su dispositivi mobili */}
                <div className="text-center mt-4 text-warning">
                  Logged in as: <b>{" "}{user.name}</b>
                </div>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar; // Esporta il componente NavBar per l'utilizzo in altre parti dell'applicazione.
