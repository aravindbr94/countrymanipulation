import { Component,ViewChild,ElementRef,OnInit,Input  } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  countries=[
    {id:"1",name:"India"},
    {id:"2",name:"Australia"},
    {id:"3",name:"South Africa"},
    {id:"4",name:"England"},
  ]

  countryform:FormGroup;
  country_name="";
  dynamcountry="";

  constructor(private fb:FormBuilder){}

  ngOnInit()
  {
    this.countryform=this.fb.group({
      country:["null"],
    })

    this.countryform.get("country").valueChanges.subscribe(e=>{
      this.viewchanges(e);
    })
  }

  viewchanges(e)
  {
    console.log("value changes");
    console.log(e);
  }

  addCountry()
  {
    const country=this.countries.find(e=>e.name===this.country_name);
    if(!country)
    {
      const id=Math.max.apply(Math,this.countries.map(function(o){ return o.id;}));
      this.countries.push({id:id+1,name:this.country_name});
    }
  }

  changeCountry()
  {
    const country=this.countries.find(e=>e.name===this.dynamcountry);
    if(country)
    {
      this.countryform.get("country").patchValue(country.id);
    }
  }

}
