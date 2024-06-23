import { Schema, model } from 'mongoose';
import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

/**
 * User Schema representing the user on the platform. 
 * This schema includes essential fields for user authentication, personal information, and settings.
 * Users can manage their profile, preferences, and notifications using this schema.
 */

class User {
  /**
   * The user's email address. This is a unique and required field.
   */
  @prop({ required: true, unique: true })
  email!: string;

  /**
   * The user's password, which is hashed securely.
   */
  @prop({ required: true })
  password!: string;

  /**
   * The user's full name.
   */
  @prop({ required: true })
  name!: string;

  /**
   * A URL to the user's avatar image.
   */
  @prop()
  avatar?: string;

  /**
   * A brief biography of the user.
   */
  @prop()
  bio?: string;

  /**
   * Information about the user's business idea.
   */
  @prop()
  businessIdea?: string;

  /**
   * An array of skills associated with the user.
   */
  @prop({ type: () => [String] })
  skills?: string[];

  /**
   * The user's geographical location.
   */
  @prop()
  location?: string;

  /**
   * A setting for the user's privacy, either 'public' or 'private'.
   */
  @prop({ enum: ['public', 'private'] })
  privacy?: 'public' | 'private';

  /**
   * An object containing notification preferences for email, SMS, and push notifications.
   */
  @prop({ type: () => NotificationSettings })
  notificationsSettings?: NotificationSettings;

  /**
   * Method to hash password before saving user document
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

/**
 * Nested Schema to handle notification preferences.
 */
class NotificationSettings {
  @prop({ default: true })
  email?: boolean;

  @prop({ default: true })
  sms?: boolean;

  @prop({ default: true })
  pushNotifications?: boolean;
}

// Exporting the User model
export const UserModel = getModelForClass(User);
export type UserDocument = DocumentType<User>;
export type NotificationSettingsDocument = DocumentType<NotificationSettings>;
