



// 'use client';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { getAuth } from 'firebase/auth';
// import { app, googleAuthProvider } from './scripts/firebase';
// import { signInWithPopup, signOut } from 'firebase/auth';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Button } from '@/components/ui/button';

// export const AuthProvider = () => {
//     const auth = getAuth(app);
//     const [user, setUser] = useState(auth.currentUser);

//     useEffect(() => {
//         const unsub = auth.onAuthStateChanged((maybeUser) => {
//             if (maybeUser != null) {
//                 return setUser(maybeUser);
//             }
//         });
//         signInWithPopup(auth, googleAuthProvider)
//             .then((credentials) => {
//                 setUser(credentials.user);
//             })
//             .catch((error) => {
//                 console.error('Google sign-in error:', error);
//             });

//         return () => unsub();
//     }, [auth]);

// const handleGoogleSignIn = () => {

//     signInWithPopup(auth, googleAuthProvider)
//         .then((credentials) => {
//             setUser(credentials.user);
//         })
//         .catch((error) => {
//             console.error('Google sign-in error:', error);
//         });
// };

// const handleSignOut = () => {
//     signOut(auth)
//         .then(() => {
//             setUser(null);
//         })
//         .catch((error) => {
//             console.error('Sign out error:', error);
//         });
// };
// return user && user.photoURL ? (
// <div>
//     <Popover>
//         <PopoverTrigger asChild>
// <Image
//     src={user.photoURL}
//     width={50}
//     height={50}
//     alt="Profile"
//     style={{ borderRadius: '50%', cursor: 'pointer' }}
// />
//         </PopoverTrigger>
//         <PopoverContent className="w-80">
//             <div className=" gap-4">
//                 <div>
//                     <p className="text-sm">{user.displayName}</p>
//                     <p className="text-sm text-slate-400">{user.email}</p>
//                 </div>
//                 <button onClick={handleSignOut}>Sign out</button>
//             </div>
//         </PopoverContent>
//     </Popover>

//     {/* <p>{user.displayName || user.email}</p> */}
//     {/* <button onClick={handleSignOut}>Sign out</button> */}
// </div>
//     ) : (
//         <button className="underline" >Sign in with Google</button>
//     );
// };

