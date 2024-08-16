const phoneRegex = /^\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

function checkRequired(fieldId, requiredMessage) {
    const field = document.getElementById(fieldId);
    if (field.type === 'checkbox') {
        if (!field.checked) {
            setElementValidity(fieldId, false, requiredMessage);
            return false;
        }
    } else {
        if (!field.value.trim()) {
            setElementValidity(fieldId, false, requiredMessage);
            return false;
        }
    }
    setElementValidity(fieldId, true, '');
    return true;
}

function checkFormat(fieldId, badFormatMessage, regex) {
    const field = document.getElementById(fieldId);
    if (!regex.test(field.value)) {
        setElementValidity(fieldId, false, badFormatMessage);
        return false;
    }
    setElementValidity(fieldId, true, '');
    return true;
}

// Function to check if value is in stateAbbreviations array
function validateState(fieldId, invalidMessage) {
    const field = document.getElementById(fieldId);
    if (!stateAbbreviations.includes(field.value.toUpperCase())) {
        setElementValidity(fieldId, false, invalidMessage);
        return false;
    }
    setElementValidity(fieldId, true, '');
    return true;
}

function setElementValidity(id, valid, message) {
    const field = document.getElementById(id);
    field.setCustomValidity(valid ? '' : message);
    const errorDiv = field.nextElementSibling;
    errorDiv.textContent = message;
}


function validateForm() {
    const requiredMessage = "This field is required.";
    const badFormatMessage = "Invalid format.";
    const invalidStateMessage = "Invalid state abbreviation.";

    let isValid = true;

    isValid = checkRequired('first', requiredMessage) && isValid;
    isValid = checkRequired('last', requiredMessage) && isValid;
    isValid = checkRequired('address', requiredMessage) && isValid;
    isValid = checkFormat('phone', badFormatMessage, phoneRegex) && isValid;
    isValid = checkFormat('email', badFormatMessage, emailRegex) && isValid;
    isValid = validateState('state', invalidStateMessage) && isValid;

    return isValid;
}

function initValidation(formSelector) {
    const form = document.querySelector(formSelector);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!validateForm()) {
            console.log("Form validation failed.");
        } else {
            console.log("Form validation passed. Submitting form...");
            form.submit();
        }
    });

    form.addEventListener('change', function(event) {
        const target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
            validateField(target.id);
        }
    });
}

function validateField(fieldId) {
    switch(fieldId) {
        case 'first':
        case 'last':
        case 'address':
            checkRequired(fieldId, "This field is required.");
            break;
        case 'phone':
            checkFormat(fieldId, "Invalid phone number format.", phoneRegex);
            break;
        case 'email':
            checkFormat(fieldId, "Invalid email format.", emailRegex);
            break;
        case 'state':
            validateState(fieldId, "Invalid state abbreviation.");
            break;
        default:
            break;
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    initValidation("#myform");
});
