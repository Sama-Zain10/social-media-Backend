import   { HydratedDocument, model, Schema } from "mongoose";
import { GenderEnum, RoleEnum } from "../../utils/enums/auth.enum";
export interface IUser {
    username?: String,
    firstName: String,
    lastName: String,

    email: String,
    confirmemailOTP?: String,
    confirmEmailAt?: Date,

    password: String,
    resetPasswordOTP?: String,

    gender: GenderEnum,
    role?: RoleEnum,

    phone?: String,
    address?: String,

    createdAt: Date,
    updatedAt?: Date,
}
export const UserSchema = new Schema<IUser>({ 
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        index: true,
    },
    confirmemailOTP: {
        type: String,
        minlength: 6,
        maxlength: 6,
    },
    confirmEmailAt: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        trim: true,
    },
    resetPasswordOTP: {
        type: String,
        minlength: 6,
        maxlength: 6,
        trim: true,
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum),
        default: GenderEnum.MALE,
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        default: RoleEnum.USER,
    },
    phone: {
        type: String,
        maxlength: 11,
    },
    address: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    collection: "users",
});
UserSchema.virtual("username").set(function(value:string){
    const[firstName, lastName] = value.split(" ") || [];
    this.set("firstName", firstName);
    this.set("lastName", lastName);
}).get(function(){
    return `${this.firstName} ${this.lastName}`;
});

export const UserModel = model<IUser>("User", UserSchema);
export type HUserDocument = HydratedDocument<IUser>;