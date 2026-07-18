import { Service } from '@angular/core';
import { Course } from '../Models/course';

@Service()
export class CourseService {
  private COURSE_KEY: string = 'COURSE-KEY';

  courses: Course[] = [];

  constructor() {
    this.courses = this.loadCourses();
  }

  private loadCourses(): Course[] {
    try {
      const raw = localStorage.getItem(this.COURSE_KEY);

      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as Course[];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error(`Error loading courses. Error: ${err}`);
      return [];
    }
  }

  private async generateRandomThumbnail(): Promise<string> {
    try {
      const response = await fetch('https://picsum.photos/300/200');
      return response.url;
    } catch (err) {
      console.error(err);
      return '';
    }
  }

  getCourses(): Course[] {
    return this.courses;
  }

  async addCourse(course: Course) {
    if (!course) {
      return;
    }

    course.id = crypto.randomUUID();
    course.thumbnail = await this.generateRandomThumbnail();
    course.updatedAt = new Date().toUTCString();

    this.courses.push(course);
    localStorage.setItem(this.COURSE_KEY, JSON.stringify(this.courses));
  }
}
