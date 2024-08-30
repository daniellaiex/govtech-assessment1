'use client';

import { useState, useEffect } from "react";
import AuthorTable from "./components/AuthorTable";
import SearchBar from "./components/SearchBar";

interface Author {
  id: number;
  name: string;
  createdAt: string;
}

export default function Home() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Author Adding System</h1>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button onClick={handlePost}>Create Author</button>
        </div>
        <SearchBar onSearch={handleSearch} />
        {authors? (
          <div>
            <h2>Authors</h2>
            <AuthorTable authors={authors} />
          </div>
        ) : (
          <div>
            <p>No authors found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
