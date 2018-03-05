import React from 'react';
import TextInput_Old from '../backup/TextInput_Old';
import SelectInput from '../common/SelectInput';

const CourseForm = ({ course, allAuthors, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>Manage Course</h1>
      <TextInput_Old
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title} />

      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId} />

      <TextInput_Old
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category} />

      <TextInput_Old
        name="length"
        label="Length"
        value={course.length}
        onChange={onChange}
        error={errors.length} />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
    </form>
  );
};

CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CourseForm;