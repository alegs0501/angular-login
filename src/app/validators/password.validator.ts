import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms'

export function passwordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value

        if (!value) {
            return null
        }

        const hasUpperCase = /[A-Z]+/.test(value)

        const hasLowerCase = /[a-z]+/.test(value)

        const hasNumeric = /[0-9]+/.test(value)

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric

        return !passwordValid ? {passwordStrength:true} : null
    }
}

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {

    const password = form.get("passwordSU")?.value

    const re_password = form.get("passwordRepeatSU")?.value

    if (password && re_password) {

        const passwordValid = password === re_password

        return !passwordValid ? {passwordMatch: true} : null
    }

    return null
  }
}
