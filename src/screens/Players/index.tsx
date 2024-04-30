import { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { EmptyList } from '@components/EmptyList';
import { Filter } from '@components/Filter';
import { Alert, FlatList, Keyboard, TextInput } from 'react-native';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { AppError } from '@utils/AppError';
import { PlayerAddByGroup } from '@storage/players/playerAddByGroup';
import { PlayersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerSorageDTO';
import { PlayerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { GroupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
}

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (input.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Digite o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: input,
      team
    }

    try {
      await PlayerAddByGroup(newPlayer, group);

      newPlayerInputRef.current?.blur();
      // Keyboard.dismiss();
      setInput('');

      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Pessoa', error.message);
      }

      return Alert.alert('Nova Pessoa', 'Não foi possível adicionar nova pessoa');
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await PlayersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);

    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');

    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await PlayerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      return Alert.alert('Remover Pessoa', `Não foi possível remover ${playerName}`);
    }
  }

  async function onRemove() {
    try {
      await GroupRemoveByName(group);
      navigation.navigate('group');

    } catch (error) {
      return Alert.alert('Remover grupo', `Não foi possível remover grupo ${group}`);
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover',
      `Deseja remover o grupo ${group}`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => { onRemove() } },
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container >
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle='adicione a galera e separe os times'
      />

      <Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
          value={input}
          onChangeText={setInput}
          inputRef={newPlayerInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon iconName='add' onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {isLoading
        ? <Loading />
        : <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onDelete={() => { handleRemovePlayer(item.name) }}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList
              message='Nenhuma player encontrado'
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
        />}

      <Button
        title='Remover turma'
        type='danger'
        onPress={handleRemoveGroup}
      />

    </Container>
  );
}