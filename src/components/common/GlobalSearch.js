import React, { PropTypes } from 'react';

const GlobalSearch = ({ items, searchTerm, onChange }) => {
    const numEntries = (items.length == 0) ? "No entries found" :
        (items.length + (items.length > 1 ? " Entries" : " Entry"));

    return (
        <div>
            <div className="alert alert-info">
                {numEntries}
            </div>

            {
                ((items && items.length > 0) || (items.length === 0 && searchTerm.length > 0)) &&
                <div>
                    <input className="form-control" name="search" type="text" placeholder="search"
                        aria-label="search" value={searchTerm} onChange={onChange} />
                    <br />
                </div>
            }

        </div>
    );
};

GlobalSearch.propTypes = {
    items: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default GlobalSearch;