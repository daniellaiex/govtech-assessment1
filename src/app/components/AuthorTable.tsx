import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Author {
  id: number;
  authorFirstName: string;
  authorLastName: string;
  createdAt: string;
}

interface AuthorTableProps {
  authors: Author[];
}

const AuthorTable: React.FC<AuthorTableProps> = ({ authors }) => {
    const authorHeaders = ['ID', 'First Name', 'Last Name', 'Creation Time'];
    console.log(authors);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    {authorHeaders.map((header, index) => {
                        return <TableCell key={index}>{header}</TableCell>;
                    })}
                </TableRow>
                </TableHead>
                <TableBody>
                {authors.map((author, index) => (
                    <TableRow key={index}>
                        <TableCell>{author.id}</TableCell>
                        <TableCell>{author.authorFirstName}</TableCell>
                        <TableCell>{author.authorLastName}</TableCell>
                        <TableCell>{author.createdAt}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AuthorTable;