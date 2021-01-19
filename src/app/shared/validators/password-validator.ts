import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Conditions the error msg to only appear when the values in both fields have been filled/changed
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }

    return password && confirmPassword && password.value !== confirmPassword.value ?
        { misMatch: true } :
        null;
}
