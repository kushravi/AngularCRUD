import { EmployeeModel } from './employee-dashboard-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeemodelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  // api:any='http://localhost:3000/posts';
  constructor(private formbuilber: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      name: [""],
      email: [""],
      mobile: [""],
      salary: [""]
    })
    this.getAllEmployee();
  }

  addshowToggle(){
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails() {
    this.employeemodelObj.name = this.formValue.value.name;
    this.employeemodelObj.email = this.formValue.value.email;
    this.employeemodelObj.mobile = this.formValue.value.mobile;
    this.employeemodelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeemodelObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Employee detail added successfully.");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        (err: any) => {
          alert("something went wrong");
        })
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert(row.name + " " + "Employee Deleted.");
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showAdd=false;
    this.showUpdate=true;
    this.employeemodelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployee() {
    this.employeemodelObj.name = this.formValue.value.name;
    this.employeemodelObj.email = this.formValue.value.email;
    this.employeemodelObj.mobile = this.formValue.value.mobile;
    this.employeemodelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeemodelObj, this.employeemodelObj.id)
      .subscribe(res => {
        alert("Employee Updated Successfully.");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }

}
