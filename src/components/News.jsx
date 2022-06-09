import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://picsum.photos/420/320?image=0';
 
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
                                <img
                                    style={{ maxWidth: '200px', maxHeight: '100px'}}
                                    src={news?.image?.thumbnail?.contentUrl || demoImage }
                                    alt="news"
                                />
                            </div>
                            <p>
                                {news.description > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description 
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail.contentUrl || demoImage } alt=""/>
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                            
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News