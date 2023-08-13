// selectedFile, title, category, price, description, link, location, contact 
const postValidateSelectedFile = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate selected file
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const postValidateTitle = (postData) => {
    const errors = [];
    let isValid  = true;
    const titleRegex = /^[A-Za-z\s]+$/;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('title must be at least 2 letters');
        isValid = false;
    } else if (!titleRegex.test(postData)) {
        errors.push('title must contain only letters');
        isValid = false;
    } else if(postData.length > 100) {
        errors.push('title must not be more than 100 letters');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidateCategory = (postData) => {
    const errors = [];
    let isValid  = true;

    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select a category');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidatePrice = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (!/^[0-9]+$/.test(postData)) {
        errors.push('price must contain only numbers');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidateDescription = (postData) => {
    const errors = [];
    let isValid  = true;

    //validate description
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('description must be at least 2 words');
        isValid = false;
    } else if(postData.length > 500) {
        errors.push('description must not be more than 500 words');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidateLink = (postData) => {
    const errors = [];
    let isValid  = true;

    //validate description
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const postValidateLocation = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('location must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('location must contain only letters');
        isValid = false;
    } else if(postData.length > 50) {
        errors.push('location must not be more than 50 letters');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidateContact = (postData) => {
    const errors = [];
    let isValid  = true;
    //validate phone number
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    }  else if(!phoneRegex.test(postData)){
        errors.push('Invalid contact phone number, Phone format must be - 044-456-7890');
        isValid = false;
    }
    return { isValid, errors };
}


export {
    postValidateSelectedFile,
    postValidateTitle,
    postValidateCategory,
    postValidatePrice,
    postValidateDescription,
    postValidateLink,
    postValidateLocation,
    postValidateContact,
}