import React, { PropTypes } from 'react';
import ReactTable from 'react-table';

const Table = ({ data, columns, getTrProps }) => {
    let defaultPageSize = 5;

    if (data.length <= defaultPageSize)
        defaultPageSize = data.length;

    return (        
            data && data.length > 0 &&
            <div>
            <p className="bold-text">Tip: Click on column header to sort. Hold shift when sorting to multi-sort!</p>                        
        <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={defaultPageSize}
                className="-striped -highlight"
                getTrProps={getTrProps}
            />
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    getTrProps: PropTypes.func
};

export default Table;