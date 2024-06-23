import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import fetchNotifications from '../lib/fetchNotifications';
import { Notification } from '../models/Notification';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar';
import { Listbox, ListboxOption, ListboxLabel } from '@/components/listbox';
import { Alert, AlertTitle, AlertDescription } from '@/components/alert';
import { Heading } from '@/components/heading';

const NotificationsPage: NextPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <NavbarSection>
          <NavbarItem href="/dashboard">Dashboard</NavbarItem>
          <NavbarItem href="/search">Search/Match</NavbarItem>
          <NavbarItem href="/messages">Messages</NavbarItem>
          <NavbarItem href="/settings">Settings</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
      </Navbar>

      <main className="flex-grow p-4">
        <Heading className="text-2xl font-bold mb-4">Notifications</Heading>

        {error && (
          <Alert className="mb-4" open={!!error} onClose={() => setError(null)}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Listbox name="notifications">
          {notifications.map((notification) => (
            <ListboxOption key={notification._id} value={notification.message} >
              <div className="p-4 bg-white shadow rounded flex items-center justify-between">
                <div>
                  <ListboxLabel>{notification.message}</ListboxLabel>
                  <div className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                </div>
                <Link href={`/messages`}>View</Link>
              </div>
            </ListboxOption>
          ))}
        </Listbox>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <Link href="/terms">Terms of Service</Link> |{' '}
        <Link href="/privacy">Privacy Policy</Link> |{' '}
        <Link href="/contact">Contact Information</Link>
      </footer>
    </div>
  );
};

export default NotificationsPage;
