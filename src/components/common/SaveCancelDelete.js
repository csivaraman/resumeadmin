import React, { PropTypes } from 'react';

const SaveCancelDelete = ({ onSave, onDelete, onCancel, saving, deleting, saveDisabled, deleteDisabled }) => {
    return (        
        <div className="row">
            <div className="col-xs-2">
                <input
                    id="savebutton"
                    type="submit"
                    disabled={saveDisabled}
                    value={saving ? 'Saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave} />
            </div>

            {
                onDelete &&
                <div className="col-xs-2">
                    <input
                        id="deletebutton"
                        type="submit"
                        disabled={deleteDisabled}
                        value={deleting ? 'Deleting...' : 'Delete'}
                        className="btn btn-primary"
                        onClick={onDelete} />
                </div>
            }

            <div className="col-xs-2">
                <input
                    type="submit"
                    value="Cancel"
                    className="btn btn-primary"
                    onClick={onCancel} />
            </div>
        </div>
    );
};

SaveCancelDelete.propTypes = {
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    deleting: PropTypes.bool,
    saveDisabled: PropTypes.bool.isRequired,
    deleteDisabled: PropTypes.bool
};

export default SaveCancelDelete;