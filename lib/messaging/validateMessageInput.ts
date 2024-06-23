interface MessageInput {
  sender: string;
  recipient: string;
  content: string;
  conversationId: string;
}

export const validateMessageInput = (data: MessageInput): { valid: boolean; message?: string } => {
  if (!data.sender || typeof data.sender !== 'string') {
    return { valid: false, message: 'Sender is required and must be a string' };
  }
  if (!data.recipient || typeof data.recipient !== 'string') {
    return { valid: false, message: 'Recipient is required and must be a string' };
  }
  if (!data.content || typeof data.content !== 'string') {
    return { valid: false, message: 'Content is required and must be a string'  };
  }
  if (!data.conversationId || typeof data.conversationId !== 'string') {
    return { valid: false, message: 'Conversation ID is required and must be a string'  };
  }
  return { valid: true };
};

export default validateMessageInput;
