import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function ListTile({
  id,
  title,
  content,
  checked,
  toggleChecked,
  onTap,
  onLongTap,
}) {
  return (
    <TouchableOpacity
      onPress={() => onTap(id)}
      onLongPress={() => onLongTap(id)}>
      <View style={_x.tile}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onValueChange={() => onTap(id)}
          style={_x.checkbox}
        />

        <Text
          style={[
            _x.title,
            { textDecorationLine: checked ? 'line-through' : 'none' },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const _x = StyleSheet.create({
  tile: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    minHeight: 50,
    backgroundColor: '#383E45',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    height: '100%',
    paddingLeft: 10,
    // paddingRight: 15,
    width: '100%',
    color: 'white',
    marginTop: 7,
    paddingRight: 40,
  },
  // checkbox: { marginTop: 3 },
});
