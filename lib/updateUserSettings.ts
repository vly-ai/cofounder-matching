import { UserModel } from "../models/User";

/**
 * Function to update the user settings in the database.
 * @param userId - The ID of the user whose settings are being updated.
 * @param settingsData - The new settings data to be updated.
 */
export const updateUserSettings = async (
  userId: string,
  settingsData: object
): Promise<void> => {
  try {
    await UserModel.findByIdAndUpdate(userId, settingsData, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default updateUserSettings;
