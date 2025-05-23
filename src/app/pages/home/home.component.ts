import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pendingTask: Task[] = []
  taskInProgress: Task[] = []
  taskCompleted: Task[] = []
  constructor(private _taskservice: TaskService) {

  }

  ngOnInit(): void {
    this.getTask()
  }

  getTask() {
    this._taskservice.getTask().subscribe({
      next: (data) => {
        this.pendingTask = data.filter((task: Task) => task.state === 'pending')
        this.taskInProgress = data.filter((task: Task) => task.state === 'in-progress')
        this.taskCompleted = data.filter((task: Task) => task.state === 'completed')
      }
    })
  }

}
