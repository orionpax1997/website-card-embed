import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import { AnalysisData } from '@humble.xiang/website-description-analysis';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import { ColorModeScript } from '@chakra-ui/react';

function AnalysisPage() {
  const url = useRouter().query.url as string;
  const colorMode = useRouter().query.colorMode as string;
  const { isLoading, analysisData } = useAnalysisData(url);
  return (
    <>
      <ColorModeScript initialColorMode={colorMode === 'dark' ? 'dark' : colorMode === 'light' ? 'light' : 'system'} />
      {isLoading
        ? WebsiteCardIntroductionLoading()
        : analysisData
        ? WebsiteCardIntroduction(analysisData)
        : WebsiteCardIntroductionLoading()}
    </>
  );
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
