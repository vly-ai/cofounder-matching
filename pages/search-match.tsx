import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserDocument } from '../../models/User';
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar';
import { Avatar } from '@/components/avatar';
import { Fieldset, FieldGroup, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Dialog, DialogBody, DialogTitle, DialogDescription, DialogActions } from '@/components/dialog';
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/description-list';

interface Filters {
  industry?: string;
  location?: string;
  stageOfProject?: string;
  skills?: string[];
}

const SearchMatchPage = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [results, setResults] = useState<UserDocument[]>([]);
  const [profileModal, setProfileModal] = useState<UserDocument | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/search-match', filters);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleLike = async (profileId: string) => {
    try {
      await axios.post('/api/search-match/like', { likedProfileId: profileId });
      handleSearch(); // Refresh search results after liking
    } catch (error) {
      console.error('Error liking profile', error);
    }
  };

  const handlePass = async (profileId: string) => {
    try {
      await axios.post('/api/search-match/pass', { passedProfileId: profileId });
      handleSearch(); // Refresh search results after passing
    } catch (error) {
      console.error('Error passing profile', error);
    }
  };

  const openProfileModal = (profile: UserDocument) => {
    setProfileModal(profile);
  };

  const closeProfileModal = () => {
    setProfileModal(null);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Header */}
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/dashboard">Dashboard</NavbarItem>
          <NavbarItem href="/search-match">Search/Match</NavbarItem>
          <NavbarItem href="/messaging">Messages</NavbarItem>
          <NavbarItem href="/settings">Settings</NavbarItem>
        </NavbarSection>
      </Navbar>

      {/* Filter Section */}
      <Fieldset className="p-4 border-b">
        <Legend>Filters</Legend>
        <FieldGroup className="grid grid-cols-2 gap-4">
          <div>
            <Label>Industry</Label>
            <Input type="text" name="industry" value={filters.industry || ''} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Location</Label>
            <Input type="text" name="location" value={filters.location || ''} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Stage of Project</Label>
            <Input type="text" name="stageOfProject" value={filters.stageOfProject || ''} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Skills</Label>
            <Input type="text" name="skills" value={filters.skills?.join(', ') || ''} onChange={handleInputChange} />
          </div>
        </FieldGroup>
        <Button color="blue" onClick={handleSearch}>Apply Filters</Button>
      </Fieldset>

      {/* Results Section */}
      <section className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((profile) => (
            <div key={profile._id} className="border rounded p-4">
              <h2>{profile.name}</h2>
              <p>{profile.bio}</p>
              <Avatar className="size-10 bg-purple-500 text-white" src={profile.avatar} />
              <Button color="green" onClick={() => handleLike(profile._id)}>Like</Button>
              <Button color="red" onClick={() => handlePass(profile._id)}>Pass</Button>
              <Button color="gray" onClick={() => openProfileModal(profile)}>Details</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Details Modal */}
      {profileModal && (
        <Dialog open={profileModal !== null} onClose={closeProfileModal} size="xl">
          <DialogTitle>{profileModal.name}</DialogTitle>
          <DialogDescription>Details of the selected profile</DialogDescription>
          <DialogBody>
            <DescriptionList>
              <DescriptionTerm>Name</DescriptionTerm>
              <DescriptionDetails>{profileModal.name}</DescriptionDetails>

              <DescriptionTerm>Biography</DescriptionTerm>
              <DescriptionDetails>{profileModal.bio}</DescriptionDetails>

              <DescriptionTerm>Business Idea</DescriptionTerm>
              <DescriptionDetails>{profileModal.businessIdea}</DescriptionDetails>

              <DescriptionTerm>Skills</DescriptionTerm>
              <DescriptionDetails>{profileModal.skills?.join(', ')}</DescriptionDetails>

              <DescriptionTerm>Location</DescriptionTerm>
              <DescriptionDetails>{profileModal.location}</DescriptionDetails>
            </DescriptionList>
          </DialogBody>
          <DialogActions>
            <Button color="green" onClick={() => handleLike(profileModal._id)}>Like</Button>
            <Button color="red" onClick={() => handlePass(profileModal._id)}>Pass</Button>
            <Button color="blue" onClick={() => router.push('/messaging')}>Message</Button>
            <Button color="gray" onClick={closeProfileModal}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="p-4 border-t">
        <div>Terms of Service</div>
        <div>Privacy Policy</div>
        <div>Contact Information</div>
      </footer>
    </div>
  );
};

export default SearchMatchPage;
