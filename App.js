import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdminDashboard from './src/screens/AdminDashboard';

export default function App() {
  return (
    <SafeAreaProvider>
      <AdminDashboard />
    </SafeAreaProvider>
  );
}