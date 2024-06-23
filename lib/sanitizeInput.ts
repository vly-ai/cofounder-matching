import sanitize from 'mongo-sanitize';

export const sanitizeInput = (data: object): object => {
  return sanitize(data);
};

export default sanitizeInput;
