import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../css/Navbar.css';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!Cookies.get('access_token'));
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token', { path: '/' });
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <div className='nav-flex'>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <a href='/'>
                    <img src='src/assets/mineicon.webp' className='tiny-icon-nav' alt="icon" />
                </a>
            </div>
            <div style={{display: "flex", gap: "30px"}} className='link-navbar'>
                <a href='/gallery'>Galeria de Fotos</a>
                <a href='/user'>Zona de Usuario</a>
                {isLoggedIn && (
                    <a onClick={handleLogout}>
                        Cerrar sesión
                    </a>
                )}
            </div>
        </div>
    );
}
