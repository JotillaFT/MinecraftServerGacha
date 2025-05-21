import '../css/Navbar.css'

export default function Navbar() {
    return (
        <div className='nav-flex'>
            <div  style={{display: 'flex', justifyContent: 'center'}}>
                <img src='src/assets/mineicon.webp' className='tiny-icon-nav'></img>
            </div>
            <div style={{display: "flex", gap: "30px"}}>
                <a href='/gallery'>Galeria de Fotos</a>
                <a href='/user'>Zona de Usuario</a>
            </div>

        </div>
    )
}
