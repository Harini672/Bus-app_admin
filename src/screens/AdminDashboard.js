import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  dashboardStats,
  recentRequests,
} from "../data/dashboardData";
import PassStatusChart from "../components/PassStatusChart";
import UsageChart from "../components/UsageChart";
import StatsCard from "../components/StatsCard";
import RequestCard from "../components/RequestCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(300, SCREEN_WIDTH * 0.78);

const MENU_ITEMS = [
  { key: "create-driver", label: "Create Driver", icon: "person-add" },
  { key: "pass-requests", label: "Pass Requests", icon: "assignment" },
  { key: "feedback", label: "View Feedback", icon: "feedback" },
];

const TAB_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "pass-requests", label: "Requests", icon: "assignment" },
  { key: "create-driver", label: "Add Driver", icon: "person-add" },
  { key: "feedback", label: "Feedback", icon: "feedback" },
];

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setMenuOpen(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => setMenuOpen(false));
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} hitSlop={10}>
          <MaterialIcons name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Admin Dashboard</Text>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      </View>

      {/* Drawer overlay */}

      {menuOpen && (
        <View style={styles.drawerOverlay} pointerEvents="box-none">
          <Animated.View
            style={[styles.backdrop, { opacity: backdropAnim }]}
          >
            <Pressable style={styles.backdropPressable} onPress={closeMenu} />
          </Animated.View>

          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            {/* Drawer header */}
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>B</Text>
              </View>
              <View>
                <Text style={styles.drawerName}>Admin</Text>
                <Text style={styles.drawerSubtitle}>Manage operations</Text>
              </View>
            </View>

            <View style={styles.drawerDivider} />

            {/* Menu items */}
            <View style={styles.drawerBody}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.menuItem}
                  onPress={closeMenu}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={22}
                    color="#BFBFBF"
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Logout pinned to bottom */}
            <View style={styles.drawerFooter}>
              <View style={styles.drawerDivider} />
              <TouchableOpacity
                style={[styles.menuItem, styles.logoutItem]}
                onPress={closeMenu}
              >
                <MaterialIcons
                  name="logout"
                  size={22}
                  color="#FF8A8A"
                  style={styles.menuIcon}
                />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Create Driver */}

        <TouchableOpacity style={styles.driverBtn}>
          <MaterialIcons name="person-add" color="white" size={22} />

          <Text style={styles.driverText}>Create New Driver</Text>
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
          <Text style={styles.graphTitle}>Feedback Ratings</Text>

          <View style={styles.feedbackCircle}>
            <Text style={styles.feedbackText}>86%</Text>
          </View>
        </View>

        {/* Recent Requests */}

        <Text style={styles.sectionTitle}>Recent Pass Requests</Text>

        {recentRequests.map((item) => (
          <RequestCard key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Bottom tab bar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom + 10 }]}>
        {TAB_ITEMS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={tab.icon}
                size={24}
                color={isActive ? "#8A84FF" : "#8A8A8A"}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
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

  // Drawer / sidebar navigation
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    flexDirection: "row",
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  backdropPressable: {
    flex: 1,
  },

  drawer: {
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#2B2B2B",
    paddingTop: 55,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  drawerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#635BFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  drawerAvatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  drawerName: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  drawerSubtitle: {
    color: "#9A9A9A",
    fontSize: 12,
    marginTop: 2,
  },

  drawerDivider: {
    height: 1,
    backgroundColor: "#3A3A3A",
  },

  drawerBody: {
    flex: 1,
    paddingTop: 10,
  },

  drawerFooter: {
    paddingBottom: 30,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  menuIcon: {
    marginRight: 14,
    width: 22,
  },

  menuText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },

  logoutItem: {
    paddingTop: 16,
  },

  logoutText: {
    color: "#FF8A8A",
    fontSize: 15,
    fontWeight: "600",
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

  scrollContent: {
    paddingBottom: 90,
  },

  // Bottom tab bar
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
    fontWeight: "500",
    marginTop: 4,
  },

  tabLabelActive: {
    color: "#8A84FF",
    fontWeight: "700",
  },

  tabIndicator: {
    position: "absolute",
    top: -10,
    width: 26,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#8A84FF",
  },
});