import { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';
import AnalysisFactory from '@humble.xiang/website-description-analysis';

const analysisDataCache = new NodeCache({ stdTTL: 60 * 60 * 24 * 3 });

const analysis = async (_: NextApiRequest, res: NextApiResponse) => {
  if (analysisDataCache.get(_.query.url as string)) {
    res.status(200).json(analysisDataCache.get(_.query.url as string));
  } else {
    const analysisData = (await AnalysisFactory.create(_.query.url as string)).analysis();
    analysisDataCache.set(_.query.url as string, analysisData);
    console.info(`set ${_.query.url} to cache`);
    res.status(200).json(analysisData);
  }
};

export default analysis;
