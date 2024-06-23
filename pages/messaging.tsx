{"import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { UserDocument } from '../models/User';
import { ConversationDocument } from '../models/Conversation';
import { MessageDocument } from '../models/Message';
import { useUserSession } from '../lib/authUtils';
import { Navbar, NavbarItem, NavbarSection, NavbarDivider, NavbarSpacer } from '@/components/navbar';
import { Sidebar, SidebarSection, SidebarItem, SidebarLabel } from '@/components/sidebar';
import { Avatar } from '@/components/avatar';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Text } from '@/components/text';

const MessagingPage: React.FC = () => {
  const { data: session } = useUserSession();
  const [conversations, setConversations] = useState<ConversationDocument[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationDocument | null>(null);
  const [messages, setMessages] = useState<MessageDocument[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messaging/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchChatHistory = async (conversationId: string) => {
    try {
      const response = await axios.get(`/api/messaging/chat-history/${conversationId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    try {
      const response = await axios.post('/api/messaging/send-message', {
        recipient: selectedConversation.participants.find(p => p._id !== session?.user.id)?._id,
        content: newMessage,
        conversationId: selectedConversation._id,
      });
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchConversations();
    }
  }, [session]);

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 flex justify-between items-center shadow-md">
        <Navbar>
          <NavbarSection>
            <NavbarItem href="/dashboard">Dashboard</NavbarItem>
            <NavbarItem href="/search-match">Search/Match</NavbarItem>
            <NavbarItem href="/messaging">Messages</NavbarItem>
            <NavbarItem href="/settings">Settings</NavbarItem>
          </NavbarSection>
        </Navbar>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/4 p-4 border-r overflow-y-auto">
          <Input className="mb-4" placeholder="Search" />
          <Sidebar>
            <SidebarSection>
              {conversations.map(convo => (
                <SidebarItem key={convo._id} onClick={() => { setSelectedConversation(convo); fetchChatHistory(convo._id); }}>
                  <Avatar src={convo.participants.find(p => p._id !== session?.user.id)?.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <SidebarLabel>{convo.participants.find(p => p._id !== session?.user.id)?.name}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
          </Sidebar>
        </aside>
        <main className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar src={selectedConversation.participants.find(p => p._id !== session?.user.id)?.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  <Text>{selectedConversation.participants.find(p => p._id !== session?.user.id)?.name}</Text>
                </div>
                <Link href={`/profile/${selectedConversation.participants.find(p => p._id !== session?.user.id)?._id}`}>View Profile</Link>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map(message => (
                  <div key={message._id} className="mb-4">
                    <Text className="font-bold">{message.sender === session?.user.id ? 'You' : message.sender}</Text>
                    <Text>{message.content}</Text>
                    <Text className="text-xs text-gray-500">{new Date(message.sentAt).toLocaleString()}</Text>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t flex items-center">
                <Input
                  className="flex-1"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button className="ml-2" onClick={handleSendMessage}>Send</Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <Text>Select a conversation to start chatting</Text>
            </div>
          )}
        </main>
      </div>
      <footer className="p-4 border-t">
        <div className="flex justify-between">
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default MessagingPage;
"}