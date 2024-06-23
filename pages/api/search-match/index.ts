import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import { UserModel } from '../../../models/User';
import verifySession from '../../../lib/verifySession';
import validateSearchInput from '../../../lib/validateSearchInput';
import sanitize from '../../../lib/sanitizeInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const { industry, location, stageOfProject, skills } = req.body;

    // Validate input fields
    const validation = validateSearchInput({ industry, location, stageOfProject, skills });
    if (!validation.valid) {
      res.status(400).json({ error: validation.message });
      return;
    }

    // Sanitize the input data
    const sanitizedData = sanitize({ industry, location, stageOfProject, skills });

    // Fetch filtered user profiles from the database
    try {
      const users = await UserModel.find(sanitizedData).select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
