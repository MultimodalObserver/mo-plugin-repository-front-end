import { Router } from "@angular/router";
import { NotificationsService } from 'angular4-notifications';

export class Guard {

  constructor(protected router:Router, protected notification: NotificationsService){}

  protected unauthorize(options? : any){

    let message: string = "You need to log in";

    if(options && options.hasOwnProperty("admin") && options.admin == true){
      message = "Only an admin can see this";
    }

    this.notification.error("Error", message);
    this.router.navigate(['explore']);
  }

}
