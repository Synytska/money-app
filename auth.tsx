'use client';
import { useEffect, useState } from 'react';
import { app, googleAuthProvider } from './scripts/firebase';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

export const AuthProvider = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((maybeUser) => {
            if (maybeUser != null) {
                return setUser(maybeUser);
            }
        });

        return unsub;
    }, [auth]);
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((credentials) => {
                setUser(credentials.user);
            })
            .catch((error) => {
                console.error('Google sign-in error:', error);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    };

    return user && user.photoURL ? (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Image
                        src={user.photoURL}
                        width={50}
                        height={50}
                        alt="Profile"
                        style={{ borderRadius: '50%', cursor: 'pointer' }}
                    />
                </PopoverTrigger>
                <PopoverContent className="">
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-sm">{user.displayName}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                        </div>
                        <div className='flex gap-2'>
                            <ArrowLeftStartOnRectangleIcon className='w-6 h-6'/>
                            <button className="text-sm underline" onClick={handleSignOut}>Sign out</button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    ) : (
        <button className="underline" onClick={handleGoogleSignIn}>
            Sign in with Google
        </button>
    );
};

