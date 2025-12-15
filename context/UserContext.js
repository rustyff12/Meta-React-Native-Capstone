import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userData");
        if (stored) {
          const user = JSON.parse(stored);
          setFname(user.fname || "");
          setLname(user.lname || "");
          setEmail(user.email || "");
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        image,
        setImage,
        fname,
        setFname,
        lname,
        setLname,
        email,
        setEmail,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
