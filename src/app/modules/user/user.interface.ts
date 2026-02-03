import mongoose, { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
import { IUserGroup } from '../user-group/user-group.interface';
import { IUserGroupTrack } from '../user-group/user-group-track/user-group-track.interface';
import { Portfolio } from '../portfolio/portfolio.model';

interface IStripeAccountInfo {
    status?: boolean;
    accountId?: string;
    externalAccountId?: string;
    accountUrl?: string;
    currency?: string;
}

interface IAuthenticationProps {
    isResetPassword: boolean;
    oneTimeCode: string;
    expireAt: Date;
}
export type IUser = {
    [x: string]: any;
    _id: any;
    name: string;
    appId?: string;
    role: USER_ROLES;
    mobileNumber?: string;
    email?: string;
    professionalTitle?: string;
    company: string;
    jobTitle: string;
    preferedGroup: string;
    aviliableHours: string;
    password: string;
    isSubscribed?: boolean;
    location: {};
    address:string
    about:string
    dateOfBirth:string;
    gender: "Male" | "Female" | "Children" | "Others";
    profile: string;
    linkedInProfile?: string;
    githubProfile?: string;
    PortfolioWebsite?:string;

    isUpdate: boolean;
    verified: boolean;
    discount?: number;
    deviceToken?: string;
    // authentication?: IAuthenticationProps;
    // authentication: IAuthenticationProps;
    authentication: {
        isResetPassword: boolean;
        oneTimeCode: string;
        expireAt: Date;
    };
    accountInformation?: IStripeAccountInfo;
    userGroup?: (mongoose.Types.ObjectId | IUserGroup)[];
    userGroupTrack?: mongoose.Types.ObjectId | IUserGroupTrack;
}

export type UserModal = {
    isExistUserById(id: string): any;
    isExistUserByEmail(email: string): any;
    isAccountCreated(id: string): any;
    isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;