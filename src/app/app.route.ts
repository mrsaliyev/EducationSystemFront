import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {CourseComponent} from './course/course.component';
import {UserComponent} from './user/user.component';
import {StudentComponent} from './student/student.component';


export const routes: Routes = [
  {path: 'mainPage', component: MainPageComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'course', component: CourseComponent},
  {path: 'user', component: UserComponent},
  {path: 'student', component: StudentComponent},
  {path: '', redirectTo: 'mainPage', pathMatch: 'full'},
];

export class AppRoute{}
