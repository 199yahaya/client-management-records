import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <React.Fragment>
      <Link to="/client/add" className="btn btn-outline-danger btn-block mb-3">
        <i className="fas fa-plus" /> New Client
    </Link>

      <div className="card text-center bg-warning text-white mb-3">
        <div className="card-body">
          <h3>Interest</h3>
          <h4 className="display-4">
            0%
                  </h4>
          <a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
        </div>
      </div>

      <div className="card text-center bg-success text-white mb-3">
        <div className="card-body">
          <h3>Categories</h3>
          <h4 className="display-4">
            <i className="fas fa-folder"></i> 4
                  </h4>
          <a href="categories.html" className="btn btn-outline-light btn-sm">View</a>
        </div>
      </div>
    </React.Fragment>
  );
};
