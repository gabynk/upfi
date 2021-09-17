import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {

  async function getImages({ pageParam = null }) {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam
      }
    })

    return response.data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages,
    {
      getNextPageParam: (lastPage, pages) => lastPage !== undefined ? lastPage?.after : null
    }
  );

  const formattedData = useMemo(() => {
    if (!data) {
      return []
    }

    const formatted = data.pages.map(images => images.data).flat();

    return formatted
  }, [data]);

  return isLoading ? <Loading />
    : isError ? <Error />
      : (
        <>
          <Header />

          <Box maxW={1120} px={20} mx="auto" my={20}>
            <CardList cards={formattedData} />

            {hasNextPage && (
              <Button
                mt="10"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
              </Button>
            )}
          </Box>
        </>
      );
}
