import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../user/user.component';

export class Student{
  constructor(
    public id: number,
    public fullName: string,
    public phone: number,
    public email: string
  ){
  }
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  // @ts-ignore
  students: Student[];
  closeResult = '';
  // @ts-ignore
  editForm: FormGroup;
  // @ts-ignore
  deleteID: number;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private HttpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getStudents();
    this.editForm = this.fb.group({
      id: [''],
      fullName: [''],
      phone: [''],
      email: ['']
    });
  }

  // tslint:disable-next-line:typedef
  getStudents(){
    this.HttpClient.get<any>('http://localhost:8083/students').subscribe(
      response => {
        console.log(response);
        this.students = response;
      }
    );
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8083/student/addnew';
    this.HttpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openDetails(targetModal, student: Student) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    document.getElementById('nameStudent').setAttribute('value', student.fullName);
    // @ts-ignore
    document.getElementById('phoneStudent').setAttribute('value', student.phone);
    // @ts-ignore
    document.getElementById('emailStudent').setAttribute('value', student.email);
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openEdit(targetModal, student: Student) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    this.editForm.patchValue( {
      id: student.id,
      fullName: student.fullName,
      phone: student.phone,
      email: student.email,
    });
  }

  // tslint:disable-next-line:typedef
  onSave() {
    const editURL = 'http://localhost:8083/student/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.HttpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openDelete(targetModal, student: Student) {
    this.deleteID = student.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  // tslint:disable-next-line:typedef
  onDelete() {
    const deleteURL = 'http://localhost:8083/student/' + this.deleteID + '/delete';
    this.HttpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
