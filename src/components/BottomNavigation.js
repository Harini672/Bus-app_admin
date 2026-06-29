import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BottomNavigation({ activeTab }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 10 }]}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate("AdminDashboard")}
      >
        <MaterialIcons
          name="dashboard"
          size={24}
          color={activeTab === "dashboard" ? "#8A84FF" : "#8A8A8A"}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === "dashboard" && styles.activeLabel,
          ]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate("PassRequests")}
      >
        <MaterialIcons
          name="assignment"
          size={24}
          color={activeTab === "requests" ? "#8A84FF" : "#8A8A8A"}
        />
        <Text
          style={[
            styles.tabLabel,
            activeTab === "requests" && styles.activeLabel,
          ]}
        >
          Requests
        </Text>
      </TouchableOpacity>

      {/* Add these later */}

      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate("CreateDriver")}>
        <MaterialIcons
          name="person-add"
          size={24}
          color="#8A8A8A"
        />
        <Text style={styles.tabLabel}>Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <MaterialIcons
          name="feedback"
          size={24}
          color="#8A8A8A"
        />
        <Text style={styles.tabLabel}>Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2B2B2B",
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
    paddingTop: 10,
    paddingHorizontal: 6,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  tabLabel: {
    color: "#8A8A8A",
    fontSize: 11,
    marginTop: 4,
  },

  activeLabel: {
    color: "#8A84FF",
    fontWeight: "700",
  },
});