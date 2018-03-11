import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import GlobalSearch from './../common/GlobalSearch';
import CreateEntryButton from './../common/CreateEntryButton';
import Table from './../common/Table';

class ResumePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchTerm: '',
      filteredResumes: props.resumes
    };
    
    this.onSearchChange = this.onSearchChange.bind(this);    
  }

  // Repopulate 'filteredResumes' state upon page refresh if search term is empty
  // and 'filtered' items don't equal 'total' items count
  componentWillReceiveProps(newProps) {
    let { searchTerm, filteredResumes } = this.state;
    let { resumes } = newProps;

    if (searchTerm.length === 0 && filteredResumes.length != resumes.length) {
      this.setState({ filteredResumes: resumes });
    }
  }

  // Filter resume items on 'search' box's input value change
  onSearchChange(event) {
    let query = event.target.value;
    let { resumes } = this.props;

    // Use Object.keys to loop through the properties of the object. Use reduce and filter to make the code more efficient
    const newlyDisplayed = resumes.filter((item) => {
      return Object.keys(item).reduce((acc, curr) => {
        return acc || item[curr].toString().toLowerCase().includes(query.toLowerCase());
      }, false);
    });

    this.setState({
      searchTerm: event.target.value,
      filteredResumes: newlyDisplayed
    });
  }

  // redirect to 'create new resume item' form
  redirectToCreateResumeItemPage() {
    browserHistory.push('/index/resume');
  }

  redirectOnTableRowClick(state, rowInfo, column) {

    return {
      onClick: (e, handleOriginal) => {
        browserHistory.push('/index/resume/' + rowInfo.row.id);

        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal();
        }
      }
    };
  }

  render() {
    const { filteredResumes } = this.state;
    const columns = [
      {
        id: 'id',
        Header: 'Id',
        accessor: 'id',
        show: false
      },
      {
        Header: 'Title',
        accessor: 'title',
        headerClassName: 'bg-primary border-white',
        Cell: cellInfo => (
          <Link
                to={'/index/resume/' + cellInfo.original.id}
                id={cellInfo.original.id}>{cellInfo.original.title}</Link>)
      },
      {
        Header: 'Description',
        accessor: 'description',
        headerClassName: 'bg-primary border-white'     
      }];

    return (
      <div>
        <CreateEntryButton name="Resume" onClick={this.redirectToCreateResumeItemPage} />
        <GlobalSearch items={filteredResumes} searchTerm={this.state.searchTerm} onChange={this.onSearchChange} />
        <Table data={filteredResumes} columns={columns} />

      </div>
    );
  }
}

ResumePage.propTypes = {
  resumes: PropTypes.array.isRequired,
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    resumes: state.resumes
  };
}

export default connect(mapStateToProps)(ResumePage);
