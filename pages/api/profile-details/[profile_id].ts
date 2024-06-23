import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../../lib/api/profileDetails';

const profileDetailsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};

export default profileDetailsHandler;