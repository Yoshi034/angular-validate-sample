import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form-reactive',
  templateUrl: './hero-form-reactive.component.html',
  styleUrls: ['./hero-form-reactive.component.css']
})
export class HeroFormReactiveComponent implements OnInit {

  heroForm:FormGroup=new FormGroup({
    name: new FormControl("", {validators:[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
      Validators.pattern('^[0-9]+$'),
      this.forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    ],updateOn: 'submit'},),
    alterEgo: new FormControl(""),
    power: new FormControl("", Validators.required)
  });;

  
  get name() { return this.heroForm.get('name'); }
  
  get power() { return this.heroForm.get('power'); }
  ngOnInit(): void {

  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.get("firstName")?.errors);
    console.log(this.heroForm.get('name')?.errors)
    if(this.heroForm.get('name')?.errors?.required){
    console.log("値がないです")
    }
    if(this.heroForm.get('name')?.errors?.minlength){
    console.log("桁数が不正です")
    }
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
