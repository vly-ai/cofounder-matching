import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../lib/api/sendMessage';

const sendMessageHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};

export default sendMessageHandler;