import { UserOBJ } from './../interfaces/userOBJ'
import { UserService } from './../services/users/user.service'
import { Injectable } from "@angular/core"

@Injectable()
export class UserModels {

  constructor(private userService: UserService){}

  createUser(name: string, email: string, job: string): void{
    const user: UserOBJ = {
      id: 0,
      name,
      email,
      job
    }

    this.userService.createUser(user)
  }

  getUser(id: number): void{
    this.userService.getUser(id)
  }

  getPage(page: number): void{
    this.userService.getUserPage(page)
  }

  updateUser(id: number, name: string, email: string, job: string): void{
    const user: UserOBJ = {
      id,
      name,
      email,
      job
    }

    this.userService.updateUser(user)
  }

}
