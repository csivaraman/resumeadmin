import { combineReducers } from 'redux';
import user from './loginReducer';
import resumes from './resumeReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user,
  resumes,
  ajaxCallsInProgress,
  form: formReducer
});

export default rootReducer;
