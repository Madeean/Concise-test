import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, ListRenderItem } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HistoryQrScreen() {
  const [hasilQr, setHasilQr] = useState<string[]>([]);

  useEffect(() => {
    getHasilQr();
  }, []);

  const getHasilQr = async () => {
    try {
      const value = await AsyncStorage.getItem('hasilQr');
      if (value !== null) {
        console.log('hasil qr', value);
        let list = value.split(',');
        if (list[list.length - 1] === '') {
          // Jika iya, hapus item terakhir dari array
          list.pop();
        }

        // Atur state hasilQr dengan array yang telah diperbarui
        setHasilQr(list);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem: ListRenderItem<string> = ({item}) => (
    <View style={styles.itemView}>
      <Text style={styles.item}>{item}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        scrollEnabled={true}
        contentContainerStyle={{width: '100%'}}
        data={hasilQr}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: '#fff',
    width: '100%', // Mengisi lebar penuh dari FlatList
    padding: 20, // Contoh: menambahkan padding/ Contoh: menambahkan margin vertikal
    borderBottomWidth: 1, // Contoh: menambahkan border bawah
    borderBottomColor: '#ccc', // Contoh: warna border bawah
  },
  item: {
    color: '#000',
  },
});
export default HistoryQrScreen;
