import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default function RequestCard({
  item,
}) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.route}>
          {item.passType} • {item.route}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.approveBtn}
        >
          <MaterialIcons
            name="check"
            size={24}
            color="green"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
        >
          <MaterialIcons
            name="close"
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2B2B2B",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  route: {
    color: "#BFBFBF",
    marginTop: 5,
  },

  actions: {
    flexDirection: "row",
  },

  approveBtn: {
    backgroundColor: "#EAF4D8",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  rejectBtn: {
    backgroundColor: "#FBE7E7",
    padding: 10,
    borderRadius: 10,
  },
});