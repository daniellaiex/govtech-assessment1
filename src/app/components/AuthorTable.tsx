import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

interface Author {
  id: number;
  authorFirstName: string;
  authorLastName: string;
  createdAt: string;
}

interface AuthorTableProps {
  authors: Author[];
}

type AuthorKeys = keyof Author;

const AuthorTable: React.FC<AuthorTableProps> = ({ authors }) => {
    const [sortConfig, setSortConfig] = useState<{ key: AuthorKeys, direction: 'asc' | 'desc' }>({ key: 'id', direction: 'asc' });
    const authorHeaders: { key: AuthorKeys, label: string }[] = [
        { key: 'id', label: 'ID' },
        { key: 'authorFirstName', label: 'First Name' },
        { key: 'authorLastName', label: 'Last Name' },
        { key: 'createdAt', label: 'Creation Time' }
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const handleSort = (key: AuthorKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedAuthors = [...authors].sort((a, b) => {
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
                <TableRow>
                    {authorHeaders.map((header) => (
                        <TableCell key={header.key}>
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
                {sortedAuthors.map((author, index) => (
                    <TableRow key={index}>
                        <TableCell>{author.id}</TableCell>
                        <TableCell>{author.authorFirstName}</TableCell>
                        <TableCell>{author.authorLastName}</TableCell>
                        <TableCell>{formatDate(author.createdAt)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AuthorTable;