import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // TODO: replace with your real "send reset email" API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSent(true);
    } catch (e) {
      Alert.alert('Error', 'Could not send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
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

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔒</Text>
            </View>

            {!sent ? (
              <>
                <Text style={styles.heading}>Forgot Password?</Text>
                <Text style={styles.subheading}>
                  Enter the email linked to your admin account and we'll send
                  you a reset link.
                </Text>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={[styles.inputWrap, error && styles.inputWrapError]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="you@example.com"
                      placeholderTextColor="#A0A3BD"
                      value={email}
                      onChangeText={(t) => {
                        setEmail(t);
                        if (error) setError('');
                      }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoCorrect={false}
                    />
                  </View>
                  {error ? <Text style={styles.errorText}>{error}</Text> : null}
                </View>

                <TouchableOpacity
                  style={[styles.btn, loading && styles.btnDisabled]}
                  onPress={handleReset}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.btnText}>Send Reset Link</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.heading}>Check your email</Text>
                <Text style={styles.subheading}>
                  We've sent a password reset link to{'\n'}
                  <Text style={styles.emailHighlight}>{email}</Text>
                </Text>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnText}>Back to Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendBtn}
                  onPress={() => setSent(false)}
                >
                  <Text style={styles.resendText}>
                    Didn't get it? Try a different email
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
  scrollContent: { flexGrow: 1, paddingTop: 32, paddingBottom: 40 },
  container: { paddingHorizontal: 24, paddingVertical: 32 },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: 15, color: PRIMARY, fontWeight: '700' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#3B3B6B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EDEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconEmoji: { fontSize: 28 },
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
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 19,
  },
  emailHighlight: { color: TEXT_DARK, fontWeight: '700' },
  fieldGroup: { width: '100%', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: TEXT_DARK, marginBottom: 6 },
  inputWrap: {
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 14,
    backgroundColor: '#FAFAFE',
    paddingHorizontal: 14,
  },
  inputWrapError: { borderColor: ERROR },
  input: { paddingVertical: 14, fontSize: 15, color: TEXT_DARK },
  errorText: { fontSize: 12, color: ERROR, marginTop: 6 },
  btn: {
    width: '100%',
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  btnDisabled: { backgroundColor: PRIMARY_DARK, opacity: 0.8 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  resendBtn: { marginTop: 18 },
  resendText: { fontSize: 13, color: PRIMARY, fontWeight: '600' },
});