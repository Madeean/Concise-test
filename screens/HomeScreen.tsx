import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HomeScreenNavigationProp} from './types.tsx';
import {Button} from 'react-native-paper';

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('ScanQrScreen')}>
        <Text style={styles.buttonText}>Search QR</Text>
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('GenerateQr')}>
        <Text style={styles.buttonText}>Generate QR</Text>
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('HistoryQrScreen')}>
        <Text style={styles.buttonText}>History QR</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomeScreen;
