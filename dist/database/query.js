"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllProduct: "SELECT * FROM Products",
  addNewProduct: "INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)",
  getProductById: "SELECT * FROM Products Where Id = @Id",
  deleteProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE Id = @Id",
  getTotalProducts: "SELECT COUNT(*) FROM Products",
  updateProductById: "UPDATE Products SET Name = @name, Description = @description, Quantity = @quantity WHERE Id = @id"
};
exports.queries = queries;