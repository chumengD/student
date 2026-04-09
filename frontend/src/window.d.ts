import type{test} from "./interface";
export {}

interface LoginPayload {
  id: string
  password: string
  role: string
}

interface LoginResponse {
  code: number
  msg: string
  test?: any
  data?: any
}

interface updateResponse{
  isUpdate:boolean
  isWrite:boolean
}


declare global {
  interface Window {
    login: (payload: LoginPayload) => Promise<LoginResponse>
    submitTest:(t:test) =>Promise<LoginResponse>
    getTestList:() =>Promise<LoginResponse>
    deleteTest: (t:string) => Promise<LoginResponse>
    updateTest:(t:test) => Promise<updateResponse>

    }

}

