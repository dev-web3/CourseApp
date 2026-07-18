import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { formatTimeAgo } from '../../Utils/dateTimeUtil';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private courseService = inject(CourseService);
  formatTimeAgo = formatTimeAgo;

  courses: Course[] = [];
  supportedLanguages: string[] = ['English', 'Bengali', 'Hindi', 'Japanese', 'Spanish', 'Thai'];
  isLoading: boolean = false;

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
}
