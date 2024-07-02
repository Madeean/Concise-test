import React from 'react';
import {View, StyleSheet, Text, FlatList, ListRenderItem} from 'react-native';
import {useSelector} from 'react-redux';

function HistoryQrScreen() {
  const qrMessages = useSelector(state => state.history.historyQr);

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
        data={qrMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    color: '#000',
  },
});

export default HistoryQrScreen;
