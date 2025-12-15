import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [orderStatuses, setOrderStatuses] = useState(true);
  const [passwordChanges, setPasswordChanges] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userData");
        if (stored) {
          const user = JSON.parse(stored);
          setFname(user.fname || "");
          setLname(user.lname || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
          setImage(user.image || null);

          setOrderStatuses(user.orderStatuses ?? true);
          setPasswordChanges(user.passwordChanges ?? true);
          setSpecialOffers(user.specialOffers ?? false);
          setNewsletter(user.newsletter ?? false);
        }
      } catch (e) {
        console.error("Failed to load user data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const userData = {
          fname,
          lname,
          email,
          image,
          phone,
          orderStatuses,
          passwordChanges,
          specialOffers,
          newsletter,
        };
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
      } catch (e) {
        console.error("Failed to save user data", e);
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [
    fname,
    lname,
    email,
    image,
    phone,
    orderStatuses,
    passwordChanges,
    specialOffers,
    newsletter,
    isLoading,
  ]);

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
        phone,
        setPhone,
        orderStatuses,
        setOrderStatuses,
        passwordChanges,
        setPasswordChanges,
        specialOffers,
        setSpecialOffers,
        newsletter,
        setNewsletter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
