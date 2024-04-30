import React from 'react';
import { View } from 'react-native';

import { Container, Message } from './styles';

type Props = {
  message: string;
}

export function EmptyList({message}: Props) {
  return (
    <Container >
      <Message>{message}</Message>
    </Container>
  );
}