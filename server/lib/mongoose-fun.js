/* | ~ ~ ~ ~ ~ ~ ~ ~ CONFIG'S ~ ~ ~ ~ ~ ~ ~ | */
const {
  MONGOOSE_PARAMS: {
    LIMIT,
    OFFSET,
    SORT,
    CONDITION,
    AGGREGATE,
    POPULATE,
    SELECT,
    AGG_SORT,
  },
} = require("../config/config");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ MONGOOSE FUNCTIONS ~ ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

const FindById = async (model, id, select = SELECT) =>
  model.findById(id, select).lean();

const FindByIdWithPopulate = async (
  model,
  id,
  select = SELECT,
  populate = POPULATE
) => model.findById(id, select).populate(populate).lean();

const FindOne = async (model, condition = CONDITION, select = SELECT) =>
  model.findOne(condition, select).lean();

const FindOneWithPopulate = async (
  model,
  condition = CONDITION,
  populate = POPULATE,
  select = SELECT
) => model.findOne(condition, select).populate(populate).lean();

const Find = async (
  model,
  condition = CONDITION,
  select = SELECT,
  sort = SORT
) => model.find(condition, select).sort(sort).lean();

const FindAll = async (
  model,
  condition = CONDITION,
  select = SELECT,
  sort = SORT
) => model.find(condition).select(select).sort(sort).lean();

const FindAllWithPopulate = async (
  model,
  condition = CONDITION,
  populate = POPULATE,
  select = SELECT,
  sort = SORT
) => model.find(condition).select(select).populate(populate).sort(sort).lean();

const FindWithPopulate = async (
  model,
  condition = CONDITION,
  populate = POPULATE,
  sort = SORT
) => model.find(condition).sort(sort).populate(populate).lean();

const FindWithPagination = async (
  model,
  condition = CONDITION,
  limit = LIMIT,
  offset = OFFSET,
  sort = SORT,
  selectedFields = SELECT
) =>
  Promise.all([
    model.countDocuments(condition).lean(),
    model
      .find(condition)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .select(selectedFields)
      .lean(),
  ]);

const FindWithPaginationPopulate = async (
  model,
  condition = CONDITION,
  limit = LIMIT,
  offset = OFFSET,
  populate = POPULATE,
  sort = SORT,
  selectedFields = SELECT
) =>
  Promise.all([
    model.countDocuments(condition).lean(),
    model
      .find(condition)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .populate(populate)
      .select(selectedFields)
      .lean(),
  ]);

const Aggregate = async (model, aggregate = AGGREGATE) =>
  model.aggregate(aggregate);

const AggregateWithPagination = async (
  model,
  limit,
  offset,
  pipeline,
  sort = AGG_SORT
) =>
  model.aggregate([
    ...pipeline,
    {
      $facet: {
        count: [{ $count: "total" }],
        data: [
          { $sort: sort },
          { $skip: Number(offset) },
          { $limit: Number(limit) },
        ],
      },
    },
  ]);

const Create = async (model, data) => model.create(data);

const FindByIdAndUpdate = async (model, id, data) =>
  model.findByIdAndUpdate(id, data, { new: true }).lean();

const FindOneAndUpdate = async (model, query, data) =>
  model.findOneAndUpdate(query, data, { new: true }).lean();

const UpdateMany = async (model, query, data) =>
  model.updateMany(query, data).lean();

const UpSert = async (model, query, data) =>
  model.updateOne(query, data, { upsert: true }).lean();

const FindByIdAndDelete = async (model, id) =>
  model.findByIdAndDelete(id).lean();

const DeleteMany = async (model, condition) => model.deleteMany(condition);

const Count = async (model, condition = CONDITION) =>
  model.countDocuments(condition).lean();

module.exports = {
  Find,
  Count,
  UpSert,
  Create,
  FindOne,
  FindAll,
  FindById,
  DeleteMany,
  UpdateMany,
  Aggregate,
  FindOneAndUpdate,
  FindWithPopulate,
  FindByIdAndDelete,
  FindByIdAndUpdate,
  FindWithPagination,
  FindOneWithPopulate,
  FindAllWithPopulate,
  FindByIdWithPopulate,
  AggregateWithPagination,
  FindWithPaginationPopulate,
};
