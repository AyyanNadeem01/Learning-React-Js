import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize=16;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News category={'General'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/business" element={<News key="Business"category={'Business'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/entertainment" element={<News key="Entertianment"category={'Entertainment'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/health" element={<News key="Health"category={'Health'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/science" element={<News key="Science"category={'Science'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/sports" element={<News key="Sports"category={'Sports'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/technology" element={<News key="Technology"category={'Technology'} country={'us'}pagesize={this.pageSize} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
