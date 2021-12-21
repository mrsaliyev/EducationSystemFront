import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {any} from 'codelyzer/util/function';

export class User{
  constructor(
    public id: number,
    public fullName: string,
    public username: string,
    public roles: any[]
  ){
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  api = '/api'

  // @ts-ignore
  users: User[];
  closeResult = '';
  // @ts-ignore
  editForm: FormGroup;
  // @ts-ignore
  deleteID: number;

  selectUser?: User;

  constructor(
    private HttpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.editForm = this.fb.group({
      id: [''],
      fullName: [''],
      username: [''],
      roles: []
    } );
  }

  getUsers(){
    this.HttpClient.get<any>(this.api + '/user').subscribe(
      response =>{
        console.log(response);
        this.users = response;
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

  onSubmit(f: NgForm) {
    const url = this.api + '/user/addnew';
    this.HttpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  // @ts-ignore
  openDetails(targetModal, user: User) {
    this.selectUser = user;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    document.getElementById('nameUser').setAttribute('value', user.fullName);
    // @ts-ignore
    document.getElementById('usernameUser').setAttribute('value', user.username);
    // @ts-ignore
    document.getElementById('rolesUser').setAttribute('value', user.roles);
  }

  // @ts-ignore
  openEdit(targetModal, user: USer) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    // @ts-ignore
    this.editForm.patchValue( {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      roles: user.roles,
    });
  }

  onSave() {
    const editURL = this.api + '/user/' + this.editForm.value.id + '/edit';
    console.log(this.editForm.value);
    this.HttpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  // @ts-ignore
  openDelete(targetModal, user: User) {
    this.deleteID = user.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.api + '/user/delete/' + this.deleteID;
    this.HttpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

}
