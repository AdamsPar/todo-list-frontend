import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiUrl
    this.myApiUrl = 'api/tasks'
  }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  createTask(title: string, description: string): Observable<Task> {
    return this.http.post<Task>(`${this.myAppUrl}${this.myApiUrl}`, { title, description })
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.myAppUrl}${this.myApiUrl}/${task.id}`, task)
  }

  obtenerInformeXML(): Observable<string> {
    return this.http.get(`${this.myAppUrl}api/informe.xml`, { responseType: 'text' });
  }

}
