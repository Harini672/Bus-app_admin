import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const scrollRef = useRef(null);

  // ---- Entrance animations ----
  const iconAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(30)).current;

  // ---- Press animation ----
  const btnScale = useRef(new Animated.Value(1)).current;

  // ---- Field focus animations ----
  const nameFocusAnim = useRef(new Animated.Value(0)).current;
  const emailFocusAnim = useRef(new Animated.Value(0)).current;
  const passwordFocusAnim = useRef(new Animated.Value(0)).current;
  const confirmFocusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(cardTranslateY, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const animateFocus = (anim, toValue) => {
    Animated.timing(anim, {
      toValue,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const pressIn = () => {
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true, speed: 50 }).start();
  };
  const pressOut = () => {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: replace with your real sign-up API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      Alert.alert('Account created', 'You can now log in.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (e) {
      Alert.alert('Sign up failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const borderColor = (anim, fieldError) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [fieldError ? ERROR : BORDER, PRIMARY],
    });

  const nameBorderColor = borderColor(nameFocusAnim, errors.name);
  const emailBorderColor = borderColor(emailFocusAnim, errors.email);
  const passwordBorderColor = borderColor(passwordFocusAnim, errors.password);
  const confirmBorderColor = borderColor(confirmFocusAnim, errors.confirmPassword);

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={styles.flex}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraHeight={120}
      keyboardOpeningTime={0}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backText}>{'‹'} Back</Text>
        </TouchableOpacity>

        {/* Icon */}
        <Animated.View
          style={[
            styles.iconWrap,
            { opacity: iconAnim, transform: [{ scale: iconAnim }] },
          ]}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>📝</Text>
          </View>
        </Animated.View>

        {/* Card */}
        <Animated.View
          style={[
            styles.card,
            { opacity: cardAnim, transform: [{ translateY: cardTranslateY }] },
          ]}
        >
          <Text style={styles.heading}>Create Admin Account</Text>
          <Text style={styles.subheading}>
            Sign up to start managing your bus fleet
          </Text>

          {/* Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <Animated.View style={[styles.inputWrap, { borderColor: nameBorderColor }]}>
              <TextInput
                style={styles.input}
                placeholder="Jane Admin"
                placeholderTextColor="#A0A3BD"
                value={name}
                onFocus={() => animateFocus(nameFocusAnim, 1)}
                onBlur={() => animateFocus(nameFocusAnim, 0)}
                onChangeText={(t) => {
                  setName(t);
                  if (errors.name) setErrors((p) => ({ ...p, name: null }));
                }}
                returnKeyType="next"
              />
            </Animated.View>
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <Animated.View style={[styles.inputWrap, { borderColor: emailBorderColor }]}>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#A0A3BD"
                value={email}
                onFocus={() => animateFocus(emailFocusAnim, 1)}
                onBlur={() => animateFocus(emailFocusAnim, 0)}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errors.email) setErrors((p) => ({ ...p, email: null }));
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
              />
            </Animated.View>
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <Animated.View style={[styles.inputWrap, { borderColor: passwordBorderColor }]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0A3BD"
                value={password}
                onFocus={() => animateFocus(passwordFocusAnim, 1)}
                onBlur={() => animateFocus(passwordFocusAnim, 0)}
                onChangeText={(t) => {
                  setPassword(t);
                  if (errors.password) setErrors((p) => ({ ...p, password: null }));
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((s) => !s)}
                style={styles.eyeBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </Animated.View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <Animated.View style={[styles.inputWrap, { borderColor: confirmBorderColor }]}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0A3BD"
                value={confirmPassword}
                onFocus={() => animateFocus(confirmFocusAnim, 1)}
                onBlur={() => animateFocus(confirmFocusAnim, 0)}
                onChangeText={(t) => {
                  setConfirmPassword(t);
                  if (errors.confirmPassword)
                    setErrors((p) => ({ ...p, confirmPassword: null }));
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
              />
            </Animated.View>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          {/* Sign up button */}
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleSignUp}
              onPressIn={pressIn}
              onPressOut={pressOut}
              disabled={loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.btnText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const PRIMARY = '#6C5CE7';
const PRIMARY_DARK = '#5849C2';
const BG = '#F5F6FB';
const TEXT_DARK = '#2D2A4A';
const TEXT_MUTED = '#8A8DA6';
const BORDER = '#E3E5F0';
const ERROR = '#E5484D';

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BG },
  scrollContent: { flexGrow: 1, paddingTop: 32, paddingBottom: 60 },
  container: { paddingHorizontal: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 15, color: PRIMARY, fontWeight: '700' },
  iconWrap: { alignItems: 'center', marginBottom: 18 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EDEBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: { fontSize: 26 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#3B3B6B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT_DARK,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 13,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 22,
  },
  fieldGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: TEXT_DARK, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 14,
    backgroundColor: '#FAFAFE',
    paddingHorizontal: 14,
  },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, color: TEXT_DARK },
  eyeBtn: { paddingLeft: 8, paddingVertical: 6 },
  eyeText: { fontSize: 12, fontWeight: '700', color: PRIMARY },
  errorText: { fontSize: 12, color: ERROR, marginTop: 6 },
  btn: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  btnDisabled: { backgroundColor: PRIMARY_DARK, opacity: 0.8 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { fontSize: 13, color: TEXT_MUTED },
  loginLink: { fontSize: 13, color: PRIMARY, fontWeight: '700' },
});