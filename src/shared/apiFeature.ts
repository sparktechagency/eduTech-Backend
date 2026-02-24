import { FilterQuery } from "mongoose";

export interface GetAllEventsQuery {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
  [key: string]: any;
}

class QueryBuilder {
  [x: string]: any;
  queryModel: any;
  query: any;

  constructor(queryModel: any, query: Record<string, any> = {}) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // searching
search(searchableFields: string[]) {
  if (this.query?.searchTerm) {
    const searchQuery = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: this.query.searchTerm, $options: "i" },
      })),
    };
    const existingQuery = this.queryModel.getQuery();
    this.queryModel = this.queryModel.find({ $and: [existingQuery, searchQuery] });
  }
  return this;
}

  // filtering
  filter() {
    const queryCopy = { ...this.query };
    const removeFields = ["searchTerm", "page", "limit", "sort"];
    removeFields.forEach((field) => delete queryCopy[field]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    this.queryModel = this.queryModel.find(JSON.parse(queryStr));
    return this;
  }

  // sorting
  sort() {
    const sortBy = this.query.sort || "-createdAt";
    this.queryModel = this.queryModel.sort(sortBy);
    return this;
  }

  // pagination
  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // pagination info
  async getPaginationInfo() {
    const limit = this.query.limit * 1 || 10;
    const page = this.query.page * 1 || 1;

    const total = await this.queryModel.model.countDocuments(
      this.queryModel.getQuery()
    );
    const totalPage = Math.ceil(total / limit);

    return {
      total,
      totalPage,
      page,
      limit,
    };
  }
}

export default QueryBuilder;