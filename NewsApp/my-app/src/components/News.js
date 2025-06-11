import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Set document title based on category
  useEffect(() => {
    document.title = `${props.category ? props.category : 'Home'} - NewsMonkey`;
    updateNews(page);
    // eslint-disable-next-line
  }, []);

  const updateNews = async (pageNo) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${pageNo}&pageSize=${props.pagesize}`;
    setLoading(true);
    props.setProgress(25);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);

    const filteredArticles = parsedData.articles.filter(
      (article) =>
        article.title &&
        article.description &&
        article.urlToImage &&
        article.publishedAt &&
        article.author
    );

    setArticles(filteredArticles);
    setTotalResults(parsedData.totalResults);
    setHasMore(filteredArticles.length > 0);
    setLoading(false);
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${nextPage}&pageSize=${props.pagesize}`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      const newArticles = data.articles.filter(
        (article) =>
          article.title &&
          article.description &&
          article.urlToImage &&
          article.publishedAt &&
          article.author
      );
      setArticles((prevArticles) => prevArticles.concat(newArticles));
      setTotalResults(data.totalResults);
      setPage(nextPage);
      setHasMore(
        newArticles.length > 0 &&
          articles.length + newArticles.length < data.totalResults
      );
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  return (
    <div className="container my-3">
      {loading && <Spinner />}
      <h2 className="text-center">Top Headlines - {props.category}</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element, index) => (
                <div className="col-md-3 my-3" key={index}>
                  <Newsitem
                    title={element.title ? element.title : ''}
                    description={element.description ? element.description : ''}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt ? element.publishedAt : ''}
                    author={element.author ? element.author : ''}
                    source={element.source.name ? element.source.name : ''}
                  />
                </div>
              ))}
          </div>
        </div>
        {!hasMore && (
          <p className="text-center my-3">You have reached the limit.</p>
        )}
      </InfiniteScroll>
    </div>
  );
};

// PropTypes and defaultProps
News.defaultProps = {
  country: 'us',
  pagesize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;


///////////////////////////////////////////////////////////

//Class Version of News Component

// import React, { Component } from 'react';
// import Newsitem from './Newsitem';
// import Spinner from './spinner';
// import proptypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";


// export class News extends Component {

//     static defaultProps = {
//         country: 'us',
//         pagesize: 8,
//         category: 'general',
//     }
//     static propTypes = {
//         country: proptypes.string,
//         pagesize: proptypes.number,
//         category: proptypes.string,
//     }
//     constructor(props) {
//         super(props);
//         console.log('Hello I am a constructor from News component');
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//             totalResults: 0,
//             hasMore: true,
//         };
//         document.title = `${this.props.category?this.props.category:'Home'} - NewsMonkey`;
//     }

//     async updateNews(pageNo) {
//         this.props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
//         this.setState({ loading: true });
//         this.props.setProgress(25);
//         let data = await fetch(url);
//         let parsedData = await data.json();
        
//         this.props.setProgress(70);
//         this.setState({
//             articles: parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author),
//             totalResults: parsedData.totalResults,
//             loading: false,
//             hasMore: parsedData.articles.length > 0
//         });
//         this.props.setProgress(100);
//     }
//     // Fetching the data on component mount
//     async componentDidMount() {
//         this.setState({ loading: true });
//         this.updateNews(this.state.page);
//     }

//     // handlePrevClick = async () => {
//     //     this.setState(
//     //         { page: this.state.page - 1 },
//     //         () => {
//     //             this.updateNews(this.state.page);
//     //         }
//     //     );
//     // }
    
//     // // Handling the Next button click to load the next page
//     // handleNextClick = () => {
//     //     this.setState(
//     //         prevState => ({ page: prevState.page + 1 }),
//     //         () => {
//     //             this.updateNews(this.state.page);
//     //         }
//     //     );
//     // }

//     fetchMoreData = async () => {
//         const nextPage = this.state.page + 1;
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pagesize}`;
        
//         fetch(url)
//           .then((response) => response.json())
//           .then((data) => {
//             const newArticles = data.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author);
//             this.setState((prevState) => ({
//               articles: prevState.articles.concat(newArticles),
//               totalResults: data.totalResults,
//               page: nextPage,
//               hasMore: newArticles.length > 0 && prevState.articles.length + newArticles.length < data.totalResults,
//             }));
//           })
//           .catch((error) => {
//             console.error('Error fetching more data:', error);
//           });
//       };
      
    
//     render() {
//         return (
//             <div className="container my-3">
//                 {this.state.loading &&<Spinner />}
//                 <h2 className="text-center">Top Headlines - {this.props.category}</h2>
//                 <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.hasMore}
//           loader={<Spinner />}>
//             <div className="container">
//                 <div className="row">
//                     {!this.state.loading &&this.state.articles.map((element, index) => {
//                         return (
//                             <div className="col-md-3 my-3" key={index}>
//                                 <Newsitem
//                                     title={element.title ? element.title : ""}
//                                     description={element.description ? element.description : ""}
//                                     imageUrl={element.urlToImage}
//                                     newsUrl={element.url}
//                                     publishedAt={element.publishedAt ? element.publishedAt : ""}
//                                     author={element.author ? element.author : ""}
//                                     source={element.source.name ? element.source.name : ""}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </div>
//                 </div>
//                 {!this.state.hasMore && (
//     <p className="text-center my-3">You have reached the limit.</p>
//   )}
//                 </InfiniteScroll>
//                 {/* <div className="container d-flex justify-content-between">
//                     <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-primary mx-3">
//                         &larr; Previous
//                     </button>
//                     <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.handleNextClick} className="btn btn-primary">
//                         Next &rarr;
//                     </button>
//                 </div> */}
//             </div>
//         );
//     }
// }

// export default News;