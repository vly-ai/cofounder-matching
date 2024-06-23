import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import { ProfileModel } from '../../../models/Profile';
import { verifyUser } from '../../../lib/verifyUser';
import { validateProfileInput } from '../../../lib/validateProfileInput';
import { sanitizeInput } from '../../../lib/sanitizeInput';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === 'POST') {
    const email = verifyUser(req, res);
    if (!email) return;

    const { tagline, bio, businessIdea, skills, location } = req.body;

    // Validate input fields
    const validation = validateProfileInput({ tagline, bio, businessIdea, skills, location });
    if (!validation.valid) {
      res.status(400).json({ error: validation.message });
      return;
    }

    // Sanitize the input data
    const sanitizedData = sanitizeInput({ user: email, tagline, bio, businessIdea, skills, location });

    // Store profile data in the database
    try {
      const newProfile = await ProfileModel.create(sanitizedData);
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
