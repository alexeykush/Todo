import isEmpty from "./isEmpty";

const validateNote = data => {
    const errors = {};

    const { text = "" } = data;

    if(isEmpty(text)){
        errors.text = "Text field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};


export default validateNote;