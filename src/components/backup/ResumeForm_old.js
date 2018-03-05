import React from 'react';
import TextInput from '../common/TextInput';
import SaveCancelDelete from '../common/SaveCancelDelete';

const ResumeForm_Old = ({ resume, onSave, onChange, onDelete, onCancel, saving, deleting, errors }) => {
  return (
    <form>
      <h1>Manage Resume</h1>
      <TextInput
        name="title"
        label="Title"
        autofocus="true"        
        value={resume.title}
        onChange={onChange}
        error={errors.title}
        required="true" />

        <TextInput
        name="description"
        label="Description"        
        value={resume.description}
        onChange={onChange}
        error={errors.description} 
        required="true"/>

      <SaveCancelDelete onSave={onSave} saving={saving}
        onDelete={onDelete} deleting={deleting}
        onCancel={onCancel} />      
    </form>
  );
};

ResumeForm_Old.propTypes = {
  resume: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  deleting: PropTypes.bool,
  errors: PropTypes.object
};

export default ResumeForm_Old;
