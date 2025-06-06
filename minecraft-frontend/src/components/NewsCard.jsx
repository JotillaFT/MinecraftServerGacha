import React from 'react';
import { Card, Tag, Typography } from 'antd';
import '../css/Misc.css';


const { Title, Text } = Typography;
const flagToTag = (flag) => {
  switch (flag) {
    case 1:
      return <Tag color="blue">INFO</Tag>;
    case 2:
      return <Tag color="green">NEW</Tag>;
    case 3:
      return <Tag color="red">IMPORTANT</Tag>;
    default:
      return <Tag>UNKNOWN</Tag>;
  }
};

const NewsCard = ({ data }) => {
  return (
    <div style={{padding: "20px", backgroundColor: "#F05454"}} >
      <div style={{display: "flex", justifyContent: "center", gap: "30px", alignItems: "center"}}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap:"10px"}}>
          {flagToTag(data.flags)}
         <div>
            <Title level={4} style={{ margin: 0}} className='base-text-bebas'>{data.title}</Title>
            <Text type="secondary" style={{ fontSize: '15px'}} className='base-text-bebas'>{data.date} — {data.author}</Text>
         </div>
        </div>
        <div>
          <Text ellipsis className='base-text-bebas'>{data.information}</Text>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
