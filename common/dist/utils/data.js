"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataCollection = exports.getDataEntry = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const getDataEntry = (_path, include) => {
    const path = path_1.join(__dirname, "../../../data/models", _path);
    // Entry doesn't exist
    if (!fs_extra_1.default.existsSync(path))
        return {
            error: {
                code: 404,
            },
        };
    let entry = {};
    // Read info.json
    const info = {
        ...fs_extra_1.default.readJsonSync(`${path}/info.json`),
        slug: _path.substring(_path.indexOf("/") + 1),
    };
    // Filter properties
    if (!include) {
        entry = { ...info };
    }
    else {
        entry = Object.keys(info)
            .filter((key) => include.includes(key))
            .reduce((obj, key) => ({
            ...obj,
            [key]: info[key],
        }), {});
    }
    // Read content.md
    if ((!include || include.includes("content")) &&
        fs_extra_1.default.existsSync(`${path}/content.md`))
        entry = {
            ...entry,
            content: String(fs_extra_1.default.readFileSync(`${path}/content.md`)),
        };
    // Return the Entry
    return entry;
};
exports.getDataEntry = getDataEntry;
const getDataCollection = (collectionType, collectionName) => {
    // add .c
    collectionName = collectionName.replace(".c.json", ".json");
    // Collection doesn't exist
    const path = path_1.join(__dirname, "../../../data/models", collectionType, collectionName);
    if (!fs_extra_1.default.existsSync(path))
        return 404;
    // Read [collection].json
    const collection = fs_extra_1.default.readJsonSync(path);
    // Collect Entries
    const entries = collection.items.map((slug) => {
        const entry = exports.getDataEntry(`${collectionType}/${slug}`, collection.include);
        return {
            slug,
            ...entry,
        };
    });
    // Return matched Entries of the Collection
    return entries;
};
exports.getDataCollection = getDataCollection;
//# sourceMappingURL=data.js.map