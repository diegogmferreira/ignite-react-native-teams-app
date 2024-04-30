
import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Icon, Name } from './styles';

type Props = {
  name: string;
  onDelete: () => void;
}

export function PlayerCard({ name, onDelete }: Props) {
  return (
    <Container >
      <Icon name='person' />
      <Name>{name}</Name>

      <ButtonIcon
        iconName='close'
        type='danger'
        onPress={onDelete}
      />
    </Container>
  );
}