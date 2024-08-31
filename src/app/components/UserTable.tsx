import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchUsers } from '../services/userService';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetchUsers();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Website</TableCell>
                        <TableCell>Company</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="caption">{user.address.street}, {user.address.suite}, {user.address.city}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <Typography variant="caption">
                                            <strong>Zipcode</strong> {user.address.zipcode}
                                        </Typography>
                                        <Box display="flex" flexDirection="column">
                                            <Typography variant="caption">
                                                <strong>Lat:</strong> {user.address.geo.lat}
                                            </Typography>
                                            <Typography variant="caption">
                                                <strong>Lng:</strong> {user.address.geo.lng}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className='blue-link'>
                                {user.website}
                            </a>
                        </TableCell>
                        <TableCell>
                            {/* <Typography>{user.company.name}</Typography> */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="caption">{user.company.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <AccordionDetails>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <Typography variant="caption"><strong>Catch Phrase:</strong> {user.company.catchPhrase}</Typography>
                                        <Typography variant="caption"><strong>BS:</strong> {user.company.bs}</Typography>
                                    </Box>
                                </AccordionDetails>
                                </AccordionDetails>
                            </Accordion>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;