import { Model } from 'mongoose'

export type IUserGroup = {
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  _id: string
  published: boolean
}

export type UserGroupModel = Model<IUserGroup, Record<string, unknown>>
