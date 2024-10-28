import { createContext, useState } from "react";

//creating a context
export const UserContext = createContext();

function UserProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState("");

  console.log(email);
  console.log(loggedIn);
  console.log(id);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        loggedIn,
        setLoggedIn,
        id,
        setId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
