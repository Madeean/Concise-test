import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Button, useTheme} from 'react-native-paper';
import {ScanQrScreenNavigationProp, ScanQrScreenRouteProp} from './types';

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
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    handlePermissionResult(result);
  };

  const requestCameraPermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    handlePermissionResult(result);
  };

  const handlePermissionResult = result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        ToastAndroid.show(
          'Fitur kamera tidak tersedia di perangkat ini',
          ToastAndroid.LONG,
        );
        break;
      case RESULTS.DENIED:
        requestCameraPermission();
        break;
      case RESULTS.GRANTED:
        setHasCameraPermission(true);
        break;
      case RESULTS.BLOCKED:
        ToastAndroid.show(
          'Izin kamera diblokir. Aktifkan dari pengaturan.',
          ToastAndroid.LONG,
        );
        break;
    }
  };

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
      {hasCameraPermission ? (
        scanning ? (
          <QRCodeScanner key={scannerKey} onRead={onSuccess} />
        ) : (
          <View style={styles.pleaseWaitStyle}>
            <Text style={styles.centerText}>Please wait...</Text>
          </View>
        )
      ) : (
        <Text style={styles.permissionText}>
          Izin kamera diperlukan untuk memindai QR code. Harap izinkan akses
          kamera.
        </Text>
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
  permissionText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
  },
});

export default ScanQrScreen;
