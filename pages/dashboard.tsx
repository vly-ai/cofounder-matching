import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { UserDocument } from '../models/User';
import { ActivityDocument } from '../models/Activity';
import { NotificationDocument } from '../models/Notification';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Navbar, NavbarSection, NavbarItem, NavbarSpacer } from '@/components/navbar';
import { Avatar } from '@/components/avatar';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { Listbox, ListboxOption, ListboxLabel } from '@/components/listbox';
import { Alert } from '@/components/alert';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profileSummary, setProfileSummary] = useState<Partial<UserDocument>>({});
  const [recentActivities, setRecentActivities] = useState<ActivityDocument[]>([]);
  const [notifications, setNotifications] = useState<NotificationDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.token) {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      const [profileRes, activitiesRes, notificationsRes] = await Promise.all([
        axiosInstance.get('/api/dashboard/profile-summary', {
          headers: { Authorization: `Bearer ${session?.token}` },
        }),
        axiosInstance.get('/api/dashboard/recent-activities', {
          headers: { Authorization: `Bearer ${session?.token}` },
        }),
        axiosInstance.get('/api/dashboard/notifications', {
          headers: { Authorization: `Bearer ${session?.token}` },
        }),
      ]);

      setProfileSummary(profileRes.data);
      setRecentActivities(activitiesRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Alert open={loading} onClose={() => {}} size='md'>Loading...</Alert>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Navbar>
            <NavbarSection>
              <NavbarItem href="/dashboard" current>Dashboard</NavbarItem>
              <NavbarItem href="/search-match">Search/Match</NavbarItem>
              <NavbarItem href="/messages">Messages</NavbarItem>
              <NavbarItem href="/settings">Settings</NavbarItem>
            </NavbarSection>
          </Navbar>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            <div className="border-t border-gray-200">
              <DescriptionList>
                <DescriptionTerm>Full name</DescriptionTerm>
                <DescriptionDetails>{profileSummary.name}</DescriptionDetails>
                <DescriptionTerm>Email</DescriptionTerm>
                <DescriptionDetails>{profileSummary.email}</DescriptionDetails>
                <DescriptionTerm>About</DescriptionTerm>
                <DescriptionDetails>{profileSummary.bio}</DescriptionDetails>
                <Link href="/profile/edit" className="text-indigo-600 hover:text-indigo-900">Edit Profile</Link>
              </DescriptionList>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activities</h3>
            </div>
            <div className="border-t border-gray-200">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Description</TableHeader>
                    <TableHeader>Date</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentActivities.map(activity => (
                    <TableRow key={activity._id}>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{new Date(activity.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="border-t border-gray-200">
              <Listbox>
                {notifications.map(notification => (
                  <ListboxOption key={notification._id} value={notification._id}>
                    <ListboxLabel>
                      <Link href={notification.type === 'message' ? '/messages' : notification.type === 'match' ? '/search-match' : '#'}>{notification.message}</Link>
                    </ListboxLabel>
                  </ListboxOption>
                ))}
              </Listbox>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;