import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './spinner';
import proptypes from 'prop-types';


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
    constructor() {
        super();
        console.log('Hello I am a constructor from News component');
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    // Fetching the data on component mount
    async componentDidMount() {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=715d88aef10f41048db9ab80c2f4588d&page=1&pageSize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        // Debugging logs
        console.log("Total Results: ", parsedData.totalResults);
        console.log("Fetched Articles on this page: ", parsedData.articles.length);
        console.log("Filtered Articles on this page: ", parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt &&article.author).length && parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt &&article.author).length);
        console.log("Parsed Data: ", parsedData);

        this.setState({
            articles: parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    // Handling the Previous button click to load the previous page
    handlePrevClick = async () => {
        console.log("Previous");
        if(this.state.page>1){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=715d88aef10f41048db9ab80c2f4588d&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        // Debugging logs
        console.log("Total Results: ", parsedData.totalResults);
        console.log("Fetched Articles on this page: ", parsedData.articles.length);
        console.log("Filtered Articles on this page: ", parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author).length);

        this.setState({
            articles: parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt && article.author),
            page: this.state.page - 1,
            loading: false,
        });
    }
    }

    // Handling the Next button click to load the next page
    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=715d88aef10f41048db9ab80c2f4588d&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        // Debugging logs
        console.log("Total Results: ", parsedData.totalResults);
        console.log("Fetched Articles on this page: ", parsedData.articles.length);
        console.log("Filtered Articles on this page: ", parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt).length);

        this.setState({
            articles: parsedData.articles.filter(article => article.title && article.description && article.urlToImage && article.publishedAt ),
            page: this.state.page + 1,
            loading: false
        });
    }
}
    render() {
        return (
            <div className="container my-3">
                {this.state.loading &&<Spinner />}
                <h2 className="text-center">Top Headlines</h2>

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

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-primary mx-3">
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} onClick={this.handleNextClick} className="btn btn-primary">
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;