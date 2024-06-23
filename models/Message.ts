import { Schema, model } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';

/**
 * Message Schema representing individual messages sent between users in a conversation.
 * Each message contains the sender, recipient, content, and a timestamp.
 * Messages are linked to the Conversation schema.
 */

class Message {
  /**
   * A reference to the user who sent the message. Uses ObjectId from the User model.
   */
  @prop({ required: true, ref: 'User' })
  sender!: Ref<User>;

  /**
   * A reference to the user who received the message. Uses ObjectId from the User model.
   */
  @prop({ required: true, ref: 'User' })
  recipient!: Ref<User>;

  /**
   * The content of the message.
   */
  @prop({ required: true })
  content!: string;

  /**
   * Timestamp of when the message was sent. Defaults to the current date/time.
   */
  @prop({ default: () => new Date() })
  sentAt!: Date;
}

// Exporting the Message model
export const MessageModel = getModelForClass(Message);
export type MessageDocument = DocumentType<Message>;
