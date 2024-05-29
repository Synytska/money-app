'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/auth';

const AuthButton = () => {
    const [showAuth, setShowAuth] = useState(false);

    const handleAuthClick = () => {
        setShowAuth(true);
    };

    return (
        <div>
            {!showAuth && (
                <button onClick={handleAuthClick} className="underline">
                    Login
                </button>
            )}
            {showAuth && <AuthProvider />}
        </div>
    );
};

export default AuthButton;

