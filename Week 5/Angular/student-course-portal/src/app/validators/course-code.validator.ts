import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (value && value.toString().startsWith('XX')) {
    return {
      noCourseCode: true
    };
  }

  return null;
}