import delay from './delay';
import HelperApi from './helperApi';
import resumesData from './../data/resume-data';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

class resumeApi {

  static getAllResumes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], resumesData.resumes));
      }, delay);
    });
  }

  static saveResume(resume) {
    resume = Object.assign({}, resume); // to avoid manipulating object passed in.  
    let resumes = [];    

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minResumeTitleLength = 1;
        if (resume.title.length < minResumeTitleLength) {
          reject(`Title must be at least ${minResumeTitleLength} characters.`);
        }

        if (resume.id) {          
          resumes = [...resumesData.resumes.filter(r => r.id !== resume.id), resume];
        } else {
          //Just simulating creation here.
          //The server would generate ids for new Resume items in a real app.
          //Cloning so copy returned is passed by value rather than by reference.                    
          resume.id = HelperApi.generateNewId(resumesData.resumes);                    
          resumes = [...resumesData.resumes, resume];          
        }        

        resumesData.resumes = resumes;        

        resolve(resume);
      }, delay);
    });
  }

  static deleteResume(resume) {
    resume = Object.assign({}, resume); // to avoid manipulating object passed in.
    let resumes = [];
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        const indexOfResumeToDelete = resumesData.resumes.findIndex(item => {
          return item.id === resume.id;
        });

        if (indexOfResumeToDelete !== -1) {
          resumes = resumesData.resumes.filter(r => r.id !== resume.id);
          resumesData.resumes = resumes;
        }
        else
          reject(`ERROR: Resume item index to be deleted not found.`);

        resolve(resume);
      }, delay);
    });
  }
}

export default resumeApi;
