import { Schema, model, Types } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';

/**
 * Activity Schema to track user activities on the platform.
 * This includes matches, messages, and updates. Activities are timestamped and categorized by type
 * to provide a detailed record of user interactions. These activities can be displayed on the user's dashboard.
 */

class Activity {
  /**
   * A reference to the user who performed the activity.
   */
  @prop({ required: true, ref: 'User' })
  user!: Ref<Schema.Types.ObjectId>;

  /**
   * The type of activity performed (e.g., match, message, like).
   */
  @prop({ required: true, enum: ['match', 'message', 'like', 'update'] })
  type!: 'match' | 'message' | 'like' | 'update';

  /**
   * A short description of the activity.
   */
  @prop({ required: true })
  description!: string;

  /**
   * Timestamp of when the activity was created.
   */
  @prop({ default: Date.now })
  createdAt!: Date;
}

// Exporting the Activity model
export const ActivityModel = getModelForClass(Activity);
export type ActivityDocument = DocumentType<Activity>;
