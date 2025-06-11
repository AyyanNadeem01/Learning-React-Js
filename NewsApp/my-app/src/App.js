import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize=16;
  apiKey=process.env.REACT_APP_NEWS_API_KEY;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
        
      <LoadingBar
        height={4}
        color="#f11946"
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey}setProgress={this.setProgress}category={'General'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/business" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Business"category={'Business'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Entertianment"category={'Entertainment'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/health" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Health"category={'Health'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/science" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Science"category={'Science'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/sports" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Sports"category={'Sports'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/technology" element={<News apiKey={this.apiKey}setProgress={this.setProgress}key="Technology"category={'Technology'} country={'us'}pagesize={this.pageSize} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
