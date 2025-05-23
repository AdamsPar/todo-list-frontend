import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pendingTask: Task[] = []
  taskInProgress: Task[] = []
  taskCompleted: Task[] = []
  title = ''
  description = ''
  showform = false
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

  createTask() {
    if (!this.title && !this.description) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    this._taskservice.createTask(this.title, this.description).subscribe({
      next: data => {
        Swal.fire({
          title: 'tarea registrada!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => { window.location.reload() })

      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error Registrando tarea!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  eliminateTask(id: number) {
    this._taskservice.deleteTask(id).subscribe({
      next: data => {
        Swal.fire({
          title: 'Libro eliminado!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => { window.location.reload() })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })

  }

  editTaskTitle = ''
  editTaskDescription = ''
  editTaskState = ''
  taskId = 0

  editTask(task: Task) {
    this.showform = true
    this.editTaskTitle = task.title
    this.editTaskDescription = task.description
    this.editTaskState = task.state
    this.taskId = task.id
  }

  saveTask() {
    if (!this.editTaskTitle && !this.editTaskDescription) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }

    const task = {
      id: this.taskId,
      title: this.editTaskTitle,
      description: this.editTaskDescription,
      state: this.editTaskState
    }
    this._taskservice.updateTask(task).subscribe({
      next: data => {
        Swal.fire({
          title: 'tarea actualizada!',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        }).then(() => {
          window.location.reload()
          this.showform = false
        })
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error Registrando tarea!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  dowloadReport() {
    this._taskservice.obtenerInformeXML().subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'informe.xml';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el informe', err);
      }
    });
  }

}
