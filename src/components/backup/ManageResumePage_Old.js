import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ResumeActions from '../../actions/resumeActions';
import ResumeForm_Old from './../backup/ManageResumePage_Old';
import toastr from 'toastr';

export class ManageResumePage_Old extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            resume: Object.assign({}, props.resume),
            errors: {},
            saving: false,
            deleting: false,
            dirty: false
        };

        this.updateResumeState = this.updateResumeState.bind(this);
        this.saveResume = this.saveResume.bind(this);
        this.deleteResume = this.deleteResume.bind(this);
        this.cancelResume = this.cancelResume.bind(this);
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty)
                return 'You have unsaved information, are you sure you want to leave this page?';
        });
    }

    componentWillReceiveProps(nextProps) {        
        if (this.props.resume && nextProps.resume && 
            this.props.resume.id != nextProps.resume.id) {
            // Necessary to populate form when existing resume item is loaded directly.
            this.setState({ resume: Object.assign({}, nextProps.resume) });
        }
    }

    updateResumeState(event) {
        this.setState({ dirty: true });
        const field = event.target.name;
        let resume = Object.assign({}, this.state.resume);
        resume[field] = event.target.value;
        return this.setState({ resume: resume });
    }

    resumeFormIsValid() {
        let formIsValid = true;
        let errors = {};
        let resume = this.state.resume;
        
        if (resume.title.length < 3) {
            errors.title = "Title must be at least 3 characters.";
            formIsValid = false;
        }
        
        if (resume.description.length <= 0)
        {
            errors.description = "Description is required.";
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveResume(event) {
        event.preventDefault();

        if (!this.resumeFormIsValid())
            return;

        this.setState({ saving: true });
        this.props.actions.saveResume(this.state.resume).then(
            () => {
                this.redirect('save');
            }).catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    deleteResume(event) {
        event.preventDefault();

        this.setState({ deleting: true });
        this.props.actions.deleteResume(this.state.resume).then(() => {
            this.redirect('delete');
        }).catch(error => {
            toastr.error(error);
            this.setState({ deleting: false });
        });
    }

    cancelResume() {
        this.redirect('');
    }    

    redirect(mode) {
        let msg = '';
        if (mode == 'save') {
            this.setState({ saving: false, dirty: false });
            msg = 'Resume item saved.';
        } else if (mode == 'delete') {
            this.setState({ deleting: false, dirty: false });
            msg = 'Resume item deleted.';
        }

        msg && toastr.success(msg);
        this.context.router.push('/index/resumes');
    }

    render() {
        return (
            <ResumeForm_Old
                resume={this.state.resume}
                onChange={this.updateResumeState}
                onSave={this.saveResume}
                onDelete={this.deleteResume}
                onCancel={this.cancelResume}
                saving={this.state.saving}
                deleting={this.state.deleting}
                errors={this.state.errors} />
        );
    }
}

ManageResumePage_Old.propTypes = {
    resume: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    route: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageResumePage_Old.contextTypes = {
    router: PropTypes.object
};

function getResumeById(resumes, resumeId) {
    const resume = resumes.filter(resume => resume.id == resumeId);
    if (resume)
        return resume[0]; // since filter returns an array, have to grab the first
    else
        return null;
}

function mapStateToProps(state, ownProps) {    
    let resume = {
        id: '',
        title: '',
        description: ''
    };

    if(ownProps.params)
    {
        const resumeId = ownProps.params.id; // from the path '/resume/:id'
        if (resumeId && state.resumes.length > 0) {
            resume = getResumeById(state.resumes, resumeId);
        }
    }    

    return {
        resume: resume
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ResumeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageResumePage_Old);
