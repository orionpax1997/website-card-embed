import { Center, Flex, VStack, Skeleton, LinkOverlay } from '@chakra-ui/react';

const WebsiteCardIntroductionLoading = ({ hasImage, url }: { hasImage: boolean; url: string }) => {
  return (
    <Center>
      <Flex h="120px" maxW="1200px" borderWidth="1px" borderRadius="lg" width="100%">
        <VStack align="stretch" w={hasImage ? '60%' : '100%'} p="15px">
          <LinkOverlay href={url} target="_blank">
            <Skeleton height="20px" />
          </LinkOverlay>
          <Skeleton height="40px" />
          <Skeleton height="16px" />
        </VStack>
        {hasImage && <Skeleton w="40%" h="100%" />}
      </Flex>
    </Center>
  );
};

export default WebsiteCardIntroductionLoading;
