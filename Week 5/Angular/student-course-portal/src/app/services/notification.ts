import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  show(message: string): void {

    alert(message);

  }

}