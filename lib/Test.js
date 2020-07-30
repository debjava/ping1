"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const child_process_1 = require("child_process");
const performance_now_1 = __importDefault(require("performance-now"));
const file_util_1 = require("./util/file-util");
class Test {
    executeCmd() {
        const start = performance_now_1.default();
        child_process_1.exec(Test.command, (error, stdout) => {
            if (stdout) {
                console.log("Output: ", stdout);
                const data = JSON.parse(stdout);
                data.forEach((obj) => {
                    Object.entries(obj).forEach(([key, value]) => {
                        console.log(key + " : " + value);
                        const end = performance_now_1.default();
                        const timeInSeconds = (end - start) / 1000;
                        console.log("Total time taken : ", timeInSeconds, "seconds");
                    });
                });
            }
            else {
                console.log("Error: ", error);
            }
        });
    }
    async executeAll() {
        const start = performance_now_1.default();
        const fileUtil = new file_util_1.FileUtil();
        const allIPs = await fileUtil.readFileLineByLineNonBlocking(Test.FILENAMEPATH);
        const ipStrings = allIPs.join(",");
        const cmdString = Test.CMD_FORMAT + `${ipStrings}`;
        // console.log(cmdString);
        child_process_1.exec(cmdString, (error, stdout) => {
            if (stdout) {
                console.log("Output: ", stdout);
                const data = JSON.parse(stdout);
                data.forEach((obj) => {
                    Object.entries(obj).forEach(([key, value]) => {
                        console.log(key + " : " + value);
                    });
                });
                const end = performance_now_1.default();
                const timeInSeconds = (end - start) / 1000;
                console.log("Total time taken : ", timeInSeconds, "seconds");
            }
            else {
                console.log("Error: ", error);
            }
        });
    }
}
exports.Test = Test;
Test.FILENAMEPATH = "testData/ipaddress-500.txt";
// public static readonly FILENAMEPATH: string = "testData/ipaddress-3.txt";
Test.CMD_FORMAT = ".\\xping\\validation.exe -p "; // For Ping
// public static readonly command: string = ".\\xping\\validation"
//     + " " + "-p 250.77.110.145,204.75.133.169,0.7.203.210,141.81.57.204,138.141.94.102";
// For Invalid
// public static readonly command: string = ".\\xping\\validation"
//     + " " + "-n 250.77.110.145,204.75.133.169,0.7.203.210,141.81.57.204,138.141.94.102";
// For Valid
Test.command = ".\\xping\\validation"
    + " " + "-n 185.90.160.100,193.30.120.245,185.90.160.100,217.114.59.3,23.131.160.7";
const test = new Test();
// test.executeCmd();
test.executeAll();
