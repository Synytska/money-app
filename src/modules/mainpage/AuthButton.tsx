'use client';
import React, { useState } from 'react';
import {AuthProvider} from '@/auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';


export const AuthButton = () => {
    const [showAuth, setShowAuth] = useState(false);

    const handleAuthClick = () => {
        setShowAuth(true);
    };

    return (
        <div>
            {!showAuth && (
                <button onClick={handleAuthClick} className="underline flex gap-2">
                    <ArrowRightStartOnRectangleIcon className='w-6 h-6'/>Login
                </button>
            )}
            {showAuth && <AuthProvider />}
        </div>
    );
};



