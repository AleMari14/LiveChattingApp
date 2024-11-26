import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          className="d-flex align-items-center justify-content-center vh-100"
          style={{
            background: "#f8f9fa", // Sfondo della pagina bianco
          }}
        >
          <Col
            xs={10} sm={8} md={6} lg={4}
            className="shadow-lg p-4 rounded"
            style={{
              background: "#ffffff", // Sfondo bianco per il blocco centrale
              maxWidth: "400px",
              textAlign: "center", // Centro contenuti
            }}
          >
            <Stack gap={3}>
              {/* Titolo "Welcome" senza sfumatura */}
              <div
                style={{
                  background: "#007bff", // Colore blu solido
                  borderRadius: "15px",
                  color: "#ffffff",
                  padding: "15px",
                  marginBottom: "20px",
                }}
              >
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    margin: 0,
                  }}
                >
                  Welcome
                </h1>
              </div>

              <p
                className="text-center text-muted"
                style={{
                  fontFamily: "'Nunito', sans-serif", // Font Nunito per il paragrafo
                  fontSize: "1rem", // Dimensione del testo
                  fontWeight: "400", // Peso normale per il testo
                }}
              >
                Create your account to get started.
              </p>

              {/* Name Input */}
              <Form.Group controlId="formName">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font Nunito per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500",
                  }}
                >
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    updateRegisterInfo({ ...registerInfo, name: e.target.value })
                  }
                  value={registerInfo.name}
                  className="p-3"
                  style={{
                    borderRadius: "10px",
                    background: "#f1f3f5",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #f1f3f5", // Rimuove il bordo azzurro
                    outline: "none", // Rimuove il contorno azzurro
                  }}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group controlId="formEmail">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font Nunito per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500",
                  }}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    updateRegisterInfo({ ...registerInfo, email: e.target.value })
                  }
                  value={registerInfo.email}
                  className="p-3"
                  style={{
                    borderRadius: "10px",
                    background: "#f1f3f5",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #f1f3f5", // Rimuove il bordo azzurro
                    outline: "none", // Rimuove il contorno azzurro
                  }}
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font Nunito per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500",
                  }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                  value={registerInfo.password}
                  className="p-3"
                  style={{
                    borderRadius: "10px",
                    background: "#f1f3f5",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #f1f3f5", // Rimuove il bordo azzurro
                    outline: "none", // Rimuove il contorno azzurro
                    marginBottom: "20px", // Spazio tra il campo password e il pulsante
                  }}
                />
              </Form.Group>

              {/* Register Button senza sfumatura */}
              <Button
                variant="primary"
                type="submit"
                className="py-2 fw-bold"
                style={{
                  background: "#007bff", // Colore blu solido per il pulsante
                  borderColor: "#007bff", // Colore blu solido per il bordo
                  letterSpacing: "0.05em", // Aggiunta di letterSpacing
                  fontFamily: "'Nunito', sans-serif", // Font Nunito per il pulsante
                  fontSize: "1rem", // Stesso font-size
                  fontWeight: "bold", // Stesso font-weight per il pulsante
                  width: "100%", // Larghezza del pulsante piena
                  outline: "none", // Rimuove il contorno blu quando il pulsante è attivo
                  border: "none", // Rimuove il bordo del pulsante
                }}
                onFocus={(e) => {
                  // Aggiungi un bordo azzurro al focus
                  e.target.style.border = "2px solid #007bff";
                }}
                onBlur={(e) => {
                  // Rimuove il bordo azzurro quando il focus viene perso
                  e.target.style.border = "none";
                }}
              >
                {isRegisterLoading ? "Creating your account..." : "Register"}
              </Button>

              {/* Error Alert */}
              {registerError?.error && (
  <Alert variant="danger" className="mt-3">
    <b>{`Error: ${registerError?.status || "Unknown"}`}</b>
    <p>{registerError?.message}</p>
  </Alert>
)}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;