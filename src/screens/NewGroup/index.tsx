import React, { useState } from 'react';

import { Container, Content, Icon } from './styles';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroupName] = useState('');

  async function handleCreateGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message);
      }

      return Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='crie a turma para adicionar as pessoas'
        />

        <Input
          placeholder='Nome da turma'
          value={group}
          onChangeText={setGroupName}
        />

        <Button
          title="Criar"
          style={{ marginTop: 16 }}
          onPress={handleCreateGroup}
        />
      </Content>

    </Container>
  );
}