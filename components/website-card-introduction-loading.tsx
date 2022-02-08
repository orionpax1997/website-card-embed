import { Center, Flex, VStack, Skeleton } from '@chakra-ui/react';

const WebsiteCardIntroductionLoading = () => {
  return (
    <Center>
      <Flex h="120px" maxW="1200px" borderWidth="1px" borderRadius="lg" w="800px">
        <VStack align="stretch" w="60%" p="15px">
          <Skeleton height="20px" />
          <Skeleton height="40px" />
          <Skeleton height="16px" />
        </VStack>
        <Skeleton w="40%" h="100%" />
      </Flex>
    </Center>
  );
};

export default WebsiteCardIntroductionLoading;
