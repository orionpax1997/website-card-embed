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
        <Flex h="120px">
          <VStack alignItems="stretch" justifyContent="space-between" w="100%" p="15px">
            <Box fontSize="sm" fontWeight="semibold" as="h4" isTruncated>
              <LinkOverlay href={url} target="_blank">
                很抱歉, 嵌入网址的描述信息无法正常解析
              </LinkOverlay>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500" noOfLines={2}>
                请直接点击卡片访问原网页查看。或者您可以补充更多参数, 来跳过解析直接展示静态卡片。
              </Text>
            </Box>
            <HStack spacing="10px">
              <Text fontSize="xs" isTruncated>
                {url}
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </LinkBox>
    </Center>
  );
};

export default WebsiteCardIntroductionError;
