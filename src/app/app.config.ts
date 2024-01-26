import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TodoService } from './todos/services/todo/todo.service';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './todos/services/socket/SocketService.service';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    TodoService,
    SocketService,
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    // importProvidersFrom(SocketIoModule.forRoot(config)),
  ],
};
