import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () =>{
        return signOut(auth);
    }

    const updateUserProfile = (obj) =>{
        return updateProfile(auth.currentUser, obj)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unsubscribe()
        }
    }, [])

    const obj = {
        user,
        setUser,
        createUser,
        loginUser,
        signOutUser,
        updateUserProfile,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;