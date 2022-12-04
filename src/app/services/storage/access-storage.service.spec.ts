/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { AccessStorageService } from './access-storage.service'

describe('Service: AccessStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessStorageService]
    })
  })

  it('should ...', inject([AccessStorageService], (service: AccessStorageService) => {
    expect(service).toBeTruthy()
  }))
})
