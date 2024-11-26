import { useContext, useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Chat/Notifications";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  const buttonStyle = {
    borderWidth: "2px",
    transition: "all 0.3s ease",
    borderRadius: "30px",
    width: "100%",
    marginBottom: "0.5rem",
  };

  const hoverEffect = (e, backgroundColor, color, borderColor) => {
    e.target.style.backgroundColor = backgroundColor;
    e.target.style.color = color;
    e.target.style.borderColor = borderColor;
  };

  return (
    <>
      {/* Main Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          {/* Navbar Brand */}
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

          {/* Centered "Logged in as" text for Desktop */}
          {user && (
            <div
              className="d-none d-lg-flex justify-content-center align-items-center flex-grow-1"
              style={{
                color: "orange",
                fontSize: "1rem",
              }}
            >
              Logged in as <b>{user.name}</b>
            </div>
          )}

          {/* Notifications Button always visible */}
          {user && (
            <div className="d-flex align-items-center ms-auto">
              <Notifications />
            </div>
          )}

          {/* Login and Register for Desktop */}
          {!user && (
            <div className="d-none d-lg-flex ms-auto">
              <Link
                to="/login"
                className="btn btn-outline-light rounded-pill mx-2"
                style={{
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                  borderRadius: "30px",
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
                  borderRadius: "30px",
                }}
              >
                Register
              </Link>
            </div>
          )}

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleOffcanvas}
            className="border-0"
          />

          {/* Logout Button for Desktop */}
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
                onMouseEnter={(e) => hoverEffect(e, "red", "white", "red")}
                onMouseLeave={(e) => hoverEffect(e, "transparent", "white", "white")}
              >
                Logout
              </Button>
            </div>
          )}
        </Container>
      </Navbar>

      {/* Offcanvas for Mobile */}
      <Offcanvas
        show={showOffcanvas}
        onHide={toggleOffcanvas}
        placement="end"
        className="bg-dark text-light"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>
            <Link to="/" className="text-light text-decoration-none">
              ChatApp
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column align-items-center">
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
                {/* Logout for Mobile */}
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

                {/* Centered "Logged in as" text for Mobile */}
                <div className="text-center mt-4 text-warning">
                  Logged in as <b>{user.name}</b>
                </div>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
