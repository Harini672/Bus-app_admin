import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function PassStatusChart({
  approved,
  pending,
  rejected,
}) {
  const maxValue = Math.max(
    approved,
    pending,
    rejected
  );

  const getHeight = (value) =>
    (value / maxValue) * 120;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pass Status Overview
      </Text>

      <View style={styles.chart}>
        <View style={styles.barGroup}>
          <Text style={styles.value}>
            {approved}
          </Text>

          <View
            style={[
              styles.approvedBar,
              {
                height: getHeight(
                  approved
                ),
              },
            ]}
          />

          <Text style={styles.label}>
            Approved
          </Text>
        </View>

        <View style={styles.barGroup}>
          <Text style={styles.value}>
            {pending}
          </Text>

          <View
            style={[
              styles.pendingBar,
              {
                height: getHeight(
                  pending
                ),
              },
            ]}
          />

          <Text style={styles.label}>
            Pending
          </Text>
        </View>

        <View style={styles.barGroup}>
          <Text style={styles.value}>
            {rejected}
          </Text>

          <View
            style={[
              styles.rejectedBar,
              {
                height: getHeight(
                  rejected
                ),
              },
            ]}
          />

          <Text style={styles.label}>
            Rejected
          </Text>
        </View>
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

  chart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 180,
  },

  barGroup: {
    alignItems: "center",
  },

  approvedBar: {
    width: 35,
    backgroundColor: "#75B843",
    borderRadius: 8,
  },

  pendingBar: {
    width: 35,
    backgroundColor: "#D58E1D",
    borderRadius: 8,
  },

  rejectedBar: {
    width: 35,
    backgroundColor: "#F55C5C",
    borderRadius: 8,
  },

  value: {
    color: "white",
    marginBottom: 5,
    fontWeight: "bold",
  },

  label: {
    color: "white",
    marginTop: 8,
  },
});