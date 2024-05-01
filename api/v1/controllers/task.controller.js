const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // end sort

  // pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTasks = await Task.countDocuments(find);
  objectPagination = paginationHelper(initPagination, req.query, countTasks);
  // End pagination

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // search
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (err) {
    res.json("Task not found");
  }
};

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    await Task.updateOne(
      { _id: id },
      {
        status: status,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhập trạng thái thành công",
    });
  } catch (err) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

// [PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;
    console.log(ids, key, value);
    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: {
              $in: ids,
            },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhập trạng thái thành công",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại",
        });
        break;
    }

    res.json({
      code: 200,
      message: "Cập nhập trạng thái thành công",
    });
  } catch (err) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
  try {
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
      code: 200,
      message: "Tạo mới thành công",
      data: data,
    });
  } catch (err) {
    res.json({
      code: 400,
      message: "Tạo mới thất bại",
    });
  }
};

// [POST] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.json({
      code: 200,
      message: "Cập nhập thành công",
    });
  } catch (err) {
    res.json({
      code: 400,
      message: "Tạo mới thất bại",
    });
  }
};

