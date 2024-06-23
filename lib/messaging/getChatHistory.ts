import { ConversationModel } from '../models/Conversation';
import { Types } from 'mongoose';

const getChatHistory = async (conversationId: string) => {
  try {
    if (!Types.ObjectId.isValid(conversationId)) {
      throw new Error('Invalid conversation ID');
    }
    const conversation = await ConversationModel.findById(conversationId).populate('messages');
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return conversation;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getChatHistory;
