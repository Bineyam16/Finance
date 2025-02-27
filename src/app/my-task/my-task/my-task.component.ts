import {Component, OnInit} from '@angular/core';
import {MyTaskService} from '../my-task.service';
import {Router} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;

  taskList;

  lockedpromise;

  constructor(
    private notificationsService: NotificationsService,private myTaskService: MyTaskService, private router: Router) {
  }

  ngOnInit() {
    this.getMyTask();
  }
  IsLockedBy_OtherUser(task) {
    this.lockedpromise = this.myTaskService
      .IsLockedBy_OtherUser(task.id)
      .subscribe(
        (message) => {
          if (!message) {
            this.go(task);
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "This Application No is being Processed by another staff. " +
                "Please choose another Application No. " +
                "/ ይህን ማመልከቻ በሌላ ሰራተኛ እየተስተናገደ ስለሆነ እባክዎ ሌላ ማመልከቻ ቁጥር ይውሰዱ፡፡"
            );
          }
          // const toast = this.notificationsService.success('Sucess', message);
        },
        (error) => {
          console.log(error);
          if (error.status == "400") {
            const toast = this.notificationsService.error(
              "Error",
              error.error.InnerException.Errors[0].message
            );
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        }
      );
  }
  getMyTask() {
    this.myTaskService.getMytasks().subscribe(taskList => {
      this.taskList = taskList;
      this.taskList = (Object.assign([], this.taskList.Table1));
      console.log('taskList', taskList);
    }, error => {
      console.log('error');
    });
  }


  go(task) {
    // console.log('task.to_screen', task);
    if (task.to_screen == 'a7a1e05e-32c2-4f44-ad58-306572c64593') {
      this.router.navigate(['/services/2/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else if (task.to_screen == 'da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff') {
      this.router.navigate(['/services/3/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else if (task.to_screen == '9e0834e9-7ec2-460c-a5ed-7ade1204c7ee') {
      this.router.navigate(['/services/4/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else {
      // this.router.navigate(['/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id + '/' + task.to_screen]);

     // if(task.Module){
      //  let AppBase = window['_app_base'].split('/');
      //  AppBase[4] = task.Module;
      //  console.log(AppBase[4], task);
        
       // AppBase = AppBase.join("/");
      //  window.location.href = window.location.origin + "" + AppBase + '/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id + '/' + task.to_screen ;
    }
     // else{
        this.router.navigate(['/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id + '/' + task.to_screen]);
    //  }
    //}
    // a7a1e05e-32c2-4f44-ad58-306572c64593 for plot
    // da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff for property
    // 9e0834e9-7ec2-460c-a5ed-7ade1204c7ee for certefcate

    // this.router.navigate(['/service/1']);
  }
}
