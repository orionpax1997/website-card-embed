import Head from 'next/head';
import { useState } from 'react';
import { Box, Center, Flex, HStack, VStack, Image, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { AnalysisData } from '@humble.xiang/website-description-analysis';

const WebsiteCardIntroduction = ({ url, title, description, image, favicon }: AnalysisData) => {
  const [faviconShow, setFaviconShow] = useState(!!favicon);
  const [imageShow, setImageShow] = useState(!!image);
  const [loading, setLoading] = useState(!!image);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <Center className={!imageShow || !loading ? 'completed' : undefined}>
        <LinkBox
          w="100%"
          maxW="1200px"
          minW="620px"
          borderWidth="1px"
          borderRadius="lg"
          _hover={{ backgroundColor: 'rgba(55, 53, 47, 0.08)' }}
        >
          <Flex h="120px">
            <VStack alignItems="stretch" justifyContent="space-between" w={imageShow ? '60%' : '100%'} p="15px">
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
            {imageShow && (
              <Image
                w="40%"
                h="100%"
                borderRadius="sm"
                objectFit="cover"
                src={image}
                alt="website card image"
                onLoad={() => setLoading(false)}
                onError={() => setImageShow(false)}
              />
            )}
          </Flex>
        </LinkBox>
      </Center>
    </>
  );
};

export default WebsiteCardIntroduction;
