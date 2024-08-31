import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, TableSortLabel, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserTableProps, UserKeys } from '../types/types';

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const [sortConfig, setSortConfig] = useState<{ key: UserKeys, direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });
    const userHeaders: {key: UserKeys, label: string}[] = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'username', label: 'Username' },
        { key: 'address', label: 'Address' },
        { key: 'phone', label: 'Phone' },
        { key: 'website', label: 'Website' },
        { key: 'company', label: 'Company' }
    ]

    const handleSort = (key: UserKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow className='table-header-row'>
                {userHeaders.map((header) => (
                    <TableCell key={header.key} className='table-header-cell'>
                        <TableSortLabel
                            active={sortConfig.key === header.key}
                            direction={sortConfig.key === header.key ? sortConfig.direction : 'asc'}
                            onClick={() => handleSort(header.key)}
                        >
                            {header.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {sortedUsers.map((user) => (
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
                            <strong>Zipcode:</strong> {user.address.zipcode}
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
                    <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="caption">{user.company.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="caption"><strong>Catch Phrase:</strong> {user.company.catchPhrase}</Typography>
                        <Typography variant="caption"><strong>BS:</strong> {user.company.bs}</Typography>
                        </Box>
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