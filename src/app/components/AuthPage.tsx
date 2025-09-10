"use client";

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Logo from './logo';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="p-4">
        <Logo />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Form Content */}
          <div className="transition-all duration-300 ease-in-out">
            {authMode === 'login' ? (
              <LoginForm onSwitchToSignup={switchToSignup} />
            ) : (
              <SignUpForm onSwitchToLogin={switchToLogin} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
