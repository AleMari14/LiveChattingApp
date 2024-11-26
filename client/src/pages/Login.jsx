import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row className="d-flex align-items-center justify-content-center vh-100" style={{ background: "#f8f9fa" }}>
          <Col xs={10} sm={8} md={6} lg={4} className="shadow-lg p-4" style={{ borderRadius: "15px", background: "#ffffff", maxWidth: "400px", textAlign: "center" }}>
            <div style={{ background: "#007bff", borderRadius: "15px", color: "#ffffff", padding: "15px", marginBottom: "20px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", letterSpacing: "0.05em", margin: 0 }}>Welcome Back</h1>
            </div>
            <p className="text-muted">Please log in to access your account.</p>
            <Stack gap={3}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                  value={loginInfo.email}
                  className="p-3 border-0"
                  style={{ borderRadius: "10px", background: "#f1f3f5", boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)" }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                  value={loginInfo.password}
                  className="p-3 border-0"
                  style={{ borderRadius: "10px", background: "#f1f3f5", boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)" }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="py-2 fw-bold" style={{ background: "#007bff", border: "none", borderRadius: "10px", color: "#fff", letterSpacing: "0.05em" }} disabled={isLoginLoading}>
                {isLoginLoading ? "Logging in..." : "Login"}
              </Button>
              {loginError?.error && (
  <Alert variant="danger" className="mt-3" style={{ background: "#f8d7da", color: "#721c24", borderRadius: "10px", padding: "1em" }}>
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

export default Login;
