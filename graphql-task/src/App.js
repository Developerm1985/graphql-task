import "./App.css";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      status
      token
    }
  }
`;

function App() {
  const [user, setUser] = useState({});
  const [login] = useMutation(LOGIN_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: { ...user },
      });
      if (result?.data?.login?.success) {
        alert(result?.data?.login?.message);
        setUser({});
      } else if (result?.data?.login) {
        alert(result?.data?.login?.message);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="App">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={user.username ?? ""}
            placeholder="user name"
            className="field-input"
            />
          <br />
          <input
            className="field-input"
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password ?? ""}
            placeholder="password"
          />
          <br />

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
