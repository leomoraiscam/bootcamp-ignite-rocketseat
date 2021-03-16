"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CreatecourseService_1 = __importDefault(require("./CreatecourseService"));
var routes = express_1.default.Router();
routes.get('/course', function (request, response) {
    CreatecourseService_1.default.execute({
        name: "NodeJs",
        duration: 10,
        educator: "Leonardo"
    });
    CreatecourseService_1.default.execute({
        name: "NodeJs",
        educator: "Leonardo"
    });
});
exports.default = routes;
