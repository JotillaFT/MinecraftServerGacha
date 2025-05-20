import React from 'react';
import { Divider } from 'antd';
import '../css/Misc.css'

export default function Footer(){

    return (
        <footer style={{marginTop: "15dvh"}}>
            <Divider></Divider>
            <div  style={{display: 'flex', justifyContent: 'center', gap: 20, alignItems: "center"}}>
                <img src='src/assets/mineicon.webp' className='tiny-icon'></img>
                <p className='base-text' >Hommy Minecraft Server</p>
            </div>
        </footer>
    )
}