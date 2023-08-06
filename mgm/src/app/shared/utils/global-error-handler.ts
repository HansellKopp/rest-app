import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error-service';
import { MessageService } from 'primeng/api';
import { LoggingService } from '../services/logging-service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    notifier = inject(MessageService);
    errorService = inject(ErrorService);
    logger = inject(LoggingService);

    handleError(error: Error | HttpErrorResponse) {
       
        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = this.errorService.getServerMessage(error);
            //stackTrace = errorService.getServerStack(error);
        
            this.notifier.add({ severity: "error", summary: "Server Error", detail: message, life: 3000 })
        } else {
            // Client Error
            message = this.errorService.getClientMessage(error);
            //stackTrace = errorService.getClientStack(error);
            this.notifier.add({ severity: "error", summary: "Error", detail: message, life: 3000 })
        }

        // Always log errors
        this.logger.error(error)
    }
}