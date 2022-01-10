import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
county_list;
uniqueCountryLists;
public searchFilter: any = '';
sort_by='asc';
registerForm: FormGroup;
submitted = false;
addUserMode=false;
closeResult: string;
name='';
phone_number='';
address='';
country='';
state='';
gender='';
displayStyle='none';



  constructor(private commonservice: CommonService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', Validators.required],
      gender: ['', Validators.required]
  });


    this.commonservice.getCountryList()
    .subscribe(
      (data) =>{
        console.log(data);
        this.county_list=data;
        if(this.sort_by=='asc'){
          this.county_list=this.county_list.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }else{
          this.county_list=this.county_list.sort((a, b) => (a.name < b.name) ? 1 : -1)

        }
        let key='country';
        //       this.uniqueCountryLists=this.county_list.map(item => item.country)
        // .filter((value, index, self) => self.indexOf(value) === index);
        // console.log(this.uniqueCountryLists);

        this.uniqueCountryLists = [...new Map(this.county_list.map(item =>
          [item[key], item])).values()];
        
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
      }, // success path
      error => {
        console.log(error);
      }
    );
  }

  get f() { return this.registerForm.controls; }

  sorting(sort){
    this.spinner.show();
    if(sort=='asc'){
      this.sort_by='desc';
      this.county_list=this.county_list.sort((a, b) => (a.name < b.name) ? 1 : -1);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    }else{
      this.sort_by='asc';
      this.county_list=this.county_list.sort((a, b) => (a.name > b.name) ? 1 : -1);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);


    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
this.displayStyle="block";
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

onReset() {

    this.submitted = false;
    this.registerForm.reset();
    this.addUserMode=false;
}
addUser(country_code){
  console.log(country_code);
  this.addUserMode=true;
  this.registerForm.controls.country.setValue(country_code);


}
message='';
  
 
  receiveMessage($event) {
    console.log($event);
    this.displayStyle = $event;
    this.submitted = false;
    this.registerForm.reset();
    this.addUserMode=false;
  }


}
