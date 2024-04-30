import React from 'react';

import { Container, Logo, BackIcon, BackButton } from './styles';

import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  return (
    <Container>

      {showBackButton &&
        <BackButton onPress={() => navigation.navigate('group')} >
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Container>
  );
}