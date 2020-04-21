import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';


export function confirmPasswordValidator(
  matchTo: string // name of the control to match to
): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
      ? null
      : { isMatching: false };
  };
}
// export function confirmPasswordValidator(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }