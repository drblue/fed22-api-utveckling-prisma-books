"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByEmail = void 0;
/**
 * User Service
 */
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Get a user by email
 *
 * @param email The email of the user to get
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            email: email,
        }
    });
});
exports.getUserByEmail = getUserByEmail;
/**
 * Create a user
 *
 * @param data User Details
 */
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.create({
        data: data,
    });
});
exports.createUser = createUser;
