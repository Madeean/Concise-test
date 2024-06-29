import React, {useState} from 'react';
import {View, StyleSheet, Text, Linking, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {ScanQrScreenNavigationProp, ScanQrScreenRouteProp} from './types.tsx';
import {Button, useTheme} from 'react-native-paper';

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
  const theme = useTheme();

  const [scannerKey, setScannerKey] = useState(0);
  const [scanning, setScanning] = useState(true);
  const [temuQR, setTemuQR] = useState(true);

  const onSuccess = (e: QRCodeScanResult) => {
    const scannedData = e.data;
    if (isValidURL(scannedData)) {
      Linking.openURL(scannedData).catch(err =>
        Alert.alert('An error occurred', err.toString()),
      );
    } else {
      Alert.alert('Scanned Data', scannedData);
    }
    setTemuQR(false);
    setScanning(false);
    setTimeout(() => {
      setScanning(true);
      setTemuQR(true);
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
      {temuQR ? (
        <Text style={styles.tidakMenemukanQR}>Tidak menemukan QR</Text>
      ) : null}
      <Button
        mode="outlined"
        buttonColor={theme.colors.secondaryContainer}
        style={styles.button}
        onPress={() => navigation.pop()}>
        <Text style={styles.buttonText}>Back</Text>
      </Button>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  pleaseWaitStyle: {
    width: '100%',
    backgroundColor: '#777',
    textAlign: 'center',
    padding: 20,
  },
  tidakMenemukanQR: {
    width: '100%',
    backgroundColor: '#bababa',
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
});

export default ScanQrScreen;
