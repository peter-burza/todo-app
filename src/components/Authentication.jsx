import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const { signup, login } = useAuth()

    async function handleAuthenticate() {
        const error =
            !email ? 'Email missing' :
                !password ? 'Password missing' :
                    !email.includes('@') ? "Email doesn't contain '@'" :
                        password.length < 8 ? 'Password should contain at least 8 characters' :
                            null;

        if (isAuthenticating || error) {
            if (error) setErrorMessage(error);
            return;
        }

        try {
            setIsAuthenticating(true)
            setErrorMessage(null)

            if (isRegistration) {
                // register a user
                await signup(email, password)
            } else {
                // login a user
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            setErrorMessage('Invalid email or password')
            console.log(err)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return (
        <>
            <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
            <p>{isRegistration ? 'Create an account!' : 'Sign in to your account!'}</p>
            {
                errorMessage && (<p style={{ color: '#ff0000', fontSize: '0.9rem', }}>{errorMessage}</p>)
            }
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" type="text" />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="*********" type="password" />
            <button onClick={handleAuthenticate}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
            <hr />
            <div className="register-content">
                <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign in' : 'Sign up'}</p></button>
            </div>
        </>
    )
}