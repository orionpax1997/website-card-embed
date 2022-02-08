import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import { AnalysisData } from '../utils/analysis';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import WebsiteCardIntroduction from '@/components/website-card-introduction';

function AnalysisPage() {
  const url = useRouter().query.url as string;
  const { isLoading, analysisData } = useAnalysisData(url);
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
