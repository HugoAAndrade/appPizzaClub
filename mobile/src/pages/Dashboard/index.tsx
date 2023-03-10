import React, { useContext, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [number, setNumber] = useState("");

  async function openOrder() {
    if (number === "") {
      return;
    }

    const response = await api.post("/order", {
      table: Number(number),
    });

    // console.log(response.data);

    navigation.navigate("Order", {
      number: number,
      order_id: response.data.id,
    });

    setNumber("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonExit} onPress={signOut}>
        <Feather name="log-out" color="#FFF" size={24} />
      </TouchableOpacity>
      <View style={styles.containerOrder}>
        <Text style={styles.title}>Novo pedido</Text>
        <TextInput
          style={styles.input}
          placeholder="Número da mesa"
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={number}
          onChangeText={setNumber}
        />
        <TouchableOpacity style={styles.button} onPress={openOrder}>
          <Text style={styles.buttonText}>Abrir mesa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#1D1D2E",
  },
  containerOrder: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonExit: {
    flexDirection: "column",
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#3FFFA3",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#101026",
    fontWeight: "bold",
  },
});
