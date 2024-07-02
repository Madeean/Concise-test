import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.tsx';
import GenerateQRScreen from './screens/GenerateQRScreen.tsx';
import HistoryQrScreen from './screens/HistoryQrScreen.tsx';
import ScanQrScreen from './screens/ScanQrScreen.tsx';
import {RootStackParamList} from './screens/types.tsx';
import {Provider} from 'react-redux';
import store from './redux/Store.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GenerateQr" component={GenerateQRScreen} />
          <Stack.Screen name="HistoryQrScreen" component={HistoryQrScreen} />
          <Stack.Screen name="ScanQrScreen" component={ScanQrScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
