import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PassRequestsScreen from './PassrequestsScreen';

//import HomeScreen from './HomeScreen';
//import LoginScreen from './LoginScreen';
//import DashboardScreen from './DashboardScreen';
//import GoogleAuthScreen from './GoogleAuthScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
        /> */}

        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
        /> */}

        {/* <Stack.Screen
          name="GoogleAuth"
          component={GoogleAuthScreen}
        /> */}

        {/* <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        /> */}
        <Stack.Screen name="PassRequests" component={PassRequestsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}