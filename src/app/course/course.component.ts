import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

export class Course{
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number
  ){
  }
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  // @ts-ignore
  courses: Course[];
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
    this.getCourses();
    this.editForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      price: ['']
    } );
  }

  // tslint:disable-next-line:typedef
  getCourses(){
    this.HttpClient.get<any>('http://localhost:8081/course/all').subscribe(
      response =>{
        console.log(response);
        this.courses = response;
      }
    );
  }

  // @ts-ignore
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
    const url = 'http://localhost:8081/course/add';
    this.HttpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); // reload the table
      });
    this.modalService.dismissAll(); // dismiss the modal
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openDetails(targetModal, course: Course) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    document.getElementById('nameCourse').setAttribute('value', course.name);
    // @ts-ignore
    document.getElementById('descriptionCourse').setAttribute('value', course.description);
    // @ts-ignore
    document.getElementById('priceCourse').setAttribute('value', course.price);
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openEdit(targetModal, course: Course) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    this.editForm.patchValue( {
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
    });
  }

  // tslint:disable-next-line:typedef
  onSave() {
    const editURL = 'http://localhost:8081/course/update' + this.editForm.value.id;
    console.log(this.editForm.value);
    this.HttpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  // @ts-ignore
  // tslint:disable-next-line:typedef
  openDelete(targetModal, course: Course) {
    this.deleteID = course.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  // tslint:disable-next-line:typedef
  onDelete() {
    const deleteURL = 'http://localhost:8081/course/remove' + this.deleteID;
    this.HttpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
