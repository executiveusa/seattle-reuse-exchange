import React from 'react';

export default function LoginPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Sign in to your Seattle Reuse Exchange account.
        </p>
        <p>
          Authentication system will be implemented here with magic link functionality.
        </p>
      </div>
    </div>
  );
}