import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import { AnalysisData } from '@humble.xiang/website-description-analysis';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import WebsiteCardIntroductionError from '@/components/website-card-introduction-error';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import { useColorMode } from '@chakra-ui/react';

function AnalysisPage() {
  const queryAnalysisData = { ...useRouter().query } as AnalysisData;
  const websiteCardEmbedColorMode = useRouter().query.colorMode as string;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoading, isError, analysisData } = useAnalysisData(
    queryAnalysisData.title ? undefined : queryAnalysisData.url
  );

  useEffect(() => {
    if (websiteCardEmbedColorMode && websiteCardEmbedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [websiteCardEmbedColorMode, colorMode, toggleColorMode]);

  if (queryAnalysisData.title) return WebsiteCardIntroduction(queryAnalysisData);
  if (isError) return WebsiteCardIntroductionError({ url: queryAnalysisData.url });
  if (isLoading) return WebsiteCardIntroductionLoading();
  if (analysisData) return WebsiteCardIntroduction(analysisData);
  return WebsiteCardIntroductionLoading();
}

const analysisDataFetcher: Fetcher<AnalysisData, string> = url => fetch(url).then(res => res.json());

function useAnalysisData(url: string | undefined) {
  if (url) console.info(`useAnalysisData with url:${url}`);
  const { data, error } = useSWR(url ? `/api/analysis?url=${url}` : null, analysisDataFetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  if (error) console.error(error);
  return {
    analysisData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default AnalysisPage;
