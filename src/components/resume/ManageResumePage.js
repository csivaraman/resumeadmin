import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as ResumeActions from '../../actions/resumeActions';
import ResumeForm from './ResumeForm';
import { checkMinLen } from './../common/Validators';

export class ManageResumePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            resume: Object.assign({}, props.resume),            
            saving: false,
            deleting: false,
            dirty: false
        };
       
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {        
        this.setState({dirty: true});
    }

    resumeFormIsValid(resume) {
        let error = checkMinLen('Title', resume.title, 3);                
        if(error && error.length > 0)
            throw new SubmissionError({_error: error});        
        
        return true;        
    }

    saveResume(resume) {
        if (!this.resumeFormIsValid(resume))
            return;

        this.setState({ saving: true });
        return this.props.actions.saveResume(resume).then(
            () => {
                this.redirect('save');
            }).catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    deleteResume(resume) {
        this.setState({ deleting: true });
        
        return this.props.actions.deleteResume(resume).then(() => {
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
            <ResumeForm initialValues={this.state.resume}                  
                onSave={this.saveResume}
                onDelete={this.deleteResume}
                onChange={this.handleChange}
                onCancel={this.cancelResume}
                saving={this.state.saving}
                deleting={this.state.deleting}
                />
        );
    }
}

ManageResumePage.propTypes = {
    resume: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    route: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageResumePage.contextTypes = {
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
        id: 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageResumePage);
