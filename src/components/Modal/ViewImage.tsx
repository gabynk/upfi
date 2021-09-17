import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.800"
        w="auto"
        maxW="900px"
      >
        <ModalBody p="0">
          <Image
            src={imgUrl}
            maxH="600px"
            objectFit="cover"
          />
        </ModalBody>

        <ModalFooter h="8" p="10px">
          <Link href={imgUrl} isExternal mr="auto" fontSize="sm" color="pGray.50" >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
