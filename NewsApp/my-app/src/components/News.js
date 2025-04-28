import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './spinner';
import proptypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'us',
        pagesize: 8,
        category: 'general',
    }
    static propTypes = {
        country: proptypes.string,
        pagesize: proptypes.number,
        category: proptypes.string,
    }
    constructor(props) {
        super(props);
        console.log('Hello I am a constructor from News component');
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.props.category?this.props.category:'Home'} - NewsMonkey`;
    }

    async updateNews(pageNo) {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=715d88aef10f41048db9ab80c2f4588d&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    // Fetching the data on component mount
    async componentDidMount() {
        this.setState({ loading: true });
        this.updateNews(this.state.page);
    }

    // handlePrevClick = async () => {
    //     this.setState(
    //         { page: this.state.page - 1 },
    //         () => {
    //             this.updateNews(this.state.page);
    //         }
    //     );
    // }
    
    // // Handling the Next button click to load the next page
    // handleNextClick = () => {
    //     this.setState(
    //         prevState => ({ page: prevState.page + 1 }),
    //         () => {
    //             this.updateNews(this.state.page);
    //         }
    //     );
    // }

    fetchMoreData = async () => {
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=715d88aef10f41048db9ab80c2f4588d&page=${nextPage}&pageSize=${this.props.pagesize}`;
        
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    articles: this.state.articles.concat(data.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author)),
                    totalResults: data.totalResults,
                    page: nextPage
                });
            })
            .catch((error) => {
                console.error('Error fetching more data:', error);
            });
    };
    
    
    render() {
        return (
            <div className="container my-3">
                {this.state.loading &&<Spinner />}
                <h2 className="text-center">Top Headlines - {this.props.category}</h2>
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}>
            <div className="container">
                <div className="row">
                    {!this.state.loading &&this.state.articles.map((element, index) => {
                        return (
                            <div className="col-md-3 my-3" key={index}>
                                <Newsitem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    publishedAt={element.publishedAt ? element.publishedAt : ""}
                                    author={element.author ? element.author : ""}
                                    source={element.source.name ? element.source.name : ""}
                                />
                            </div>
                        );
                    })}
                </div>
                </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-primary mx-3">
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.handleNextClick} className="btn btn-primary">
                        Next &rarr;
                    </button>
                </div> */}
            </div>
        );
    }
}

export default News;