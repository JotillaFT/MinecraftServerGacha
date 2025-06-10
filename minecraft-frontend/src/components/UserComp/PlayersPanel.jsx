import {Avatar, Popover} from "antd";
import React from "react";

export default function PlayersPanel({playersList}) {
    return (
        <div style={{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}}>
            <div className='oblique-text'>Jugadores Activos</div>
            {playersList.length > 0 ? (
                <Avatar.Group>
                    {playersList.map(player => (
                        <Popover content={player} key={player}>
                            <Avatar src={`https://mc-heads.net/avatar/${player}`} alt={player}>
                                {player[0]}
                            </Avatar>
                        </Popover>
                    ))}
                </Avatar.Group>
            ) : (
                <div className='oblique-text' style={{ fontSize: '20px' }}>
                    No hay jugadores conectados
                </div>
            )}
        </div>
    )
}