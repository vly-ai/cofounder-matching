import sanitize from "mongo-sanitize";

/**
 * Function to sanitize the input data for updating user settings.
 * @param data - The input data to be sanitized.
 * @returns The sanitized input data.
 */
export const sanitizeSettingsInput = (data: object): object => {
  return sanitize(data);
};

export default sanitizeSettingsInput;
