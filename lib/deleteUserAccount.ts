import { UserModel } from "../models/User";
import { ProfileModel } from "../models/Profile";
import { ActivityModel } from "../models/Activity";
import { NotificationModel } from "../models/Notification";
import { ConversationModel } from "../models/Conversation";
import { MessageModel } from "../models/Message";

/**
 * Function to delete a user account and associated data from the database.
 * @param userId - The ID of the user whose account is being deleted.
 */
export const deleteUserAccount = async (userId: string): Promise<void> => {
  try {
    // Deleting associated data
    await ProfileModel.deleteOne({ user: userId });
    await ActivityModel.deleteMany({ user: userId });
    await NotificationModel.deleteMany({ recipient: userId });
    await ConversationModel.updateMany(
      { participants: userId },
      { $pull: { participants: userId } }
    );
    await MessageModel.deleteMany({ $or: [{ sender: userId }, { recipient: userId }] });

    // Deleting the user
    await UserModel.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteUserAccount;
