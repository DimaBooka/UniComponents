import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/throw';

export function HandleError (error) {
  let err: any = {};
  if (error instanceof Response) {

    try {

      let body = error.json() || '';
      err['error'] = body.error || '';

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

export function ShowErrorHandler(toasterService) {
  return function (errorData) {
    const errorFormat = HandleError(errorData);
    const error = errorFormat['error'];

    if (error && error['error'] && !error['details'])
      toasterService.pop('error', error['error']);
    if (error && error['error'] && error['details'])
      toasterService.pop('error', error['error'], error['details']);
    return errorFormat;
  }
}
