import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props;
    return (
      <div>
        <div className="card position-relative" style={{ width: "18rem" }}>
          <div className="position-relative">
            <img
              src={imageUrl}
              className="card-img-top"
              alt="..."
              style={{ height: '180px', objectFit: 'cover', width: '100%' }}
            />
            
            {/* Badge inside image corner */}
            <span
              className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
              style={{ zIndex: 1, margin: '8px' }}
            >
              {source}
            </span>
          </div>

          <div className="card-body" style={{ height: '250px' }}>
            <h5 className="card-title">{title.slice(0, 45)}</h5>
            <p className="card-text">{description.slice(0, 88)}</p>
            <p className='card-text'>By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
