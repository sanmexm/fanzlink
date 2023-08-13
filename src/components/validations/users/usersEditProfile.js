const usernames       = ["seun12", "ayo123", "jude12", "dele12", "mark12", "john12", "ebiere1", "ifeoma"]

const userValidateFirstName = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate first Name
    if (postData === '') {
        errors.push('first name must not be empty');
        isValid = false;
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
        errors.push('last name must not be empty');
        isValid = false;
    } else if (postData.length < 2) {
        errors.push('last name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('last name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

// const userValidateEmailAddress = (postData) => {
//     const errors = [];
//     let isValid  = true;
//     const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

//     if (postData === '') {
//         errors.push('email address must not be empty');
//         isValid = false;
//     } else if (userEmails.includes(postData)) {
//         errors.push('email address already exist');
//         isValid = false;
//     } else if (!emailRegex.test(postData)) {
//         errors.push('invalid email address');
//         isValid = false;
//     }
//     return { isValid, errors };
// }

const userValidateContact = (postData) => {
    const errors = [];
    let isValid  = true;
    //validate phone number
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;

    // validate title
    if (postData === '') {
        errors.push('phone number must not be empty');
        isValid = false;
    }  else if(!phoneRegex.test(postData)){
        errors.push('Invalid contact phone number, Phone format must be - 044-456-7890');
        isValid = false;
    }
    return { isValid, errors };
}

const userValidateUsername = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate username
    if(postData === ''){
        errors.push('username must not be empty');
        isValid = false;
    } else if(usernames.includes(postData)){
        errors.push('user already exist');
        isValid = false;
    } else if (postData.length <= 6) {
        errors.push('username must be at least 6 characters long');
        isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidateFirstName,
    userValidateLastName,
    userValidateUsername,
    userValidateContact,
}