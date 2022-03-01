import Head from 'next/head';
import { useState } from 'react';
import { Box, Center, HStack, VStack, Image, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { AnalysisData } from '@humble.xiang/website-description-analysis';

const WebsiteCardIntroductionMobile = ({ url, title, description, favicon }: AnalysisData) => {
  const [faviconShow, setFaviconShow] = useState(!!favicon);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <Center>
        <LinkBox
          w="100%"
          maxW="620px"
          borderWidth="1px"
          borderRadius="lg"
          _hover={{ backgroundColor: 'rgba(55, 53, 47, 0.08)' }}
        >
          <VStack alignItems="stretch" justifyContent="space-between" p="15px">
            <Box fontSize="sm" fontWeight="semibold" as="h4" isTruncated>
              <LinkOverlay href={url} target="_blank">
                {title}
              </LinkOverlay>
            </Box>
            <Box>
              <Text fontSize="xs" color="gray.500" noOfLines={2}>
                {description}
              </Text>
            </Box>
            <HStack spacing="10px">
              {faviconShow && (
                <Image
                  w="16px"
                  h="16px"
                  borderRadius="sm"
                  src={favicon}
                  alt="website card icon"
                  onError={() => setFaviconShow(false)}
                />
              )}
              <Text fontSize="xs" isTruncated>
                {url}
              </Text>
            </HStack>
          </VStack>
        </LinkBox>
      </Center>
    </>
  );
};

export default WebsiteCardIntroductionMobile;
