import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import { AnalysisData } from '@orionpax/website-description-analysis';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import WebsiteCardIntroductionMobile from '@/components/website-card-introduction-mobile';
import WebsiteCardIntroductionError from '@/components/website-card-introduction-error';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import { useColorMode } from '@chakra-ui/react';

function AnalysisPage() {
  const queryAnalysisData = { ...useRouter().query } as AnalysisData;
  const websiteCardEmbedColorMode = useRouter().query.colorMode as string;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoading, isError, analysisData } = useAnalysisData(
    queryAnalysisData.title ? undefined : queryAnalysisData.url
  );
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (websiteCardEmbedColorMode && websiteCardEmbedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [websiteCardEmbedColorMode, colorMode, toggleColorMode]);

  useEffect(() => {
    const handleLoad = () => {
      setWidth(window.innerWidth);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    // 若DOM已加载完成，直接执行
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      document.addEventListener('DOMContentLoaded', handleLoad);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleLoad);
    };
  }, []);

  if (queryAnalysisData.title)
    return width < 620 ? (
      <WebsiteCardIntroductionMobile {...queryAnalysisData} />
    ) : (
      <WebsiteCardIntroduction {...queryAnalysisData} />
    );
  if (isError) return <WebsiteCardIntroductionError url={queryAnalysisData.url} />;
  if (isLoading) return <WebsiteCardIntroductionLoading hasImage={width >= 620} />;
  if (analysisData)
    return width < 620 ? (
      <WebsiteCardIntroductionMobile {...analysisData} />
    ) : (
      <WebsiteCardIntroduction {...analysisData} />
    );
  return <WebsiteCardIntroductionLoading hasImage={width >= 620} />;
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
