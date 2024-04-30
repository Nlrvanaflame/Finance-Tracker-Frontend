import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useGetUserFromTokenQuery, useUpdateUserMutation } from '../services/api';  // Adjust path as necessary
import myImage from '../assets/myImage.jpg';

const AccountManagementPage: React.FC = () => {
  const { data: user, isLoading } = useGetUserFromTokenQuery();
  const [updateUser, { isSuccess, isError, reset }] = useUpdateUserMutation();

  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
        updateUser({
          id: user!.id,
          email: user!.email,
          password: values.password
        });
        formik.resetForm();
      } else {
        console.error('Passwords do not match');
      }
    }
  });

  useEffect(() => {
    if (isSuccess) {
      setShowPasswordUpdate(false);
      setMessage('Password updated successfully!');
      reset();
    }
    if (isError) {
      setMessage('Failed to update password.');
      reset();
    }
  }, [isSuccess, isError, reset]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#4d5b7a', color: '#dcdde0', alignItems: 'center', justifyContent: 'center' }}>
      <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '2em', color: '#dcdde0', textDecoration: 'none' }}>←</Link>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={myImage} alt="Profile" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '10px', fontSize: '2em' }}>{user?.username}</h2>
          <p>{`Joined: ${new Date(user?.date_joined!).toLocaleDateString()}`}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '1.25em', fontWeight: 'bold' }}>Email:</label>
            <div style={{ padding: '10px', border: '1px solid #35455D', backgroundColor: '#4d5b7a', color: 'white', fontWeight: 'bold' }}>
              {user?.email}
            </div>
          </div>
          {showPasswordUpdate ? (
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <input type="password" onChange={formik.handleChange} value={formik.values.password} name="password" placeholder="New password" style={{ padding: '10px', border: '1px solid #35455D', backgroundColor: '#4d5b7a', color: '#dcdde0' }} />
                <input type="password" onChange={formik.handleChange} value={formik.values.confirmPassword} name="confirmPassword" placeholder="Confirm password" style={{ padding: '10px', border: '1px solid #35455D', backgroundColor: '#4d5b7a', color: '#dcdde0' }} />
              </div>
              <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#405a94', color: '#dcdde0', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Save Changes</button>
              {message && <div style={{ color: 'green' }}>{message}</div>}
            </form>
          ) : (
            <button onClick={() => setShowPasswordUpdate(true)} style={{ padding: '10px 20px', backgroundColor: '#405a94', color: '#dcdde0', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Update Password</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagementPage;
