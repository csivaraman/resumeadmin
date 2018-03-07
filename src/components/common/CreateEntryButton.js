import React, { PropTypes } from 'react';

const CreateEntryButton = ({ name, onClick }) => {
    const buttonValue = "Add " + name;
    return (
        <h1>{name}
            <span>
                <input
                    type="submit"
                    value={buttonValue}
                    className="btn btn-primary pull-right"
                    onClick={onClick} />
            </span>
        </h1>
    );
};

CreateEntryButton.propTypes = {
    name: PropTypes.string.isRequired,    
    onClick: PropTypes.func.isRequired
};

export default CreateEntryButton;