import { Schema, Types } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './User';

/**
 * Profile Schema storing detailed profile information for each user.
 * This schema helps other users understand the background, skills, and business ideas of a potential cofounder.
 */

class Profile {
  /**
   * A reference to the user's account in the User schema.
   */
  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  /**
   * A brief tagline that summarizes the user.
   */
  @prop()
  tagline?: string;

  /**
   * Detailed biography of the user.
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
}

// Exporting the Profile model
export const ProfileModel = getModelForClass(Profile);
export type ProfileDocument = DocumentType<Profile>;
