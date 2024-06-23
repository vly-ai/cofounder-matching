interface ProfileInput {
  tagline?: string;
  bio?: string;
  businessIdea?: string;
  skills?: string[];
  location?: string;
}

export const validateProfileInput = (data: ProfileInput): { valid: boolean; message?: string } => {
  if (typeof data.bio !== 'string' || !data.bio.trim()) {
    return { valid: false, message: 'Bio is required and must be a string' };
  }
  if (typeof data.businessIdea !== 'string' || !data.businessIdea.trim()) {
    return { valid: false, message: 'Business idea is required and must be a string' };
  }
  if (!Array.isArray(data.skills) || data.skills.some(skill => typeof skill !== 'string')) {
    return { valid: false, message: 'Skills must be an array of strings' };
  }
  if (typeof data.location !== 'string' || !data.location.trim()) {
    return { valid: false, message: 'Location is required and must be a string' };
  }
  return { valid: true };
};

export default validateProfileInput;
