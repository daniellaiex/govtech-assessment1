import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Author {
  id: number;
  name: string;
  createdAt: string;
}

interface AuthorTableProps {
  authors: Author[];
}

const AuthorTable: React.FC<AuthorTableProps> = ({ authors }) => {
    const authorHeaders = ['ID', 'Author Name', 'Creation Time'];

    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                {authorHeaders.map((header) => {
                    return <TableCell key={header}>{header}</TableCell>;
                })}
            </TableRow>
            </TableHead>
            <TableBody>
            {authors.map((author) => (
                <TableRow key={author.id}>
                    <TableCell>{author.id}</TableCell>
                    <TableCell>{author.name}</TableCell>
                    <TableCell>{author.createdAt}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default AuthorTable;