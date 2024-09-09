import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
            },
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
        </Typography>
        {isLoggedIn && !isLoading && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: '#ccc',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: '18px',
                  marginRight: '10px',
                  width: 40,
                  height: 40,
                }}
                src={user?.image}
              >
                {!user?.image && user ? getInitials(user.username) : ''}
              </Avatar>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </div>
          </>
        )}
        {!isLoggedIn && !isLoading && (
          <Button color="inherit">
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
