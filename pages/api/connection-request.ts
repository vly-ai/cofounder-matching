import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../lib/api/connectionRequest';

const connectionRequestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};

export default connectionRequestHandler;