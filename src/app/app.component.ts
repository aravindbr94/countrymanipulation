import { Component,ViewChild,ElementRef,OnInit  } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teacherform:FormGroup;
  constructor(private fb:FormBuilder){
    this.teacherform=this.fb.group({
      teachers:this.fb.array([]),
    })
  }
  teachers():FormArray
  {
    return this.teacherform.get("teachers") as FormArray;
  }
  newteacher():FormGroup
  {
    return this.fb.group({
      teachname:[""],
      batches:this.fb.array([]),
    })
  }
  createteacher()
  {
    this.teachers().push(this.newteacher());
  }
  removeteacher(teachindex:number)
  {
    this.teachers().removeAt(teachindex);
  }

  batches(teachindex:number):FormArray{
    return this.teachers().at(teachindex).get("batches") as FormArray;
  }
  newbatch():FormGroup
  {
    return this.fb.group({
      batchname:[""],
      student:this.fb.array([]),
    })
  }
  createbatch(teachindex:number)
  {
    this.batches(teachindex).push(this.newbatch());
  }
  removebatch(teachindex:number,batchindex:number)
  {
    this.batches(teachindex).removeAt(batchindex);
  }

  student(teachindex:number,batchindex:number):FormArray{
    return this.batches(teachindex).at(batchindex).get("student") as FormArray;
  }
  newstudent():FormGroup
  {
    return this.fb.group({
      studname:[""],
    })
  }
  createstudent(teachindex:number,batchindex:number)
  {
    this.student(teachindex,batchindex).push(this.newstudent());
  }
  removestudent(teachindex:number,batchindex:number,studindex:number)
  {
    this.student(teachindex,batchindex).removeAt(studindex);
  }
  patchvalue1()
  {
    var obj={
      teachers: [{ 
        "teachname": "Vani", 
        "batches": [{
          "batchname": "2011", 
          "student": [ 
            { 
            "studname": "Arvind" 
            }, 
            { 
              "studname": "Arun" 
            }
          ] 
        }] 
      }] 
    }
    obj.teachers.forEach((r)=>{
      var teachn:FormGroup=this.newteacher();
      this.teachers().push(teachn);
      r.batches.forEach((b)=>{
        var batchn:FormGroup=this.newbatch();
        (teachn.get("batches") as FormArray).push(batchn);
        b.student.forEach((s)=>{
          var studn:FormGroup=this.newstudent();
          (batchn.get("student") as FormArray).push(studn);
        })
      })
    })
    this.teacherform.patchValue(obj);
  }
}
