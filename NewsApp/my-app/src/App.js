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
            <Route exact path="/" element={<News category={'general'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/business" element={<News key="business"category={'business'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/entertainment" element={<News key="entertianment"category={'entertainment'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/health" element={<News key="health"category={'health'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/science" element={<News key="science"category={'science'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/sports" element={<News key="sports"category={'sports'} country={'us'}pagesize={this.pageSize} />} />
            <Route exact path="/technology" element={<News key="technology"category={'technology'} country={'us'}pagesize={this.pageSize} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
