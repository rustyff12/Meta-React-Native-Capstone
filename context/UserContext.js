import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider
      value={{
        image,
        setImage,
        fname,
        setfName,
        lname,
        setlName,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
