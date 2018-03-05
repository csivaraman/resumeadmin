export const required = (value) => {
    if (!value) {
      return 'This field is required!';
    }
  };

export const passwordMatch = (fields) => {
    const {password, passwordConfirm} = fields;
    
    if(password !== passwordConfirm)
    {        
        return 'Passwords do not match';
    }
};

export const checkMinLen = (fieldName, fieldValue, minLen) => {
    
    if(fieldValue.length < minLen)
    {        
        return fieldName + ' must be atleast ' + minLen + ' characters.';
    }
};