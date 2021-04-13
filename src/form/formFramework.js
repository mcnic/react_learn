import is from 'is_js'

export function createControl(config, validation) {
    return {
        ...config,
        validation,
        isValid: !validation,
        touched: false,
        value: ''
    }

}

export function validate(value, validation = null) {
    if (!validation) {
        return true
    }

    let isValid = true

    if (validation.required === true) {
        isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
        // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // isValid = re.test(String(value).toLowerCase()) && isValid
        isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }

    return isValid
}
