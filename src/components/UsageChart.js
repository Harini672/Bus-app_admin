import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function UsageChart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Weekly App Usage
      </Text>

      <View style={styles.graph}>
        <View style={styles.line1} />
        <View style={styles.line2} />
        <View style={styles.line3} />
        <View style={styles.line4} />
        <View style={styles.line5} />
        <View style={styles.line6} />
      </View>

      <View style={styles.days}>
        <Text style={styles.day}>Mon</Text>
        <Text style={styles.day}>Tue</Text>
        <Text style={styles.day}>Wed</Text>
        <Text style={styles.day}>Thu</Text>
        <Text style={styles.day}>Fri</Text>
        <Text style={styles.day}>Sat</Text>
        <Text style={styles.day}>Sun</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    borderRadius: 15,
    padding: 15,
    margin: 20,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  graph: {
    height: 120,
    justifyContent: "flex-end",
  },

  line1: {
    position: "absolute",
    left: 0,
    bottom: 20,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "20deg" }],
  },

  line2: {
    position: "absolute",
    left: 50,
    bottom: 35,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "-10deg" }],
  },

  line3: {
    position: "absolute",
    left: 100,
    bottom: 30,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "20deg" }],
  },

  line4: {
    position: "absolute",
    left: 150,
    bottom: 50,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "-10deg" }],
  },

  line5: {
    position: "absolute",
    left: 200,
    bottom: 45,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "20deg" }],
  },

  line6: {
    position: "absolute",
    left: 250,
    bottom: 65,
    width: 60,
    height: 3,
    backgroundColor: "#7B6CFF",
    transform: [{ rotate: "10deg" }],
  },

  days: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  day: {
    color: "#AFAFAF",
  },
});