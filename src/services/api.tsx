import { IContact, IContactCreate, IError, IForgotPasswordResponse, ILoginResponse, ILoginVariables, IUpdateContactVariables, IUpdatePasswordVariables, IUpdateUserVariables, IUser, IUserCreate } from "../utils/sharedInterfaces"


// CONTACTS CRUD
export const getContacts = async (): Promise<IContact[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IContact[] | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const getContactsById = async (id: number): Promise<IContact> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IContact | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const createContact = async (contact: IContactCreate): Promise<IContact> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/`, {
    method: "post",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ ...contact })
  })

  const data: IContact | IError = await response.json()

  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const updateContact = async ({ id, contact }: IUpdateContactVariables): Promise<IContact> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
    method: "put",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(contact)
  })

  const data: IContact | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const deleteContact = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
    method: "delete",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  if (response.status !== 204) {
    const data: IError = await response.json()
    throw new Error(data.detail)
  }
}

// USERS CRUD
export const createUser = async (user: IUserCreate): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({ ...user, })
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const getUsers = async (): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'get',
    mode: 'cors',
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const getUserbyId = async (id: number): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'get',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const updateUser = async ({ id, user }: IUpdateUserVariables): Promise<IUser> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: "put",
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`,
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.lastname,
      password: user.password
    })
  })

  const data: IUser | IError = await response.json()
  if ("detail" in data)
    throw new Error(data.detail)

  return data
}

export const updatePasswordByToken = async ({ id, password, token }: IUpdatePasswordVariables): Promise<IError> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/reset-password`, {
    method: 'put',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      password,
      token
    })
  })

  return response.json()
}

export const deleteUser = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'delete',
    mode: "cors",
    headers: {
      "authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
  })

  if (response.status !== 204) {
    const data: IError = await response.json()
    throw new Error(data.detail)
  }
}

export const forgotPassword = async (email: string): Promise<IForgotPasswordResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      email
    })
  })

  const data: IForgotPasswordResponse | IError = await response.json()
  if ("detail" in data) throw new Error(data.detail)

  else return data
}

export const login = async ({ email, password }: ILoginVariables) => {
  let formBody: string[] | string = [];
  formBody.push(`${encodeURIComponent("username")}=${encodeURIComponent(email)}`)
  formBody.push(`${encodeURIComponent("password")}=${encodeURIComponent(password)}`)
  formBody = formBody.join('&')

  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
  const data: ILoginResponse | IError = await response.json()

  if ("detail" in data)
    throw new Error(data.detail)

  return data

}

