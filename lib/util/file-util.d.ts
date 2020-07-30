/** This is utility class which provides file reading in blocking and non-blocking mode.
  * @author Debadatta Mishra
*/
export declare class FileUtil {
    /**
      * Function to read the file in blocking mode
     */
    readFileLineByLineBlocking(fileNamePath: string): string[];
    /**
      * Function to read the file in non-blocking mode
     */
    readFileLineByLineNonBlocking(fileNamePath: string): Promise<any>;
}
