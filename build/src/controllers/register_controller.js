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
exports.register = void 0;
/**
 * Register Controller
 */
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const user_service_1 = require("./../services/user_service");
/**
 * Register a new user
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for any validation errors
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
    }
    // Get only the validated data from the request
    const validatedData = (0, express_validator_1.matchedData)(req);
    console.log("validatedData:", validatedData);
    // Calculate a hash + salt for the password
    const hashedPassword = yield bcrypt_1.default.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
    console.log("Hashed password:", hashedPassword);
    // Replace password with hashed password
    validatedData.password = hashedPassword;
    // Store the user in the database
    try {
        const user = yield (0, user_service_1.createUser)({
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
        });
        // Respond with 201 Created + status success
        res.status(201).send({ status: "success", data: user });
    }
    catch (err) {
        return res.status(500).send({ status: "error", message: "Could not create user in database" });
    }
});
exports.register = register;
