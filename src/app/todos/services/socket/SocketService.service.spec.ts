/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SocketService } from './SocketService.service';

describe('Service: SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService]
    });
  });

  it('should ...', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
