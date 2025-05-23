import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/tasks'
  }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  createTask(title: string , description: string): Observable<Task> {
    return this.http.post<Task>(`${this.myAppUrl}${this.myApiUrl}`, {title,description})
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.myAppUrl}${this.myApiUrl}/${id}`, task)
  }

}
