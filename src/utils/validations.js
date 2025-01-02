function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    return passwordRegex.test(password)
}

function validatePasswordConfirmation(password, confirmPassword) {
    return password === confirmPassword
}

export function signUpValidation(form) {
    const errors = {}

    if (!validateEmail(form.email)) {
        errors.email = 'Invalid email'
    }

    if (!validatePassword(form.password)) {
        errors.password = 'Invalid password'
    }

    if (!validatePasswordConfirmation(form.password, form.confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match'
    }

    return errors
}

export function signInValidation(form) {
    const errors = {}

    if (!validateEmail(form.email)) {
        errors.email = 'Invalid email'
    }

    if (!validatePassword(form.password)) {
        errors.password = 'Invalid password'
    }

    return errors
}