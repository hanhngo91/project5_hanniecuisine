import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {} //This constructor allows us to pass in the dto class that we want to use to serialize the response.
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        console.log('I am running before response is sent out', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
//Modify the data before it is sent out to the client.
