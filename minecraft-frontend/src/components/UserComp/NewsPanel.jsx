import React, {useState} from "react";
import {Divider, Pagination} from "antd";
import NewsCard from "../NewsCard.jsx";
import ContentDisplay from "../ContentDisplay.jsx";

export default function NewsPanel({newsList}) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const paginatedNews = newsList.slice(startIdx, endIdx);

    return (
        <ContentDisplay>
            <ContentDisplay>
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
            </ContentDisplay>
        </ContentDisplay>
    )
}