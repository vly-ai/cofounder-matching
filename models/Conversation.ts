import { Schema, model, Types } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';
import { Message } from './Message';

/**
 * Conversation Schema representing a conversation between users on the platform.
 * Each conversation includes participants and a list of messages. 
 * This schema helps in organizing and storing chat history between matched users.
 */

class Conversation {
  /**
   * An array of references to User models representing the participants in the conversation.
   */
  @prop({ ref: () => User, type: () => [Schema.Types.ObjectId], required: true })
  participants!: Ref<User>[];

  /**
   * An array of references to Message models containing the messages exchanged in the conversation.
   */
  @prop({ ref: () => Message, type: () => [Schema.Types.ObjectId], default: [] })
  messages!: Ref<Message>[];
}

// Exporting the Conversation model
export const ConversationModel = getModelForClass(Conversation);
export type ConversationDocument = DocumentType<Conversation>;
