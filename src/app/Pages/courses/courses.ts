import { Component, inject } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { formatTimeAgo } from '../../Utils/dateTimeUtil';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses {
  private courseService = inject(CourseService);
  formatTimeAgo = formatTimeAgo;

  courses: Course[] = [];

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }

  refreshCourses() {
    this.courses = this.courseService.getCourses();
  }
}
