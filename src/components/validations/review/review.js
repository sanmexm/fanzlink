const userValidateReview = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate description
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if(postData.length < 4){
      errors.push('Review must be at least 4 characters');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidateReview
}