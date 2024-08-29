'use client';

import { useState } from "react";

export default function Home() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);

  const handleGet = async () => {
    const response = await fetch(`/api/author?id=${id}`);
    const data = await response.json();
    setResult(data);
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
    setResult(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>API Test</h1>
        <div>
          <label>
            ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </label>
          <button onClick={handleGet}>Get Author</button>
        </div>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button onClick={handlePost}>Create Author</button>
        </div>
        {result && (
          <div>
            <h2>Result</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
