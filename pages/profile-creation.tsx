import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/button';
import { Fieldset, Legend, Description, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar';
import { Alert, AlertDescription } from '@/components/alert';

const ProfileCreationPage = () => {
  const [tagline, setTagline] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [businessIdea, setBusinessIdea] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/signup-login');
    }
  }, [session, router]);

  const handleSave = async () => {
    if (!session?.user?.email) {
      setError('You must be logged in to create a profile');
      return;
    }

    try {
      const response = await axios.post('/api/profile/create', {
        tagline,
        bio,
        businessIdea,
        skills,
        location,
      }, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        }
      });

      if (response.status === 201) {
        router.push('/dashboard');
      } else {
        setError('Failed to create profile');
      }
    } catch (err) {
      setError('An error occurred while creating your profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/">Platform Logo</NavbarItem>
        </NavbarSection>
        <NavbarSection>
          <NavbarItem href="/">Back</NavbarItem>
        </NavbarSection>
      </Navbar>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl mb-6">Create Your Profile</h1>
        {error && (
          <Alert size="md" open={!!error} onClose={() => setError(null)}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form className="w-full max-w-lg">
          <Fieldset>
            <Legend>Tagline</Legend>
            <Input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full"
              aria-label="Tagline"
              name="tagline"
            />
            <Description>Provide your tagline</Description>
          </Fieldset>
          <Fieldset>
            <Legend>Bio</Legend>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full"
              aria-label="Bio"
              name="bio"
            />
            <Description>Provide your bio</Description>
          </Fieldset>
          <Fieldset>
            <Legend>Business Idea</Legend>
            <Input
              value={businessIdea}
              onChange={(e) => setBusinessIdea(e.target.value)}
              className="w-full"
              aria-label="Business Idea"
              name="businessIdea"
            />
            <Description>Provide your business idea</Description>
          </Fieldset>
          <Fieldset>
            <Legend>Skills</Legend>
            <Input
              value={skills.join(', ')}
              onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
              className="w-full"
              aria-label="Skills"
              name="skills"
            />
            <Description>Provide your skills</Description>
          </Fieldset>
          <Fieldset>
            <Legend>Location</Legend>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
              aria-label="Location"
              name="location"
            />
            <Description>Provide your location</Description>
          </Fieldset>
          <div className="flex items-center justify-between mt-4">
            <Button onClick={handleSave} color="cyan">
              Save
            </Button>
          </div>
        </form>
      </main>
      <footer className="p-4 border-t text-center">
        <Link href="/terms-of-service">Terms of Service</Link> | <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/contact">Contact</Link>
      </footer>
    </div>
  );
};

export default ProfileCreationPage;
