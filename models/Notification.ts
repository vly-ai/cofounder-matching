import { Schema, model } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';

/**
 * Notification Schema to handle notifications for users on the platform.
 * This schema includes information about the recipient, the message content, and the type of notification.
 * Notifications are marked as read or unread and can include various types such as matches or messages.
 */

class Notification {
  /**
   * A reference to the user who will receive the notification.
   * This is required to know which user is being notified.
   */
  @prop({ required: true, ref: () => User })
  recipient!: Ref<User>;

  /**
   * The content of the notification message.
   * This is required to inform the user about the notification.
   */
  @prop({ required: true })
  message!: string;

  /**
   * The type of notification (e.g., match, message, like).
   */
  @prop({ required: true, enum: ['match', 'message', 'like'] })
  type!: 'match' | 'message' | 'like';

  /**
   * A boolean indicating whether the notification has been read by the user.
   */
  @prop({ default: false })
  read!: boolean;
}

// Exporting the Notification model
export const NotificationModel = getModelForClass(Notification);
export type NotificationDocument = DocumentType<Notification>;
