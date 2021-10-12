import React from 'react';
import {Text, View} from 'react-native';
import ListItem from 'components/ListItem';
import {TouchableOpacity} from 'react-native';
import {theme} from 'theme/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

interface Props {
  onPress: () => void;
  children: Element;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void> | void;
}

const StyledEditBox = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.sizes.lg};
  border-width: 1px;
  border-color: ${props => props.theme.colors.accent};
  background-color: ${props => props.theme.softPalette.softyellow};
  margin-right: ${props => props.theme.sizes.xs};
`;

const ListItemBasic = ({children, onEdit, onDelete, ...rest}: Props) => (
  <ListItem
    {...rest}
    rightSwipeActions={() => {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 4,
          }}>
          <StyledEditBox onPress={onEdit}>
            <Icon
              name={'pencil'}
              size={24}
              color={theme.colors.accent}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            />
          </StyledEditBox>
          <StyledEditBox onPress={onDelete}>
            <Icon
              name={'delete'}
              size={24}
              color={theme.colors.accent}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            />
          </StyledEditBox>
        </View>
      );
    }}>
    {children}
  </ListItem>
);

export default ListItemBasic;
