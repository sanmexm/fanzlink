const userValidateFirstName = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate first Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('first name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('first name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

const userValidateLastName = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate last Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('last name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('last name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

const userValidatePrimaryPhone = (postData) => {
    const errors = [];
    let isValid  = true;
    //validate phone number
    const phoneRegex = /\(\d{3}\)\s*\d{3}-\d{4}/;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (!phoneRegex.test(postData)) {
        errors.push('Invalid primary phone, Phone format must - (044) 456-7890');
        isValid = false;
    }
    return { isValid, errors };
}

const userValidateEmailAddress = (postData) => {
    const errors = [];
    let isValid  = true;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    // validate Email Address
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (!emailRegex.test(postData)) {
        errors.push('invalid email address');
        isValid = false;
    }
    return { isValid, errors };
}

const userValidateMessage = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate description
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if(postData.length < 4){
      errors.push('Message must be at least 4 characters');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidateFirstName,
    userValidateLastName,
    userValidatePrimaryPhone,
    userValidateEmailAddress,
    userValidateMessage,
}