import React from 'react';
import {Text, View, VirtualizedList} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'theme';
import ListItemBasic from 'components/ListItemBasic';
import SearchInput from 'components/inputs/SearchInput';

interface ScrollerItemActions {
  onDelete?: (v?: number | string) => void;
  onEdit?: (v?: number | string) => Promise<void>;
  onPress: () => void;
}

export interface ScrollerItem {
  id: string;
  label: string;
  iconName?: string;
  actions: ScrollerItemActions;
}

interface Props {
  items: ScrollerItem[];
}

const ScrollerContainer = styled.View`
  flex: 1;
`;

const StyledTouchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 56px;
  padding-left: ${props => props.theme.sizes.md};
  padding-right: ${props => props.theme.sizes.md};
  border-radius: ${props => props.theme.sizes.xs};
`;

const StyledBox = styled.View`
  flex-direction: row;
  flex: 1;
  height: 100%;
  align-items: center;
  border-bottom-color: ${props => props.theme.grayPalette.gray};
  border-bottom-width: 1px;
`;

const Text2 = styled.Text`
  color: ${props => props.theme.grayPalette.text2};
`;

const ITEM_HEIGHT = 56;

const Item = React.memo(
  ({item: {actions, iconName, label}}: {item: ScrollerItem}) =>
    actions?.onDelete && actions?.onEdit ? (
      <View style={{height: ITEM_HEIGHT}}>
        <ListItemBasic
          onPress={actions.onPress}
          onEdit={actions.onEdit}
          onDelete={actions.onDelete}>
          <StyledBox>
            <Icon
              name={iconName || 'ghost'}
              size={22}
              color={theme.colors.accent}
              style={{marginRight: 20}}
            />
            <Text2>{label}</Text2>
          </StyledBox>
        </ListItemBasic>
      </View>
    ) : (
      <StyledTouchable onPress={actions.onPress}>
        <Icon name={iconName || 'ghost'} color={theme.colors.accent} />
        <Text>{label}</Text>
      </StyledTouchable>
    ),
  (prev, next) => {
    return prev.item.label === next.item.label;
  },
);

const Scroller = ({items}: Props) => {
  const getItemLayout = (data: ScrollerItem, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const getItemCount = (data: ScrollerItem[]) => data.length;
  const getItem = (data: ScrollerItem[], index: number) => data[index];

  return (
    <ScrollerContainer>
      <SearchInput onChangeText={() => {}} />
      {items.length > 0 ? (
        <VirtualizedList
          removeClippedSubviews
          data={items}
          renderItem={({item}: {item: ScrollerItem}) => <Item item={item} />}
          keyExtractor={item => item.id}
          initialNumToRender={14}
          getItemCount={getItemCount}
          getItemLayout={getItemLayout}
          getItem={getItem}
          maxToRenderPerBatch={28}
          windowSize={30}
        />
      ) : (
        <View />
      )}
    </ScrollerContainer>
  );
};

export default Scroller;
