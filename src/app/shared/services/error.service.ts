import { Injectable } from '@angular/core';
import { ToasterService } from "angular2-toaster/src/toaster.service";
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class ErrorService {

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private usersService: UsersService
  ) {
  }

  handleError (error: Response | any) {
    let err: any = {};
    if (error.status === 401) {
      this.usersService.logout();
    }

    if (error instanceof Response) {

      try {

        let body: any = error.json();
        err['error'] = body.error || body.error_message || '';

        if (body.details && Object.keys(body.details).length > 0) {
          const details = [];
          Object.keys(body.details).forEach(errorDetail => {
            let detailsStr = [];
            body.details[errorDetail].forEach(detail => detailsStr.push(detail));
            details.push(`${errorDetail.replace(/_/g, ' ')}: ${detailsStr.join(' ')}`);
          });
          err['details'] = details.join(' ');
        }

      } catch (e) {
        err['error'] = error['_body'].toString();
      }

    } else {
      err = error.message ? error.message : error.toString();
    }
    return Observable.throw(err);
    // return Observable.throw(err.json().data || 'Server error');
  }

  showErrorHandler() {
    const handleError = this.handleError;
    return (errorData) => {
      const errorFormat = handleError(errorData);
      const error = errorFormat['error'];

      if (error && error['error'] && !error['details'])
        this.toasterService.pop('error', error['error']);
      if (error && error['error'] && error['details'])
        this.toasterService.pop('error', error['error'], error['details']);
      return errorFormat;
    }
  }

}
