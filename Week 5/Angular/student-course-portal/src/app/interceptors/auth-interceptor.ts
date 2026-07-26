import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const clonedRequest = req.clone({

    setHeaders: {
      Authorization: 'Bearer demo-token-123'
    }

  });

  return next(clonedRequest);

};