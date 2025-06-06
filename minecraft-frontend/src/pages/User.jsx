import React, { useState, useEffect } from 'react';
import { fetchProtectedData, getPlayers, getNewsList } from '../logic/AuthController';
import { Avatar, Space, Popover, Skeleton, Divider, Pagination } from 'antd';
import '../css/Misc.css';
import ContentDisplay from '../components/ContentDisplay';
import NewsCard from '../components/NewsCard';
import { Navigate } from "react-router-dom";

export default function User() {
  const [username, setUsername] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    Promise.all([
      fetchProtectedData().then(data => {
        if (data && data.username) {
          setUsername(data.username);
        } else {
          setShouldNavigate(true);
        }
      }),
      getPlayers().then(data => {
        if (data?.players) setPlayersList(data.players);
      }),
      getNewsList(5).then(data => {
        if (Array.isArray(data)) setNewsList(data);
      })
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedNews = newsList.slice(startIdx, endIdx);


  if (shouldNavigate) {
    return <Navigate to="/" replace />;
  }

  return (
    <Skeleton active loading={loading} avatar paragraph={{ rows: 8 }}>
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
            <div className='oblique-text' style={{marginTop: "15px"}}>Panel de noticias</div>
            {newsList.length > 0 ? (
              <>
                {paginatedNews.map((news, idx) => (
                  <React.Fragment key={news.id || idx}>
                    <Divider />
                    <NewsCard data={news} />
                  </React.Fragment>
                ))}
                <Pagination
                  style={{ marginTop: 20, textAlign: "center" }}
                  current={currentPage}
                  pageSize={pageSize}
                  total={newsList.length}
                  onChange={page => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </>
            ) : (
              <div className='oblique-text'>Cargando noticias...</div>
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
    </Skeleton>
  );
}
