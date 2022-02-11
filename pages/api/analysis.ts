import { NextApiRequest, NextApiResponse } from 'next';
import AnalysisFactory from '@humble.xiang/website-description-analysis';

const analysis = async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json((await AnalysisFactory.create(_.query.url as string)).analysis());
};

export default analysis;
