import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TodoService } from './todos/services/todo/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './todos/services/socket/SocketService.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    TodoService,
    SocketService,
    importProvidersFrom(HttpClientModule),
  ],
};
