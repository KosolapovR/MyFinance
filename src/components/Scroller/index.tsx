import React, {useCallback, useMemo, useState} from 'react';
import {Animated, View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from 'theme';
import ListItemBasic from 'components/ListItemBasic';
import {
  CollapsibleSubHeaderAnimator,
  useCollapsibleSubHeader,
} from 'react-navigation-collapsible';
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
  leftText?: string;
  actions: ScrollerItemActions;
}

interface Props {
  items: ScrollerItem[];
}

const ScrollerContainer = styled.View`
  flex: 1;
`;

const StyledTouchable = styled.TouchableOpacity`
  height: 56px;
`;

const StyledBox = styled.View`
  flex-direction: row;
  flex: 1;
  height: 100%;
  align-items: center;
  border-bottom-color: ${props => props.theme.grayPalette.gray};
  border-bottom-width: 1px;
`;

const Text1 = styled.Text`
  color: ${props => props.theme.grayPalette.text1};
  font-weight: bold;
`;

const Text2 = styled.Text`
  color: ${props => props.theme.grayPalette.text2};
`;

const ITEM_HEIGHT = 56;

const renderItemContent = ({leftText, iconName, label}: ScrollerItem) => (
  <StyledBox>
    {(!leftText || (leftText && iconName)) && (
      <Icon
        name={iconName || 'ghost'}
        size={22}
        color={theme.colors.accent}
        style={{marginRight: 20}}
      />
    )}

    {leftText && !iconName && (
      <Text1 style={{marginRight: 20}}>{leftText}</Text1>
    )}

    <Text2>{label}</Text2>
  </StyledBox>
);

const Item = React.memo(
  ({item}: {item: ScrollerItem}) =>
    item.actions?.onDelete && item.actions?.onEdit ? (
      <View style={{height: ITEM_HEIGHT}}>
        <ListItemBasic
          onPress={item.actions.onPress}
          onEdit={item.actions.onEdit}
          onDelete={item.actions.onDelete}>
          {renderItemContent(item)}
        </ListItemBasic>
      </View>
    ) : (
      <View style={{height: ITEM_HEIGHT}}>
        <StyledTouchable onPress={item.actions.onPress}>
          {renderItemContent(item)}
        </StyledTouchable>
      </View>
    ),
  (prev, next) => {
    return prev.item.label === next.item.label;
  },
);

const renderItem = ({item}: {item: ScrollerItem}) => <Item item={item} />;
const getItemLayout = (
  data: ScrollerItem[] | null | undefined,
  index: number,
) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});
// const getItemCount = (data: ScrollerItem[]) => data.length;
// const getItem = (data: ScrollerItem[], index: number) => data[index];

const Scroller = ({items}: Props) => {
  const [searchingQuery, setSearchingQuery] = useState('');

  const filteredItems = useMemo(
    () =>
      searchingQuery
        ? items.filter(
            item =>
              item.label.toLowerCase().match(searchingQuery.toLowerCase()) ||
              item.leftText?.toLowerCase().match(searchingQuery.toLowerCase()),
          )
        : items,
    [items, searchingQuery],
  );

  const {onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY} =
    useCollapsibleSubHeader();

  const handleSearch = useCallback(
    query => {
      setSearchingQuery(query);
    },
    [setSearchingQuery],
  );

  return (
    <ScrollerContainer>
      {items.length > 0 ? (
        <>
          <Animated.FlatList
            onScroll={onScroll}
            contentContainerStyle={{paddingTop: containerPaddingTop}}
            scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
            removeClippedSubviews
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            initialNumToRender={14}
            getItemLayout={getItemLayout}
            maxToRenderPerBatch={28}
            windowSize={30}
          />
          <CollapsibleSubHeaderAnimator translateY={translateY}>
            <View
              style={{
                width: '100%',
                height: 64,
                backgroundColor: 'white',
              }}>
              <SearchInput onChangeText={handleSearch} />
            </View>
          </CollapsibleSubHeaderAnimator>
        </>
      ) : (
        <View />
      )}
    </ScrollerContainer>
  );
};

export default Scroller;
