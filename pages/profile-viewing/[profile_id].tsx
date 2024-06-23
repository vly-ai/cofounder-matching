import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { Avatar } from '@/components/avatar';
import { Heading } from '@/components/heading';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar';
import { SidebarLayout } from '@/components/sidebar-layout';
import { UserDocument, ProfileDocument } from '@/models';

interface DetailedProfile {
  user: UserDocument;
  profile: ProfileDocument;
}

const ProfileViewingPage = () => {
  const [profileData, setProfileData] = useState<DetailedProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { profile_id } = router.query;

  useEffect(() => {
    if (profile_id) {
      axios.get(`/api/profile-details/${profile_id}`)
        .then(response => {
          setProfileData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError('Profile not found or an error occurred.');
          setIsLoading(false);
        });
    }
  }, [profile_id]);

  const handleSendConnectionRequest = async () => {
    try {
      await axios.post('/api/connection-request', { recipientProfileId: profile_id });
      alert('Connection request sent successfully.');
    } catch (error) {
      alert('Failed to send connection request.');
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('/api/send-message', {
        recipient: profile_id,
        content: 'Hello, I would like to connect!',
        conversationId: 'SomeConversationId' // This should be dynamically configured in production
      });
      router.push('/messages');
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSection>
            <NavbarItem href="/dashboard">Logo</NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/dashboard">Dashboard</NavbarItem>
            <NavbarItem href="/search-match">Search/Match</NavbarItem>
            <NavbarItem href="/messages">Messages</NavbarItem>
            <NavbarItem href="/settings">Settings</NavbarItem>
          </NavbarSection>
        </Navbar>
      }
    >
      <main className="flex-grow p-4">
        <section className="flex flex-col items-center">
          <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
            <div className="flex items-center">
              <Avatar src={profileData?.profile.avatar || '/default-avatar.png'} className="w-24 h-24 rounded-full mr-4" />
              <div>
                <Heading level={1} className="text-xl font-bold">{profileData?.user.name}</Heading>
                <Text className="text-gray-500">{profileData?.profile.tagline}</Text>
                <Text className="text-gray-500">{profileData?.profile.location}</Text>
              </div>
            </div>

            <div className="mt-4">
              <Heading level={2} className="text-lg font-bold">Bio</Heading>
              <Text>{profileData?.profile.bio}</Text>
            </div>

            <div className="mt-4">
              <Heading level={2} className="text-lg font-bold">Business Idea</Heading>
              <Text>{profileData?.profile.businessIdea}</Text>
            </div>

            <div className="mt-4">
              <Heading level={2} className="text-lg font-bold">Skills</Heading>
              <ul className="list-disc list-inside">
                {profileData?.profile.skills?.map((skill, index) => (
                  <Text as="li" key={index}>{skill}</Text>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-around">
              <Button onClick={handleSendConnectionRequest}>Send Connection Request</Button>
              <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-4 bg-gray-800 text-white text-center">
        <Link href="/terms-of-service" className="px-2">Terms of Service</Link>
        <Link href="/privacy-policy" className="px-2">Privacy Policy</Link>
        <Link href="/contact" className="px-2">Contact</Link>
      </footer>
    </SidebarLayout>
  );
};

export default ProfileViewingPage;