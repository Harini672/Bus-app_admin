import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatsCard({
  title,
  value,
  backgroundColor,
  textColor = "#000",
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: textColor },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          { color: textColor },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },

  title: {
    fontSize: 15,
  },

  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
});