import React from 'react';
import {Text, View} from 'react-native';
import ListItem from 'components/ListItem';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  children: Element;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void> | void;
}

const ListItemBasic = ({children, onEdit, onDelete, ...rest}: Props) => (
  <ListItem
    {...rest}
    rightSwipeActions={() => {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={onEdit}
            style={{
              backgroundColor: '#ff8303',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: '#1b1a17',
                paddingHorizontal: 10,
                fontWeight: '600',
                paddingVertical: 19,
              }}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            style={{
              backgroundColor: '#e56b6b',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                color: '#1b1a17',
                paddingHorizontal: 10,
                fontWeight: '600',
                paddingVertical: 19,
              }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      );
    }}>
    {children}
  </ListItem>
);

export default ListItemBasic;
