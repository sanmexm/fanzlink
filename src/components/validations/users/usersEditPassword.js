const userValidatePassword = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate password
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if (!passwordRegex.test(postData)) {
      errors.push('Password must be at least 8 characters long, must contain one capital letter and one number');
      isValid = false;
    }else if(postData.includes(" ")) {
      errors.push('Password cannot have spaces');
      isValid = false;
    }
    return { isValid, errors };
}

const userValidateConfirmPassword = (postData) => {
    // the confirm password function should connect from the postData since youre comparing two fields
    const errors = [];
    let isValid  = true;
    // validate confirm password
    if (postData.password !== postData.confirmPassword) {
      errors.push('Passwords do not match');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidatePassword,
    userValidateConfirmPassword,
}