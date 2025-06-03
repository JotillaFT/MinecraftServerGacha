import React from 'react';
import { Card, Tag, Typography } from 'antd';
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
    <Card
      hoverable
      size="small"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}
      bodyStyle={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}
    >
      <div style={{ flex: 1 }}>
        <Title level={5} style={{ margin: 0 }}>{data.title}</Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>{data.date} — {data.author}</Text>
        <div>
          <Text ellipsis>{data.information}</Text>
        </div>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {flagToTag(data.flags)}
      </div>
    </Card>
  );
};

export default NewsCard;
