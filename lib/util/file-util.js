"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
const fs = __importStar(require("fs"));
const readline_1 = __importDefault(require("readline"));
/** This is utility class which provides file reading in blocking and non-blocking mode.
  * @author Debadatta Mishra
*/
class FileUtil {
    /**
      * Function to read the file in blocking mode
     */
    readFileLineByLineBlocking(fileNamePath) {
        let lines = [];
        try {
            const data = fs.readFileSync(fileNamePath, 'UTF-8');
            lines = data.split(/\r?\n/);
        }
        catch (err) {
            console.log("Unexpected error while reading file ...", err);
        }
        return lines;
    }
    /**
      * Function to read the file in non-blocking mode
     */
    async readFileLineByLineNonBlocking(fileNamePath) {
        var e_1, _a;
        let allLines = [];
        const readLines = readline_1.default.createInterface({
            input: fs.createReadStream(fileNamePath),
            output: process.stdout,
            terminal: false
        });
        try {
            for (var readLines_1 = __asyncValues(readLines), readLines_1_1; readLines_1_1 = await readLines_1.next(), !readLines_1_1.done;) {
                const line = readLines_1_1.value;
                allLines.push(line);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (readLines_1_1 && !readLines_1_1.done && (_a = readLines_1.return)) await _a.call(readLines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return allLines;
    }
}
exports.FileUtil = FileUtil;
