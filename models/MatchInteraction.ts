import { Schema, model } from 'mongoose';
import { DocumentType, getModelForClass, prop, Ref } from '@typegoose/typegoose';

/**
 * MatchInteraction Schema
 * 
 * This schema records interactions, like or pass, between users. It helps in managing the matching mechanism
 * by keeping track of user interests and determining mutual matches. Each interaction includes the users involved
 * and the type of interaction.
 */

class MatchInteraction {
  /**
   * A reference to the user initiating the interaction.
   */
  @prop({ required: true, ref: 'User' })
  userA!: Ref<User>;

  /**
   * A reference to the user receiving the interaction.
   */
  @prop({ required: true, ref: 'User' })
  userB!: Ref<User>;

  /**
   * The type of interaction (like or pass).
   */
  @prop({ required: true, enum: ['like', 'pass'] })
  interactionType!: 'like' | 'pass';

  /**
   * A boolean indicating if there's a mutual 'like' forming a match.
   */
  @prop({ required: true, default: false })
  mutualLike!: boolean;
}

// Exporting the MatchInteraction model
export const MatchInteractionModel = getModelForClass(MatchInteraction);
export type MatchInteractionDocument = DocumentType<MatchInteraction>;
