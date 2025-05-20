import '../css/Navbar.css'

export default function Navbar() {
    return (
        <div className='nav-flex'>
            <div  style={{display: 'flex', justifyContent: 'center'}}>
                <img src='src/assets/mineicon.webp' className='tiny-icon-nav'></img>
            </div>
            <div>
                <button className='link-navbar' href="">Login</button>
            </div>
        </div>
    )
}
