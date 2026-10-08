
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  // Login
  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setLoginMessage("Login successful!");
    } else {
      setLoginMessage(data.message || "Login failed");
    }
  };

  // Register
  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: "BUYER",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setRegisterMessage("Registration successful!");

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } else {
      setRegisterMessage(data.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Fake Review Detection</h1>

      {isLogin ? (
        // LOGIN PAGE
        <div>
          <h2>Login</h2>

          {loginMessage && <p>{loginMessage}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />

            <br />
            <br />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />

            <br />
            <br />

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account?{" "}
            <button onClick={() => setIsLogin(false)}>
              Register
            </button>
          </p>
        </div>
      ) : (
        // REGISTER PAGE
        <div>
          <h2>Register</h2>

          {registerMessage && <p>{registerMessage}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(event) => setRegisterName(event.target.value)}
            />

            <br />
            <br />

            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(event) => setRegisterEmail(event.target.value)}
            />

            <br />
            <br />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
            />

            <br />
            <br />

            <button type="submit">Register</button>
          </form>

          <p>
            Already have an account?{" "}
            <button onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
