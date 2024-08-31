'use client';

import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import AuthorTable from "./components/AuthorTable";
import SearchBar from "./components/SearchBar";
import AddAuthorModal from "./components/AddAuthorModal";
import Toast from "./components/Toast";
import UserTable from "./components/UserTable";

interface Author {
  id: number;
  authorFirstName: string;
  authorLastName: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  role: string;
}

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  // const [id, setId] = useState('');
  // const [name, setName] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/author');
      const data = await response.json();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  // const handleGet = async () => {
  //   const response = await fetch(`/api/author?id=${id}`);
  //   const data = await response.json();
  //   setAuthors(data);
  // };

  const handlePost = async (firstName: string, lastName: string) => {
    try {
      const response = await fetch('/api/author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add author');
      }

      const data = await response.json();
      setAuthors((prevAuthors) => [...prevAuthors, data]);
      showToast('Author has been added', 'success');
      setIsModalOpen(false);
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleSearch = async (query: string) => {
    if (query) {
      const response = await fetch(`/api/author?name=${query}`);
      const data = await response.json();
      setAuthors(data);
    } else {
      const response = await fetch('/api/author');
      const data = await response.json();
      setAuthors(data);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <main className="main-container">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Author/User Registry
      </Typography>
      <Box className="box-full-width">
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Author" />
          <Tab label="User" />
        </Tabs>
        {tabIndex === 0 && (
          <Box className="box-padding">
            <Box className="box-centered">
              <Box className="box-responsive-width">
                <SearchBar onSearch={handleSearch} />
              </Box>
              <Button variant="contained" onClick={() => setIsModalOpen(true)} className="button-margin-left">
                Add Author
              </Button>

            </Box>
            <AuthorTable authors={authors} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box className="box-padding">
            <SearchBar onSearch={handleSearch} />
            <UserTable />
          </Box>
        )}
      </Box>
      <AddAuthorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handlePost} />
      <Toast open={toastOpen} message={toastMessage} onClose={handleToastClose} type={toastType} />
    </main>
  );
}
