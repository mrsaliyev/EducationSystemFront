import { Component, OnInit } from '@angular/core';
import {Course} from './course';
import {CourseService} from './course.service';
import {HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {error} from 'protractor';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{

  public courses: Course[] = [];
  public editCourse: Course | undefined;

  constructor(private courseService: CourseService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCourses();
  }


  public getCourses(): void{
    this.courseService.getCourse().subscribe(
      (response: Course[]) => {
        this.courses = response;
      }
    );
  }

  public onAddCourse(addForm: NgForm): void{

    // document.getElementById(`add-course-form`).click();
    this.courseService.addCourse(addForm.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
      }
    );
  }

  public onUpdateCourse(course: Course): void {
    this.courseService.updateCourse(course).subscribe(
      (response: Course) => {
        console.log(response);
        this.getCourses();
      }
    );
  }


  public onOpenModel(mode: string, course?: Course): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addCourseModal');
    }
    if (mode === 'edit'){
      this.editCourse = course;
      button.setAttribute('data-target', '#updateCourseModal');
    }
    if (mode === 'delete'){
      button.setAttribute('data-target', '#deleteCourseModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}

