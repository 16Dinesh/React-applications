import { useNavigate } from 'react-router-dom';

export default function HomeNav() {
    const navigate = useNavigate()

    function handleLogOut () {
        navigate("/login")
    }

    return (
        <nav style={styles.navbar}>
            <div style={styles.brand}>Company Name</div>
            <button style={styles.logoutButton} onClick={handleLogOut}>Logout</button>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
    },
    brand: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: '8px 12px',
        fontSize: '1em',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};
