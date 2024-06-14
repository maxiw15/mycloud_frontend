import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconBrandGoogleDrive } from '@tabler/icons-react';
import { Container, Button, Text, Menu, Avatar,  Group, } from '@mantine/core';

import { checkUser, logout } from '../redux/slices/authSlice';


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);


  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };


  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <>
      <Container fluid h={50} bg="dark.7" style={{ padding: '20px 30px', marginBottom: '50px' }}>
        <Group justify='space-between'>
          <Group justify='flex-start'>
            <IconBrandGoogleDrive size={30} />
            <Text size='xl'>File manager</Text>
            </Group>
          
          {user ? (
            <>
              <Group>

                <Button
                  variant='light'
                  size="md"
                  onClick={() => navigate('/')}>My files
                </Button>
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                  <Menu.Target>
                    <Button size="md"><Avatar radius="xl" size="md" variant="transparent" />{user.username}</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Settings</Menu.Label>
                    <Menu.Item color='red' onClick={handleLogout}>Logout</Menu.Item>
                    {user.is_staff ? (
                      <>
                        <Menu.Divider />
                        <Menu.Label>Admin panel</Menu.Label>
                        <Menu.Item onClick={() => navigate('/admin/files')}>Manage files</Menu.Item>
                        <Menu.Item onClick={() => navigate('/admin/users')}>Manage users</Menu.Item>
                      </>) : null}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </>
          ) : (
            <Button
              size="md" onClick={() => navigate('/login')}>Login
            </Button>
          )}
        </Group>

      </Container>
    </>
  )
}
