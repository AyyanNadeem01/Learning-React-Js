import React from 'react'

export default function About() {
  return (
<div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="card-title text-center mb-3">About TextUtils</h2>
          <p className="card-text text-muted text-center">
            A simple and efficient text manipulation tool to enhance productivity.
          </p>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✔ Convert text to uppercase/lowercase</li>
                <li className="list-group-item">✔ Remove extra spaces</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✔ Count words and characters</li>
                <li className="list-group-item">✔ Copy text to clipboard</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary px-4">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}
