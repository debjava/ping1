import { exec } from "child_process";
import now from "performance-now";
import { FileUtil } from "./util/file-util";

export class Test {

    public static readonly FILENAMEPATH: string = "testData/ipaddress-500.txt";
    // public static readonly FILENAMEPATH: string = "testData/ipaddress-3.txt";

    public static readonly CMD_FORMAT: string = ".\\xping\\validation.exe -p "; // For Ping

    // public static readonly command: string = ".\\xping\\validation"
    //     + " " + "-p 250.77.110.145,204.75.133.169,0.7.203.210,141.81.57.204,138.141.94.102";

    // For Invalid
    // public static readonly command: string = ".\\xping\\validation"
    //     + " " + "-n 250.77.110.145,204.75.133.169,0.7.203.210,141.81.57.204,138.141.94.102";

    // For Valid
    public static readonly command: string = ".\\xping\\validation"
        + " " + "-n 185.90.160.100,193.30.120.245,185.90.160.100,217.114.59.3,23.131.160.7";

    public executeCmd(): void {
        const start = now();
        exec(Test.command, (error: any, stdout: any) => {
            if (stdout) {
                console.log("Output: ", stdout);
                const data = JSON.parse(stdout);
                data.forEach((obj: any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                        console.log(key + " : " + value);
                        const end = now();
                        const timeInSeconds = (end - start) / 1000;
                        console.log("Total time taken : ", timeInSeconds, "seconds");
                    });
                });

            } else {
                console.log("Error: ", error);
            }
        });

    }

    public async executeAll(): Promise<void> {
        const start = now();
        const fileUtil = new FileUtil();
        const allIPs: string[] = await fileUtil.readFileLineByLineNonBlocking(Test.FILENAMEPATH);
        const ipStrings: string = allIPs.join(",");
        const cmdString: string = Test.CMD_FORMAT + `${ipStrings}`;
        // console.log(cmdString);
        exec(cmdString, (error: any, stdout: any) => {
            if (stdout) {
                console.log("Output: ", stdout);
                const data = JSON.parse(stdout);
                data.forEach((obj: any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                        console.log(key + " : " + value);
                    });
                });
                const end = now();
                const timeInSeconds = (end - start) / 1000;
                console.log("Total time taken : ", timeInSeconds, "seconds");
            } else {
                console.log("Error: ", error);
            }
        });

    }

}

const test = new Test();
// test.executeCmd();
test.executeAll();
