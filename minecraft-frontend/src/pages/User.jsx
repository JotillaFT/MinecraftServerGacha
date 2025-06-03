import React, { useState, useEffect } from 'react';
import { fetchProtectedData, getPlayers, getNew } from '../logic/AuthController';
import { Avatar, Space, Popover } from 'antd';
import { Divider, Tooltip } from 'antd';
import '../css/Misc.css';
import ContentDisplay from '../components/ContentDisplay';
import NewsCard from '../components/NewsCard';

export default function User() {
  const [username, setUsername] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [newsData, setNewsData] = useState(null); // para la noticia

  useEffect(() => {
    fetchProtectedData().then(data => {
      if (data?.username) setUsername(data.username);
    });

    getPlayers().then(data => {
      if (data?.players) setPlayersList(data.players);
    });

    getNew(1).then(data => {
      if (data) setNewsData(data);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '40px' }}>
        <Avatar
          size={70}
          icon={<img src={`https://mc-heads.net/avatar/${username}`} alt={username} />}
        />
        <div className='oblique-text'>{username}, Bienvenido</div>
      </div>

      <div className='content-grid'>
        <ContentDisplay>
          <div>
                {newsData ? (
                <NewsCard data={newsData} />
            ) : (
                <div className='oblique-text'>Cargando noticia...</div>
            )}
          </div>
        </ContentDisplay>

        <ContentDisplay>
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
        </ContentDisplay>
      </div>
    </>
  );
}
