import delay from './delay';
import HelperApi from './helperApi';
import resumes from './../data/resume-data';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

class resumeApi {

  static getAllResumes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], resumes));
      }, delay);
    });
  }

  static saveResume(resume) {    
    resume = Object.assign({}, resume); // to avoid manipulating object passed in.        
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minResumeTitleLength = 1;
        if (resume.title.length < minResumeTitleLength) {
          reject(`Title must be at least ${minResumeTitleLength} characters.`);
        }

        if (resume.id) {
          const existingResumeIndex = resumes.findIndex(a => a.id == resume.id);          
          resumes.splice(existingResumeIndex, 1, resume);                    
        } else {
          //Just simulating creation here.
          //The server would generate ids for new Resume items in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          resume.id = HelperApi.generateNewId(resumes);
                
          resumes.push(resume);
        }

        resolve(resume);
      }, delay);
    });
  }

  static deleteResume(resume) {
    resume = Object.assign({}, resume); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        const indexOfResumeToDelete = resumes.findIndex(item => {          
          return item.id === resume.id;
        });

        if (indexOfResumeToDelete !== -1)
          resumes.splice(indexOfResumeToDelete, 1);
        else
          reject(`ERROR: Resume item index to be deleted not found.`);
          
          resolve(resume);
      }, delay);
    });
  }
}

export default resumeApi;
