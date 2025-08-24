"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/MenuItem.ts
var mongoose_1 = require("mongoose");
var MenuItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});
var MenuItem = mongoose_1.default.models.MenuItem || mongoose_1.default.model("MenuItem", MenuItemSchema);
exports.default = MenuItem;
