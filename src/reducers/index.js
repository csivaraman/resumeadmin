import { combineReducers } from 'redux';
import user from './loginReducer';
import courses from './courseReducer';
import authors from './authorReducer';
import resumes from './resumeReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user,
  courses,
  authors,
  resumes,
  ajaxCallsInProgress,
  form: formReducer
});

export default rootReducer;
