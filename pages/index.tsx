import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import { AnalysisData } from '@humble.xiang/website-description-analysis';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import { useColorMode } from '@chakra-ui/react';

function AnalysisPage() {
  const url = useRouter().query.url as string;
  const websiteCardEmbedColorMode = useRouter().query.colorMode as string;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoading, analysisData } = useAnalysisData(url);

  useEffect(() => {
    if (websiteCardEmbedColorMode && websiteCardEmbedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [websiteCardEmbedColorMode, colorMode, toggleColorMode]);

  if (isLoading) return WebsiteCardIntroductionLoading();
  if (analysisData) return WebsiteCardIntroduction(analysisData);
  return WebsiteCardIntroductionLoading();
}

const analysisDataFetcher: Fetcher<AnalysisData, string> = url => fetch(url).then(res => res.json());

function useAnalysisData(url: string) {
  if (url) console.info(`useAnalysisData with url:${url}`);
  const { data, error } = useSWR(url ? `/api/analysis?url=${url}` : null, analysisDataFetcher);
  if (error) console.error(error);
  return {
    analysisData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default AnalysisPage;
