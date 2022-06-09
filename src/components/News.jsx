import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { text, Title } = Typography;
const { Option } = Select;
 
const News = ({ simplified }) => {
    const count = simplified ? 6 : 12;
    const { data: cryptoNews } = useGetCryptoNewsQuery({newsCatagory: "", count: count});

    if(!cryptoNews?.value) return 'Loading....';

    return (
        <Row gutter={[24, 24]}>
            {cryptoNews?.value.map((news, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title level={4} className="news-title">{news.name}</Title>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News