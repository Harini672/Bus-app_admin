import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';

export default function GoogleAuthScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const btnScale = React.useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true, speed: 50 }).start();
  };
  const pressOut = () => {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
  };

  const handleGooglePress = () => {
    // TODO: hook up real Google sign-in here later.
    // For now this just simulates a loading state and moves on.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Dashboard');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconEmoji}>🔐</Text>
      </View>

      <Text style={styles.title}>Sign in with Google</Text>
      <Text style={styles.subtitle}>
        Choose a Google account to continue to the Admin Portal
      </Text>

      <Animated.View style={{ width: '100%', transform: [{ scale: btnScale }] }}>
        <TouchableOpacity
          style={[styles.googleBtn, loading && styles.btnDisabled]}
          onPress={handleGooglePress}
          onPressIn={pressIn}
          onPressOut={pressOut}
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <View style={styles.gBadge}>
                <Text style={styles.googleG}>G</Text>
              </View>
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.backText}>{'‹'} Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const PRIMARY = '#6C5CE7';
const TEXT_DARK = '#2D2A4A';
const TEXT_MUTED = '#8A8DA6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#F5F6FB',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EDEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconEmoji: { fontSize: 32 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: TEXT_DARK,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginBottom: 36,
    paddingHorizontal: 10,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    width: '100%',
    paddingVertical: 18,
    borderRadius: 40,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  btnDisabled: { opacity: 0.7 },
  gBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  googleG: { fontSize: 14, fontWeight: '800', color: '#4285F4' },
  googleBtnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  backBtn: { marginTop: 24 },
  backText: { fontSize: 14, color: PRIMARY, fontWeight: '600' },
});