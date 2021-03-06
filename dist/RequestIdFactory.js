"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class RequestIdFactory {
    create() {
        return crypto.randomBytes(8).toString("hex");
    }
}
exports.RequestIdFactory = RequestIdFactory;
//# sourceMappingURL=RequestIdFactory.js.map