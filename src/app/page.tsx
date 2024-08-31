'use client';

import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import AuthorTable from "./components/AuthorTable";
import SearchBar from "./components/SearchBar";
import AddAuthorModal from "./components/AddAuthorModal";

interface Author {
  id: number;
  name: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  role: string;
}

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/author');
      const data = await response.json();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  const handleGet = async () => {
    const response = await fetch(`/api/author?id=${id}`);
    const data = await response.json();
    setAuthors(data);
  };

  const handlePost = async () => {
    const response = await fetch('/api/author', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setAuthors((prevAuthors) => [...prevAuthors, data]);
  };

  const handleSearch = async (query: string) => {
    if (query) {
      const response = await fetch(`/api/author?name=${query}`);
      const data = await response.json();
      setAuthors(data);
    } else {
      // Fetch all authors if the search query is empty
      const response = await fetch('/api/author');
      const data = await response.json();
      setAuthors(data);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Author/User Registry
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Author" />
          <Tab label="User" />
        </Tabs>
        {tabIndex === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <SearchBar onSearch={handleSearch} />
              <Button variant="contained" onClick={() => setIsModalOpen(true)}>
                Add Author
              </Button>
            </Box>
            <AuthorTable authors={authors} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box sx={{ p: 3 }}>
            <SearchBar onSearch={handleSearch} />
            {/* Replace with UserTable when available */}
            <Typography variant="h6" component="h2" align="center">
              User Table Placeholder
            </Typography>
          </Box>
        )}
      </Box>
      <AddAuthorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handlePost} />
    </main>
  );
}
