import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { UserModel } from '../models/User';
import { NotificationSettings } from '../models/User';
import { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInUser, useUserSession } from '../lib/authProvider';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Field, Fieldset, Label, ErrorMessage } from '@/components/fieldset';
import { Alert, AlertTitle, AlertDescription } from '@/components/alert';

const SignupLoginPage: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { data: session } = useUserSession();

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
  };

  const handleSignup = async (values: {
    email: string;
    password: string;
    name: string;
    bio?: string;
    businessIdea?: string;
    skills?: string[];
    location?: string;
    privacy?: 'public' | 'private';
    notificationsSettings?: NotificationSettings;
  }) => {
    try {
      await axios.post('/api/auth/signup', values);
      alert('Signup successful. Please log in.');
      setIsLogin(true);
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Signup failed.');
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      await signInUser(values.email, values.password);
      alert('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed.');
    }
  };

  const signupFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      bio: '',
      businessIdea: '',
      skills: [],
      location: '',
      privacy: 'public',
      notificationsSettings: {
        email: true,
        sms: true,
        pushNotifications: true,
      },
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
      name: Yup.string().required('Required'),
    }),
    onSubmit: handleSignup,
  });

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl mb-8'>{isLogin ? 'Login' : 'Signup'}</h1>
      <div className='mb-4'>
        <Button onClick={toggleForm}>
          {isLogin ? 'Go to Signup' : 'Go to Login'}
        </Button>
      </div>
      <form
        onSubmit={isLogin ? loginFormik.handleSubmit : signupFormik.handleSubmit}
        className='w-1/2'
      >
        <Fieldset>
          <Field>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              {...(isLogin ? loginFormik.getFieldProps('email') : signupFormik.getFieldProps('email'))}
            />
            {isLogin && loginFormik.touched.email && loginFormik.errors.email ? (
              <ErrorMessage>{loginFormik.errors.email}</ErrorMessage>
            ) : null}
          </Field>
          <Field>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              {...(isLogin ? loginFormik.getFieldProps('password') : signupFormik.getFieldProps('password'))}
            />
            {isLogin && loginFormik.touched.password && loginFormik.errors.password ? (
              <ErrorMessage>{loginFormik.errors.password}</ErrorMessage>
            ) : null}
          </Field>
          {!isLogin && (
            <>
              <Field>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  type='text'
                  {...signupFormik.getFieldProps('name')}
                />
                {signupFormik.touched.name && signupFormik.errors.name ? (
                  <ErrorMessage>{signupFormik.errors.name}</ErrorMessage>
                ) : null}
              </Field>
              <Field>
                <Label htmlFor='bio'>Bio</Label>
                <Input
                  id='bio'
                  type='text'
                  {...signupFormik.getFieldProps('bio')}
                />
                {signupFormik.touched.bio && signupFormik.errors.bio ? (
                  <ErrorMessage>{signupFormik.errors.bio}</ErrorMessage>
                ) : null}
              </Field>
              <Field>
                <Label htmlFor='businessIdea'>Business Idea</Label>
                <Input
                  id='businessIdea'
                  type='text'
                  {...signupFormik.getFieldProps('businessIdea')}
                />
                {signupFormik.touched.businessIdea && signupFormik.errors.businessIdea ? (
                  <ErrorMessage>{signupFormik.errors.businessIdea}</ErrorMessage>
                ) : null}
              </Field>
              <Field>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  type='text'
                  {...signupFormik.getFieldProps('location')}
                />
                {signupFormik.touched.location && signupFormik.errors.location ? (
                  <ErrorMessage>{signupFormik.errors.location}</ErrorMessage>
                ) : null}
              </Field>
            </>
          )}
          <Button type='submit'>
            {isLogin ? 'Login' : 'Signup'}
          </Button>
        </Fieldset>
      </form>
      <footer className='mt-8'>
        <Link href='/'>Back to Home</Link>
      </footer>
    </div>
  );
};

export default SignupLoginPage;
