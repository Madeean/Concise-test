import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  GenerateQr: undefined;
  HistoryQrScreen: undefined;
  ScanQrScreen: undefined;
};

export type ScanQrScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScanQrScreen'
>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type GenerateQrScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GenerateQr'
>;
export type HistoryQrScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryQrScreen'
>;

export type ScanQrScreenRouteProp = RouteProp<
  RootStackParamList,
  'ScanQrScreen'
>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type GenerateQrScreenRouteProp = RouteProp<
  RootStackParamList,
  'GenerateQr'
>;
export type HistoryQrScreenRouteProp = RouteProp<
  RootStackParamList,
  'HistoryQrScreen'
>;
