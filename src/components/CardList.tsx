import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState('');

  function handleSelectedViewImage(image: string) {
    setSelectedImage(image);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={40}>
        {cards.map(data => {
          return <Card key={data.id} data={data} viewImage={handleSelectedViewImage} />
        })}
      </SimpleGrid>

      {isOpen &&
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImage} />
      }
    </>
  );
}
