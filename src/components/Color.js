import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const YOUR_API_KEY= "AIzaSyAFI_dC9mgKh3yt67Xre8GZmCc1LQRaXfY"
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Handle successful login
                console.log('Logged in:', userCredential.user);
            })
            .catch((error) => {
                // Handle login error
                console.error('Login error:', error);
            });
    };

    const signUp = async (email, password) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${YOUR_API_KEY}`;
        const requestBody = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log('Sign-up response:', data);
            // Handle response data here
        } catch (error) {
            console.error('Sign-up error:', error);
            // Handle error here
        }
    };


    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
};

export default Login;
