import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import googleIcon from './google-icon.png'; // Import Google icon image
// import facebookIcon from './facebook-icon.png'; // Import Facebook icon image
import person from './person.png';
import { position } from '@chakra-ui/react';
const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("LoggedIn Successfully", "success");
            history("/");
        } else {
            showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <h2 style={styles.title}>Login</h2>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email address</label>
                        <input type="email" style={styles.input} value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input type="password" style={styles.input} value={credentials.password} onChange={onChange} name="password" id="password" />
                    </div>

                    <button type="submit" style={styles.button}>Login</button>
                    <div style={styles.loginOptions}>
                        <div style={styles.option}>
                            <img src="https://th.bing.com/th/id/OIP.JflGW8e1fT4_ttSuFTQXJwHaHj?rs=1&pid=ImgDetMain" alt="Google" style={styles.optionIcon} />
                            <span>Login with Google</span>
                        </div>
                        <div style={styles.option}>
                            <img src="https://befc.com.au/wp-content/uploads/2019/07/2-21918_download-transparent-background-facebook-logo-clipart-facebook-logo.jpg" alt="Facebook" style={styles.optionIcon} />
                            <span>Login with Facebook</span>
                        </div>
                    </div>
                </form>
            </div>
            <div style={{height:"500px",position:"relative",left:"300px"}} >
                <img src={person} alt="Side Image" style={styles.sideImage} />
            </div>
        </div>
    )
}

// CSS styles
const styles = {
    background: {
        backgroundImage: './bg.jpg', // Replace "background-image.jpg" with your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',

    },
    container: {
        width: '50%',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        position:'relative',
        left:'10px',
        right:'100px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '20px',
        width: '100%',
    },
    label: {
        marginBottom: '5px',
        display: 'block',
        color: '#666',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#333399',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loginOptions: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    option: {
        display: 'flex',
        alignItems: 'center',
    },
    optionIcon: {
        width: '30px',
        marginRight: '10px',
    },
    imageContainer: {
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sideImage: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
};

export default Login;
