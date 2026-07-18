import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { formatTimeAgo } from '../../Utils/dateTimeUtil';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Loader } from '../../Components/loader/loader';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, FaIconComponent, Loader],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private courseService = inject(CourseService);
  formatTimeAgo = formatTimeAgo;
  faTrash = faTrash;
  faTriangleExclamation = faTriangleExclamation;

  courses: Course[] = [];
  supportedLanguages: string[] = ['English', 'Bengali', 'Hindi', 'Japanese', 'Spanish', 'Thai'];
  isLoading: boolean = false;
  selectedCourse: Course | null = null;

  courseModel = {
    title: '',
    description: '',
    language: '',
  };

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  async saveCourse(form: NgForm) {
    try {
      this.isLoading = true;
      if (form.invalid) {
        form.control.markAllAsTouched();
        this.isLoading = false;
        return;
      }

      await this.courseService.addCourse(form.value);
      this.courses = this.courseService.getCourses();
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  onDeleteClick(course: Course) {
    this.selectedCourse = course;
  }

  deleteCourse() {
    this.isLoading = true;
    if (!this.selectedCourse) {
      this.isLoading = false;
      return;
    }

    this.courseService.deleteCourse(this.selectedCourse.id);
    this.selectedCourse = null;
    this.courses = this.courseService.getCourses();
    this.isLoading = false;
  }
}
