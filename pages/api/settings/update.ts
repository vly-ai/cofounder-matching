import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import verifySession from '../../../lib/verifySession';
import validateSettingsInput from '../../../lib/validateSettingsInput';
import sanitizeSettingsInput from '../../../lib/sanitizeSettingsInput';
import updateUserSettings from '../../../lib/updateUserSettings';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  if (req.method === 'POST') {
    const email = verifySession(req, res);
    if (!email) return;

    const settingsData = req.body;

    // Validate input fields
    const validation = validateSettingsInput(settingsData);
    if (!validation.valid) {
      res.status(400).json({ error: validation.message });
      return;
    }

    // Sanitize the input data
    const sanitizedData = sanitizeSettingsInput(settingsData);

    try {
      const user = await UserModel.findOne({ email }).select('_id');
      if (!user) {
        throw new Error('User not found');
      }
      await updateUserSettings(user._id, sanitizedData);
      res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
