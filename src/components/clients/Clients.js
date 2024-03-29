import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    // console.log(clients.length)

    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      console.log(clients.length);
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <div className="card text-center bg-info text-white mb-3">
                <div className="card-body">
                  <h3>Available Clients</h3>
                  <h4 className="display-4">
                    {clients.length}
                  </h4>
                  <a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
                </div>
              </div>
              <h2>
                {' '}
                <i className="fas fa-users" /> Clients{' '}
              </h2>
            </div>
            <div className="col-md-6">
              <div className="card text-center bg-danger text-white mb-3">
                <div className="card-body">
                  <h3>Total Balanced Owed:</h3>
                  <h4 className="display-4">
                    ${parseFloat(totalOwed).toFixed(2)}
                  </h4>
                  <a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
                </div>
              </div>

            </div>
          </div>

          <table className="table table-striped table-info   table-hover">
            <thead className="thead bg-danger text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-info btn-sm"
                    >
                      <i className="fas fa-info-circle" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
