import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../lib/axiosConfig';
import { Navbar, NavbarSection, NavbarItem, NavbarSpacer } from '@/components/navbar';
import { Button } from '@/components/button';
import { Avatar } from '@/components/avatar';
import { Heading, Text } from '@/components/text';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown';

const LandingPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 bg-white shadow-md">
        <Navbar>
          <NavbarSection>
            <Avatar src="/logo.png" alt="Logo" className="size-10" />
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <Link href="/signup">
              <Button color="blue" className="mx-2">Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button color="blue" className="mx-2">Log In</Button>
            </Link>
          </NavbarSection>
        </Navbar>
      </header>

      {/* Main Section */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100 py-12">
        <div className="text-center">
          <Heading>{t('welcome')}</Heading>
          <Text>{t('description')}</Text>
          <div>
            <Link href="/signup">
              <Button color="blue" className="mx-2">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button outline color="blue" className="mx-2">Log In</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <Heading level={2}>Our Features</Heading>
          <div className="flex flex-wrap justify-around">
            <div className="w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded shadow-md">
                <Avatar src="/feature1.png" alt="Feature 1" className="size-10" />
                <Heading level={3} className="mt-4 mb-2">Feature 1</Heading>
                <Text>Short description about Feature 1.</Text>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded shadow-md">
                <Avatar src="/feature2.png" alt="Feature 2" className="size-10" />
                <Heading level={3} className="mt-4 mb-2">Feature 2</Heading>
                <Text>Short description about Feature 2.</Text>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded shadow-md">
                <Avatar src="/feature3.png" alt="Feature 3" className="size-10" />
                <Heading level={3} className="mt-4 mb-2">Feature 3</Heading>
                <Text>Short description about Feature 3.</Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Link href="/contact">
              <Button plain className="mx-2 text-white">Contact</Button>
            </Link>
            <Link href="/about">
              <Button plain className="mx-2 text-white">About Us</Button>
            </Link>
          </div>
          <div>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Button plain className="mx-2 text-white">Facebook</Button>
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Button plain className="mx-2 text-white">Twitter</Button>
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button plain className="mx-2 text-white">LinkedIn</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
