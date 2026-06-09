"use strict";
// import { Model, ProjectionType, QueryFilter, QueryOptions, model } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
// export abstract class DatabaseRepository<TDocument> {
//     constructor(protected readonly model: Model<TDocument>) {}
//     async find({
//         filter,
//         select,
//         options,
//     }
//     async findOne({
//         filter,
//         select,
//         options,
//     }:{
//         filter: QueryFilter<TDocument> | undefined,
//         select: ProjectionType<TDocument> | undefined,
//         options: QueryOptions<TDocument> | undefined,
//     }){
//         const doc = this.model.findOne(filter, select, options);
//         if(!doc){
//             throw new Error("Document not found");
//         }
//         return await doc.exec();
//     }
//     }
