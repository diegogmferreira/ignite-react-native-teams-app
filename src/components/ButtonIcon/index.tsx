import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import { ButtonIconTypeStyleProps, Container, Icon } from './styles';

type Props = TouchableOpacityProps & {
  type?: ButtonIconTypeStyleProps;
  iconName: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ iconName, type = 'primary', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={iconName} type={type} />
    </Container>
  );
}