import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScanQrScreenNavigationProp, ScanQrScreenRouteProp} from './types.tsx';

function isValidURL(string: string) {
  const res = string.match(
    /(http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
  );
  return res !== null;
}

type Props = {
  navigation: ScanQrScreenNavigationProp;
  route: ScanQrScreenRouteProp;
};

type QRCodeScanResult = {
  data: string;
};

function ScanQrScreen({navigation}: Props) {
  const [scannerKey, setScannerKey] = useState(0);
  const [scanning, setScanning] = useState(true);

  const onSuccess = (e: QRCodeScanResult) => {
    const scannedData = e.data;
    if (isValidURL(scannedData)) {
      Linking.openURL(scannedData).catch(err =>
        Alert.alert('An error occurred', err.toString()),
      );
    } else {
      Alert.alert('Scanned Data', scannedData);
    }
    setScanning(false);
    setTimeout(() => {
      setScanning(true);
      setScannerKey(prevKey => prevKey + 1);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <QRCodeScanner key={scannerKey} onRead={onSuccess} />
      ) : (
        <View style={styles.pleaseWaitStyle}>
          <Text style={styles.centerText}>Please wait...</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    textAlign: 'center',
    color: '#000',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    padding: 16,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
  },
  pleaseWaitStyle: {
    width: '100%',
    backgroundColor: '#777',
    textAlign: 'center',
    padding: 20,
  },
});

export default ScanQrScreen;
