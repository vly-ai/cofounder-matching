interface SettingsInput {
  name?: string;
  email?: string;
  password?: string;
  privacy?: "public" | "private";
  notificationsSettings?: {
    email?: boolean;
    sms?: boolean;
    pushNotifications?: boolean;
  };
}

/**
 * Function to validate the input data for updating user settings.
 * @param data - The input data to be validated.
 * @returns An object containing a valid boolean and an optional message.
 */
export const validateSettingsInput = (
  data: SettingsInput
): { valid: boolean; message?: string } => {
  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    return { valid: false, message: "Name is required and must be a string" };
  }
  if (
    !data.email ||
    typeof data.email !== "string" ||
    !data.email.trim() ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)
  ) {
    return { valid: false, message: "Valid email is required" };
  }
  if (data.password && typeof data.password !== "string") {
    return { valid: false, message: "Password must be a string" };
  }
  if (data.privacy && !["public", "private"].includes(data.privacy)) {
    return { valid: false, message: "Privacy setting must be either 'public' or 'private'" };
  }
  if (
    data.notificationsSettings &&
    (typeof data.notificationsSettings.email !== "boolean" ||
      typeof data.notificationsSettings.sms !== "boolean" ||
      typeof data.notificationsSettings.pushNotifications !== "boolean")
  ) {
    return { valid: false, message: "Notification settings must be boolean values" };
  }
  return { valid: true };
};

export default validateSettingsInput;
