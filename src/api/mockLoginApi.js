import delay from './delay';
import HelperApi from './helperApi';
import users from './../data/user-data';
let bcrypt = require('bcryptjs');

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

class LoginApi {

    static isAuthenticated() {
        let user = JSON.parse(localStorage.getItem('user')) || null;
        return user != null;
    }

    static register(newUser) {
        newUser = Object.assign({}, newUser); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // validation
                let duplicateUser = users.filter(existingUser => { return existingUser.username === newUser.username; }).length;
                if (duplicateUser) {
                    reject('Username "' + newUser.username + '" is already taken');
                    return;
                }

                // save new user
                newUser.id = HelperApi.generateNewId(users);

                // hash password   
                bcrypt.hash(newUser.password, 10, (err, hash) => {
                    newUser.password = hash;
                    users.push(newUser);

                    resolve(newUser);
                });                           
                               
            }, delay);
        });
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Get the user info based on user name
                let filteredUsers = users.filter(user => {
                    return user.username === username;
                });

                if (filteredUsers.length) {
                    let user = filteredUsers[0];
                    
                    bcrypt.compare(password, user.password).then(res=> {
                        if (res == true) {                            
                            localStorage.setItem('user', JSON.stringify(user));
                            resolve(user);
                        } else {
                            reject('Username or password is incorrect');
                        }
                    }).catch(error => {
                        reject(error);
                    });                    
                }
                else {
                    // else return error
                    reject('Username is incorrect');
                }

            }, delay);
        });
    }

    static logout() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                localStorage.setItem('user', null);
                resolve();

            }, delay);
        });
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], users));
            }, delay);
        });
    }

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfUserToDelete = users.findIndex(user => {
                    return user.id == id;
                });
                users.splice(indexOfUserToDelete, 1);

                resolve();
            }, delay);
        });
    }
}

export default LoginApi;
