import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a9c301b2374429c8153dc65144bb486&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setLoading(false)
        settotalResults(parsedData.totalResults)
        props.setProgress(100);


    };
    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])
    const fetchMoreData = async () => {
        setPage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a9c301b2374429c8153dc65144bb486&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    }
    return (
        <>
            <div className="container my-3">
                <h3 className='my-3 text-center'>News Mania Top-Headlines</h3>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem NewsUrl={element.url} title={element.title.slice(0, 55)} desc={element.description !== null ? element.description.slice(0, 100) : element.description === ""} ImageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>

            </div>

        </>
    )
}
export default News

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: 'general'

}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
