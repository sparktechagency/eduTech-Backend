import { FilterQuery } from "mongoose";

class QueryBuilder {
  [x: string]: any;
  queryModel: any;
  query: any;

  constructor(queryModel: any, query: Record<string, any>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  //searching
  search(searchableFields: string[]) {
    if (this.query.searchTerm) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: this.query.searchTerm, $options: "i" },
        })),
      };

      this.queryModel = this.queryModel.find({
        $and: [this.queryModel.getQuery(), searchQuery],
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = [
      "page",
      "limit",
      "searchTerm",
      "filter"
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.queryModel = this.queryModel.find(queryObj);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }
  //sorting
  sort() {
    let sort = (this?.query?.sort as string) || "-createdAt";
    this.queryModel = this.queryModel.sort(sort);

    return this;
  }

  async getPaginationInfo() {
    const total = await this.queryModel.model.countDocuments(
      this.queryModel.getQuery(),
    );
    const totalPage = Math.ceil(total / 10);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    return {
      total,
      totalPage,
      page,
      limit,
    };
  }
}

export default QueryBuilder;
