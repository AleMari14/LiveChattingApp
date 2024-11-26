import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          className="d-flex align-items-center justify-content-center vh-100"
          style={{ background: "#f8f9fa" }}
        >
          <Col xs={10} sm={8} md={6} lg={4} className="shadow-lg p-4 bg-white rounded">
            <Stack gap={3}>
              <h2 className="text-center text-primary">Welcome Back</h2>
              <p className="text-muted text-center">
                Please log in to access your account.
              </p>

              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, email: e.target.value })
                  }
                  value={loginInfo.email}
                  className="p-3"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    updateLoginInfo({ ...loginInfo, password: e.target.value })
                  }
                  value={loginInfo.password}
                  className="p-3"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="py-2 fw-bold"
                style={{ letterSpacing: "0.05em" }}
                disabled={isLoginLoading}
              >
                {isLoginLoading ? "Logging in..." : "Login"}
              </Button>

              {loginError?.error && (
                <Alert variant="danger" className="mt-3">
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
