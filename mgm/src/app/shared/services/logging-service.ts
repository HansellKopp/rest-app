import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    log(msg: any)   { console.log(msg); }
    error(msg: any) { console.error(msg); }
    warn(msg: any)  { console.warn(msg); }
}