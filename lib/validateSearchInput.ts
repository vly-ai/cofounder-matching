interface SearchInput {
  industry?: string;
  location?: string;
  stageOfProject?: string;
  skills?: string[];
}

export const validateSearchInput = (data: SearchInput): { valid: boolean; message?: string } => {
  if (data.industry && typeof data.industry !== 'string') {
    return { valid: false, message: 'Industry must be a string' };
  }
  if (data.location && typeof data.location !== 'string') {
    return { valid: false, message: 'Location must be a string' };
  }
  if (data.stageOfProject && typeof data.stageOfProject !== 'string') {
    return { valid: false, message: 'Stage of project must be a string' };
  }
  if (data.skills && !Array.isArray(data.skills)) {
    return { valid: false, message: 'Skills must be an array' };
  }
  if (data.skills && data.skills.some(skill => typeof skill !== 'string')) {
    return { valid: false, message: 'Each skill must be a string' };
  }
  return { valid: true };
};

export default validateSearchInput;
