import { Box, Center, Flex, HStack, VStack, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';

const WebsiteCardIntroductionError = ({ url }: { url: string }) => {
  return (
    <Center>
      <LinkBox
        w="100%"
        maxW="1200px"
        minW="600px"
        borderWidth="1px"
        borderRadius="lg"
        _hover={{ backgroundColor: 'rgba(55, 53, 47, 0.08)' }}
      >
        <Flex>
          <VStack alignItems="stretch" justifyContent="space-between" w="100%" p="15px">
            <Box fontSize="sm" fontWeight="semibold" as="h4" isTruncated>
              <LinkOverlay href={url} target="_blank">
                {url}
              </LinkOverlay>
            </Box>
          </VStack>
        </Flex>
      </LinkBox>
    </Center>
  );
};

export default WebsiteCardIntroductionError;
