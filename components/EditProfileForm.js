import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fonts } from "../assets/fonts";

export default function EditProfileForm() {
  const phoneRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigation = useNavigation();
  const {
    fname: contextFname,
    setFname,
    lname: contextLname,
    setLname,
    email: contextEmail,
    setEmail,
    phone: contextPhone,
    setPhone,
    orderStatuses: contextOrder,
    setOrderStatuses,
    passwordChanges: contextPassword,
    setPasswordChanges,
    specialOffers: contextOffers,
    setSpecialOffers,
    newsletter: contextNewsletter,
    setNewsletter,
  } = useUser();

  const [fname, setLocalFname] = useState(contextFname);
  const [lname, setLocalLname] = useState(contextLname);
  const [email, setLocalEmail] = useState(contextEmail);
  const [phone, setLocalPhone] = useState(contextPhone);
  const [orderStatuses, setLocalOrder] = useState(contextOrder);
  const [passwordChanges, setLocalPassword] = useState(contextPassword);
  const [specialOffers, setLocalOffers] = useState(contextOffers);
  const [newsletter, setLocalNewsletter] = useState(contextNewsletter);

  useEffect(() => {
    setLocalFname(contextFname);
    setLocalLname(contextLname);
    setLocalEmail(contextEmail);
    setLocalPhone(contextPhone);
    setLocalOrder(contextOrder);
    setLocalPassword(contextPassword);
    setLocalOffers(contextOffers);
    setLocalNewsletter(contextNewsletter);
  }, [
    contextFname,
    contextLname,
    contextEmail,
    contextPhone,
    contextOrder,
    contextPassword,
    contextOffers,
    contextNewsletter,
  ]);

  const hasUnsavedChanges = () => {
    return (
      fname !== contextFname ||
      lname !== contextLname ||
      email !== contextEmail ||
      phone !== contextPhone ||
      orderStatuses !== contextOrder ||
      passwordChanges !== contextPassword ||
      specialOffers !== contextOffers ||
      newsletter !== contextNewsletter
    );
  };

  const isFormValid = () => {
    return emailRegex.test(email) && phoneRegex.test(phone);
  };

  const canSave = () => hasUnsavedChanges() && isFormValid();

  const handleSave = () => {
    setFname(fname);
    setLname(lname);
    setEmail(email);
    setPhone(phone);
    setOrderStatuses(orderStatuses);
    setPasswordChanges(passwordChanges);
    setSpecialOffers(specialOffers);
    setNewsletter(newsletter);

    Alert.alert("Success", "Your changes have been saved!");
  };

  const handleDiscard = () => {
    setLocalFname(contextFname);
    setLocalLname(contextLname);
    setLocalEmail(contextEmail);
    setLocalPhone(contextPhone);
    setLocalOrder(contextOrder);
    setLocalPassword(contextPassword);
    setLocalOffers(contextOffers);
    setLocalNewsletter(contextNewsletter);

    Alert.alert("Discarded", "Changes have been discarded.");
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("userData");
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
          } catch (e) {
            console.error("Logout error", e);
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          value={fname}
          onChangeText={setLocalFname}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          value={lname}
          onChangeText={setLocalLname}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setLocalEmail}
          style={styles.input}
        />
        {!emailRegex.test(email) && (
          <Text style={styles.invalidEntry}>* This is not a valid Email</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          value={phone}
          onChangeText={setLocalPhone}
          style={styles.input}
        />
        {!phoneRegex.test(phone) && (
          <Text style={styles.invalidEntry}>
            * This is not a valid US Phone Number
          </Text>
        )}
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailHeader}>Email notifications</Text>
        <View style={styles.row}>
          <Switch value={orderStatuses} onValueChange={setLocalOrder} />
          <Text style={styles.emailLabel}>Order statuses</Text>
        </View>

        <View style={styles.row}>
          <Switch value={passwordChanges} onValueChange={setLocalPassword} />
          <Text style={styles.emailLabel}>Password changes</Text>
        </View>

        <View style={styles.row}>
          <Switch value={specialOffers} onValueChange={setLocalOffers} />
          <Text style={styles.emailLabel}>Special offers</Text>
        </View>

        <View style={styles.row}>
          <Switch value={newsletter} onValueChange={setLocalNewsletter} />
          <Text style={styles.emailLabel}>Newsletter</Text>
        </View>
      </View>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.discardBtn]}
          onPress={handleDiscard}
          disabled={!hasUnsavedChanges()}
        >
          <Text style={styles.discardText}>Discard changes</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.saveBtn,
            !canSave() && styles.disabledBtn,
          ]}
          onPress={handleSave}
          disabled={!canSave()}
        >
          <Text style={styles.saveText}>Save changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 10,
  },
  label: {
    color: "#333333ff",
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  input: {
    borderColor: "#333333ff",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    padding: 10,
  },
  invalidEntry: {
    color: "red",
    fontWeight: 700,
    fontSize: 16,
  },
  emailContainer: {
    // backgroundColor: "red",
  },
  emailHeader: {
    fontSize: 20,
    fontWeight: 700,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  emailLabel: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
    color: "#333",
    fontFamily: Fonts.medium,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  discardBtn: {
    backgroundColor: "#ccc",
  },
  saveBtn: {
    backgroundColor: "#495E57",
  },
  disabledBtn: {
    backgroundColor: "#aaa",
  },
  saveText: { color: "white", fontWeight: "bold", fontFamily: Fonts.medium },
  discardText: { color: "#333", fontWeight: "bold", fontFamily: Fonts.medium },
  logoutBtn: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F4CE14",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
});
