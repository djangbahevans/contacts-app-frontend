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
