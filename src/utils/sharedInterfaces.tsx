export type IContactCreate = {
  given_name?: string
  additional_name?: string
  family_name?: string
  name_prefix?: string
  name_suffix?: string
  birthday?: string
  gender?: "male" | "female" | ""
  location?: string
  occupation?: string
  notes?: string
  photo?: string
  email?: string
  phone1?: string
  phone2?: string
  organization?: string
  website?: string
}

export type IContact = {
  id: number
  gender?: "male" | "female"
  createdAt: Date
  user_id: number
} & IContactCreate

export const contactDefaults: IContactCreate = {
  given_name: "",
  additional_name: "",
  family_name: "",
  name_prefix: "",
  name_suffix: "",
  birthday: "",
  gender: "",
  location: "",
  occupation: "",
  notes: "",
  photo: "",
  email: "",
  phone1: "",
  phone2: "",
  organization: "",
  website: "",
}

export type IError = {
  detail: string
}

export interface IUser {
  id?: number
  firstname?: string
  lastname?: string
  email?: string
}

export interface IUserCreate {
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface IUserUpdate extends Partial<IUserCreate> { }

export interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  user?: IUser;
  login: ({ email, password }: ILoginVariables) => Promise<ILoginResponse>
  logout: () => void
}

export interface ILoginResponse {
  access_token: string
  token_type: string
}


export const authContextDefaults: IAuthContext = {
  isAuthenticated: false,
  loading: false,
  login: ({ email, password }: ILoginVariables) => new Promise<ILoginResponse>(() => { }),
  logout: (): void => { }
}

export interface IUpdateContactVariables {
  id: number
  contact: IContactCreate
}

export interface IUpdatePasswordVariables {
  id: number
  password: string
  token: string
}

export interface IUpdateUserVariables {
  id: number
  user: IUserUpdate
}

export interface IForgotPasswordResponse {
  data: string
}

export interface ILoginVariables {
  email: string
  password: string
}
