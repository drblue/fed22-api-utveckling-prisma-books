"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authors_1 = __importDefault(require("./authors"));
const books_1 = __importDefault(require("./books"));
const profile_1 = __importDefault(require("./profile"));
const publishers_1 = __importDefault(require("./publishers"));
const register_controller_1 = require("../controllers/register_controller");
const basic_1 = require("../middlewares/auth/basic");
const user_rules_1 = require("../validations/user_rules");
// instantiate a new router
const router = express_1.default.Router();
/**
 * GET /
 */
router.get('/', (req, res) => {
    res.send({
        message: "I AM API, BEEP BOOP",
    });
});
/**
 * /authors
 */
router.use('/authors', authors_1.default);
/**
 * /books
 */
router.use('/books', books_1.default);
/**
 * /profile
 */
router.use('/profile', basic_1.basic, profile_1.default);
/**
 * /publishers
 */
router.use('/publishers', publishers_1.default);
/**
 * /register
 */
router.post('/register', user_rules_1.createUserRules, register_controller_1.register);
exports.default = router;
