import React, { useState, useEffect } from 'react';
import { Avatar, Skeleton} from 'antd';
import '../css/Misc.css';
import {fetchProtectedData, getPlayers, getNewsList, getServerInfo} from '../logic/AuthController';
import ContentDisplay from '../components/ContentDisplay';
import { Navigate } from "react-router-dom";
import NewsPanel from "../components/UserComp/NewsPanel.jsx";
import PlayersPanel from "../components/UserComp/PlayersPanel.jsx";
import ServerInfo from "../components/UserComp/ServerInfo.jsx";
import {Toaster} from "react-hot-toast";

export default function User() {
  const [username, setUsername] = useState('');
  const [playersList, setPlayersList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverInfo, setServerInfo] = useState(null);


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
      }),
      getServerInfo().then(data => {
        setServerInfo(data)
      })
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  if (shouldNavigate) {
    return <Navigate to="/" replace />;
  }

  return (
    <Skeleton active loading={loading} avatar paragraph={{ rows: 8 }}>
      <Toaster />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '40px' }}>
        <Avatar
          size={70}
          icon={<img src={`https://mc-heads.net/avatar/${username}`} alt={username} />}
        />
        <div className='oblique-text'>{username}, Bienvenido</div>
      </div>

      <div className='content-grid'>
        <PlayersPanel playersList={playersList}></PlayersPanel>
        <ServerInfo serverInfo={serverInfo}></ServerInfo>
      </div>

      <NewsPanel newsList={newsList} ></NewsPanel>
    </Skeleton>
  );
}
