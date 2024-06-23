import { ConversationModel } from '../models/Conversation';

const getConversation = async (userId: string) => {
  try {
    const conversations = await ConversationModel.find({ participants: userId })
      .populate('participants', 'name avatar')
      .populate('messages');
    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getConversation;
