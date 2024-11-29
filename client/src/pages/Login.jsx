// Importa i necessari hook e componenti da React e React-Bootstrap
import { useContext } from "react"; // Hook useContext per accedere ai dati del contesto
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"; // Componente per l'interfaccia utente
import { AuthContext } from "../context/AuthContext"; // Importa il contesto di autenticazione

// Componente Login per la pagina di accesso
const Login = () => {
  // Usa il contesto AuthContext per ottenere le informazioni di login, errori, e funzioni
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext);

  return (
    <>
      {/* Form di login che gestisce l'invio delle credenziali */}
      <Form onSubmit={loginUser}>
        {/* Struttura della pagina con il layout centrato */}
        <Row className="d-flex align-items-center justify-content-center vh-100" style={{ background: "#f8f9fa" }}>
          {/* Colonna che contiene il modulo di login */}
          <Col xs={10} sm={8} md={6} lg={4} className="shadow-lg p-4" style={{ borderRadius: "15px", background: "#ffffff", maxWidth: "400px", textAlign: "center" }}>
            {/* Intestazione con il titolo del modulo */}
            <div style={{ background: "#007bff", borderRadius: "15px", color: "#ffffff", padding: "15px", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.05em", margin: 0 }}>Welcome Back</h1>
            </div>
            {/* Descrizione che invita l'utente a fare il login */}
            <p className="text-muted">Please log in to access your account.</p>
            {/* Stack di componenti Bootstrap per separare gli input */}
            <Stack gap={3}>
              {/* Input per l'indirizzo email */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} // Aggiorna il valore dell'email nel contesto
                  value={loginInfo.email} // Valore attuale dell'email nel contesto
                  className="p-3 border-0"
                  style={{ borderRadius: "10px", background: "#f1f3f5", boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)" }}
                />
              </Form.Group>
              {/* Input per la password */}
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} // Aggiorna il valore della password nel contesto
                  value={loginInfo.password} // Valore attuale della password nel contesto
                  className="p-3 border-0"
                  style={{ borderRadius: "10px", background: "#f1f3f5", boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)" }}
                />
              </Form.Group>
              {/* Bottone di invio del modulo */}
              <Button variant="primary" type="submit" className="py-2 fw-bold" style={{ background: "#007bff", border: "none", borderRadius: "10px", color: "#fff", letterSpacing: "0.05em" }} disabled={isLoginLoading}>
                {/* Cambia il testo del bottone a seconda che il login sia in corso */}
                {isLoginLoading ? "Logging in..." : "Login"}
              </Button>
              {/* Se c'è un errore di login, mostra un messaggio di alert */}
              {loginError?.error && (
                <Alert variant="danger" className="mt-3" style={{ background: "#f8d7da", color: "#721c24", borderRadius: "10px", padding: "1em" }}>
                  {/* Mostra il codice dell'errore e il messaggio */}
                  <b>{`Error: ${loginError?.status || "Unknown"}`}</b>
                  <p>{loginError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
