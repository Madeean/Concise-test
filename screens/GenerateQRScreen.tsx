import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNQRGenerator from 'rn-qr-generator';

function GenerateQRScreen() {
  const [uri, setUri] = useState('');
  const [text, setText] = useState('');
  const [hasilQr, setHasilQr] = useState('');

  useEffect(() => {
    getHasilQr();
  }, []);

  const simpanHasilQr = async () => {
    try {
      let simpanQr = hasilQr + text;
      await AsyncStorage.setItem('hasilQr', simpanQr + ',');
    } catch (e) {
      console.log(e);
    }
  };

  const getHasilQr = async () => {
    try {
      const value = await AsyncStorage.getItem('hasilQr');
      if (value !== null) {
        console.log('hasil qr', value);
        setHasilQr(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setQrImage = (text: string) => {
    RNQRGenerator.generate({
      correctionLevel: 'L',
      value: text,
      height: 100,
      width: 100,
    })
      .then(response => {
        const {uri} = response;
        console.log('uri', uri);
        setUri(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  };

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.container}>
        <TextInput
          placeholder="Input Link"
          placeholderTextColor="#000"
          value={text}
          onChangeText={text => setText(text)}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setQrImage(text);
            simpanHasilQr();
            getHasilQr();
          }}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>

        {uri !== '' ? (
          <View style={styles.qrContainer}>
            {/*<QRCode value={uri} size={200} />*/}
            <Image source={{uri}} width={200} height={200} />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    width: '80%',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scrollViewStyle: {
    backgroundColor: '#fff',
  },
});

export default GenerateQRScreen;
