// Importa gli hook e i componenti necessari
import { useContext } from "react"; // Hook useContext per accedere ai dati del contesto
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap"; // Componenti di React-Bootstrap per costruire il form
import { AuthContext } from "../context/AuthContext"; // Importa il contesto di autenticazione

// Componente di registrazione per creare un nuovo account
const Register = () => {
  // Usa il contesto AuthContext per accedere a variabili e funzioni di registrazione
  const {
    registerInfo, // Le informazioni inserite dall'utente per la registrazione
    updateRegisterInfo, // Funzione per aggiornare le informazioni di registrazione
    registerUser, // Funzione per eseguire la registrazione
    registerError, // Errori che potrebbero verificarsi durante la registrazione
    isRegisterLoading, // Stato che indica se la registrazione è in corso
  } = useContext(AuthContext);

  return (
    <>
      {/* Form di registrazione, invoca la funzione registerUser al submit */}
      <Form onSubmit={registerUser}>
        {/* Layout del form, centrato nella pagina con uno sfondo chiaro */}
        <Row
          className="d-flex align-items-center justify-content-center vh-100"
          style={{
            background: "#f8f9fa", // Sfondo della pagina bianco
          }}
        >
          {/* Colonna centrale che contiene il form */}
          <Col
            xs={10} sm={8} md={6} lg={4} // Imposta la larghezza del form in base alle dimensioni dello schermo
            className="shadow-lg p-4 rounded" // Aggiunge ombreggiatura e bordi arrotondati
            style={{
              background: "#ffffff", // Sfondo bianco per il blocco centrale
              maxWidth: "400px",
              textAlign: "center", // Centro i contenuti all'interno
            }}
          >
            {/* Contenitore Stack per i componenti disposti in colonna con gap */}
            <Stack gap={3}>
              {/* Intestazione con il titolo della pagina */}
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
                    fontSize: "2rem", // Imposta la dimensione del titolo
                    fontWeight: "bold", // Rende il titolo in grassetto
                    letterSpacing: "0.05em", // Aggiunge un po' di spazio tra le lettere
                    margin: 0, // Rimuove il margine predefinito
                  }}
                >
                  Welcome
                </h1>
              </div>

              {/* Paragrafo che descrive l'azione di registrazione */}
              <p
                className="text-center text-muted"
                style={{
                  fontFamily: "'Nunito', sans-serif", // Font per il paragrafo
                  fontSize: "1rem", // Dimensione del testo
                  fontWeight: "400", // Peso normale per il testo
                }}
              >
                Create your account to get started.
              </p>

              {/* Input per il nome dell'utente */}
              <Form.Group controlId="formName">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500", // Peso della font per la label
                  }}
                >
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) =>
                    updateRegisterInfo({ ...registerInfo, name: e.target.value })
                  } // Aggiorna il nome nel contesto
                  value={registerInfo.name} // Mostra il valore del nome
                  className="p-3" // Padding per il campo di input
                  style={{
                    borderRadius: "10px", // Bordi arrotondati per il campo di input
                    background: "#f1f3f5", // Colore di sfondo del campo
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)", // Ombra interna per un aspetto più morbido
                    border: "1px solid #f1f3f5", // Bordo chiaro
                    outline: "none", // Rimuove il contorno di focus predefinito
                  }}
                />
              </Form.Group>

              {/* Input per l'email dell'utente */}
              <Form.Group controlId="formEmail">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500", // Peso della font per la label
                  }}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    updateRegisterInfo({ ...registerInfo, email: e.target.value })
                  } // Aggiorna l'email nel contesto
                  value={registerInfo.email} // Mostra l'email inserita
                  className="p-3"
                  style={{
                    borderRadius: "10px", // Bordi arrotondati per il campo
                    background: "#f1f3f5", // Colore di sfondo del campo
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)", // Ombra interna per il campo
                    border: "1px solid #f1f3f5", // Bordo chiaro
                    outline: "none", // Rimuove il contorno di focus
                  }}
                />
              </Form.Group>

              {/* Input per la password dell'utente */}
              <Form.Group controlId="formPassword">
                <Form.Label
                  style={{
                    fontFamily: "'Nunito', sans-serif", // Font per la label
                    color: "#6c757d", // Colore grigio chiaro per la label
                    fontWeight: "500", // Peso della font per la label
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
                  } // Aggiorna la password nel contesto
                  value={registerInfo.password} // Mostra la password
                  className="p-3"
                  style={{
                    borderRadius: "10px", // Bordi arrotondati per il campo
                    background: "#f1f3f5", // Colore di sfondo del campo
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)", // Ombra interna per il campo
                    border: "1px solid #f1f3f5", // Bordo chiaro
                    outline: "none", // Rimuove il contorno di focus
                    marginBottom: "20px", // Spazio tra il campo password e il pulsante
                  }}
                />
              </Form.Group>

              {/* Pulsante di registrazione */}
              <Button
                variant="primary"
                type="submit"
                className="py-2 fw-bold"
                style={{
                  background: "#007bff", // Colore blu solido
                  borderColor: "#007bff", // Colore blu per il bordo
                  letterSpacing: "0.05em", // Aggiunge letterSpacing
                  fontFamily: "'Nunito', sans-serif", // Font per il pulsante
                  fontSize: "1rem", // Dimensione del testo del pulsante
                  fontWeight: "bold", // Grassetto per il pulsante
                  width: "100%", // Larghezza piena del pulsante
                  outline: "none", // Rimuove il contorno blu quando il pulsante è attivo
                  border: "none", // Rimuove il bordo del pulsante
                }}
                onFocus={(e) => {
                  // Aggiungi bordo blu al focus
                  e.target.style.border = "2px solid #007bff";
                }}
                onBlur={(e) => {
                  // Rimuove il bordo blu quando il focus viene perso
                  e.target.style.border = "none";
                }}
              >
                {/* Testo dinamico del pulsante durante il caricamento */}
                {isRegisterLoading ? "Creating your account..." : "Register"}
              </Button>

              {/* Mostra un messaggio di errore se presente */}
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

export default Register; // Esporta il componente Register
