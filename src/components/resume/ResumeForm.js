import React, { PropTypes } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import SaveCancelDelete from '../common/SaveCancelDelete';
import { connect } from 'react-redux';
import TextInput from './../common/TextInput';
import { required } from './../common/Validators';

class ResumeForm extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { initialValues, handleSubmit, onSave, onDelete, onCancel, pristine,
            submitting, saving, deleting, error } = this.props;

        // to hide delete button when creating new resume
        const isNew = !(initialValues.id && initialValues.id > 0);
        return (
            <form>
                <h1>Manage Resume</h1>
                <Field
                    label="Title"
                    name="title"
                    component={TextInput}
                    type="text"
                    placeholder="Software Engineer"
                    validate={required}
                />
                <Field
                    label="Description"
                    name="description"
                    component={TextInput}
                    type="text"
                    placeholder="Resume for Software Engineer role"
                    validate={required}
                />

                <div>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <SaveCancelDelete onSave={handleSubmit(onSave)} saving={saving} saveDisabled={pristine || submitting}
                    onDelete={handleSubmit(onDelete)} deleting={deleting} deleteDisabled={isNew || submitting}
                    onCancel={onCancel} />
            </form>
        );
    }
}

ResumeForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    deleting: PropTypes.bool,
    error: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ResumeForm.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

const ResumeFormRedux = connect(mapStateToProps)(ResumeForm);

export default reduxForm({
    form: 'resumeForm' // a unique identifier for this form
})(ResumeForm);


