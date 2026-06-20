import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import {
  dashboardStats,
  recentRequests,
} from "../data/dashboardData";
import PassStatusChart from "../components/PassStatusChart";
import UsageChart from "../components/UsageChart";
import StatsCard from "../components/StatsCard";
import RequestCard from "../components/RequestCard";

export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <MaterialIcons
            name="menu"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Admin Dashboard
        </Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      </View>

      {/* Menu */}

      {menuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>
              Create Driver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>
              View Feedback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
  {/* Create Driver */}

  <TouchableOpacity style={styles.driverBtn}>
    <MaterialIcons
      name="person-add"
      color="white"
      size={22}
    />

    <Text style={styles.driverText}>
      Create New Driver
    </Text>
  </TouchableOpacity>

  {/* Statistics Cards */}

  <View style={styles.row}>
    <StatsCard
      title="Total Passes"
      value={dashboardStats.totalPasses}
      backgroundColor="#2B2B2B"
      textColor="#FFFFFF"
    />

    <StatsCard
      title="Approved"
      value={dashboardStats.approved}
      backgroundColor="#DDE8D1"
    />
  </View>

  <View style={styles.row}>
    <StatsCard
      title="Pending"
      value={dashboardStats.pending}
      backgroundColor="#F3E8D3"
    />

    <StatsCard
      title="Rejected"
      value={dashboardStats.rejected}
      backgroundColor="#F5E2E2"
    />
  </View>

  {/* Charts */}

  <PassStatusChart
    approved={dashboardStats.approved}
    pending={dashboardStats.pending}
    rejected={dashboardStats.rejected}
  />

  <UsageChart />

  {/* Feedback */}

  <View style={styles.graphBox}>
    <Text style={styles.graphTitle}>
      Feedback Ratings
    </Text>

    <View style={styles.feedbackCircle}>
      <Text style={styles.feedbackText}>
        86%
      </Text>
    </View>
  </View>

  {/* Recent Requests */}

  <Text style={styles.sectionTitle}>
    Recent Pass Requests
  </Text>

  {recentRequests.map((item) => (
    <RequestCard
      key={item.id}
      item={item}
    />
  ))}

  <View style={{ height: 30 }} />
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },

  header: {
    backgroundColor: "#635BFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8A84FF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "white",
    fontWeight: "bold",
  },

  menuContainer: {
    backgroundColor: "#333",
    padding: 10,
  },

  menuItem: {
    paddingVertical: 12,
  },

  menuText: {
    color: "white",
    fontSize: 16,
  },

  driverBtn: {
    margin: 20,
    backgroundColor: "#635BFF",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  driverText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  card: {
    width: "48%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  dark: {
    backgroundColor: "#2D2D2D",
  },

  green: {
    backgroundColor: "#DDE8D1",
  },

  yellow: {
    backgroundColor: "#F3E8D3",
  },

  red: {
    backgroundColor: "#F5E2E2",
  },

  cardTitle: {
    fontSize: 15,
  },

  cardValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },

  graphBox: {
    backgroundColor: "#2B2B2B",
    margin: 20,
    borderRadius: 15,
    padding: 15,
  },

  graphTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    height: 150,
    alignItems: "flex-end",
  },

  bar1: {
    width: 35,
    height: 120,
    backgroundColor: "#7CB342",
  },

  bar2: {
    width: 35,
    height: 60,
    backgroundColor: "#E39D21",
  },

  bar3: {
    width: 35,
    height: 25,
    backgroundColor: "#FF5252",
  },

  lineGraph: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  feedbackCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 10,
    borderColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
  },

  feedbackText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  requestCard: {
    backgroundColor: "#2B2B2B",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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

  actionBtns: {
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