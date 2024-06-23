import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserDocument } from '../models/User';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar';
import { Fieldset, Field, Label } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Select } from '@/components/select';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox';
import { Dialog, DialogBody, DialogActions, DialogTitle } from '@/components/dialog';

const SettingsPage = () => {
const router = useRouter();
const [user, setUser] = useState<UserDocument | null>(null);
const [name, setName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
const [notificationsSettings, setNotificationsSettings] = useState({
email: true,
sms: true,
pushNotifications: true
});
const [isDialogOpen, setIsDialogOpen] = useState(false);
useEffect(() => {
// Fetch user data for settings page
const fetchUserData = async () => {
try {
const response = await axios.get('/api/settings');
setUser(response.data.user);
setName(response.data.user.name);
setEmail(response.data.user.email);
setPrivacy(response.data.user.privacy || 'public');
setNotificationsSettings(response.data.user.notificationsSettings || {
email: true,
sms: true,
pushNotifications: true
});
} catch (error) {
console.error(error);
}
};
fetchUserData();
}, []);
const handleSaveSettings = async () => {
try {
await axios.post('/api/settings/update', {
name,
email,
password,
privacy,
notificationsSettings
});
alart('Settings updated successfully'); } catch (error) { console.error(error); alart('Error updating settings'); } }; const handleDeleteAccount = async () => { if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return; try { await axios.post('/api/settings/delete'); alart('Account deleted successfully'); router.push('/'); } catch (error) { console.error(error); alart('Error deleting account'); } }; return ( <div className='settings-page'> <Navbar> <NavbarSection> <Link href='/dashboard'>Dashboard</Link> <Link href='/search'>Search/Match</Link> <Link href='/messages'>Messages</Link> <Link href='/settings'>Settings</Link> </NavbarSection> </Navbar> <main className='main-section'> <section className='profile-settings'> <h2 className='text-xl font-semibold mb-4'>Profile Settings</h2> <Fieldset> <Field> <Label>Name</Label> <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' /> </Field> <Field> <Label>Email</Label> <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /> </Field> <Field> <Label>Password</Label> <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' /> </Field> <Button onClick={handleSaveSettings}>Save</Button> </Fieldset> </section> <section className='privacy-preferences'> <h2 className='text-xl font-semibold mb-4'>Privacy Preferences</h2> <Fieldset> <Field> <Label>Privacy</Label> <Select value={privacy} onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}> <option value='public'>Public</option> <option value='private'>Private</option> </Select> <Button onClick={handleSaveSettings}>Save</Button> </Field> </Fieldset> </section> <section className='notification-settings'> <h2 className='text-xl font-semibold mb-4'>Notification Settings</h2> <CheckboxGroup> <CheckboxField> <Checkbox name='email' checked={notificationsSettings.email} onChange={() => setNotificationsSettings({ ...notificationsSettings, email: !notificationsSettings.email })} /> <Label>Email Notifications</Label> </CheckboxField> <CheckboxField> <Checkbox name='sms' checked={notificationsSettings.sms} onChange={() => setNotificationsSettings({ ...notificationsSettings, sms: !notificationsSettings.sms })} /> <Label>SMS Notifications</Label> </CheckboxField> <CheckboxField> <Checkbox name='pushNotifications' checked={notificationsSettings.pushNotifications} onChange={() => setNotificationsSettings({ ...notificationsSettings, pushNotifications: !notificationsSettings.pushNotifications })} /> <Label>Push Notifications</Label> </CheckboxField> <Button onClick={handleSaveSettings}>Save</Button> </CheckboxGroup> </section> <section className='account-management'> <h2 className='text-xl font-semibold mb-4'>Account Management</h2> <Button onClick={() => setIsDialogOpen(true)} className='bg-red-600 text-white'>Delete Account</Button> <Dialog open={isDialogOpen} onClose={setIsDialogOpen}> <DialogTitle>Confirm Account Deletion</DialogTitle> <DialogBody>Are you sure you want to delete your account? This action cannot be undone.</DialogBody> <DialogActions> <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button> <Button onClick={handleDeleteAccount} className='bg-red-600 text-white'>Delete</Button> </DialogActions> </Dialog> </section> </main> <footer className='footer'> <Link href='/terms'>Terms of Service</Link> <Link href='/privacy'>Privacy Policy</Link> <Link href='/contact'>Contact</Link> </footer> </div> ); }; export default SettingsPage;
