import { List } from "../../internal/classes/dataFormats.js";
import { Computer } from "../../internal/classes/devices.js";
import { InvalidArgumentError, InvalidDeviceError, InvalidFileTypeError } from "../../internal/classes/errors.js";
import { TextFile } from "../../internal/classes/files.js";
export default {
    name: "strings",
    description: "Allows for printing or editing of text files",
    execute(session, user_input, local_data) {
        const { client } = local_data;
        const { flag, error } = user_input.getCommandFlag("No File name provided");
        const FILE_NAME = user_input.shift();
        if (!(client instanceof Computer)) {
            return new InvalidDeviceError();
        }
        if (error) {
            return error;
        }
        if (!FILE_NAME) {
            return `No file name provided`;
        }
        const file = client.files.fetch(FILE_NAME);
        if (!file) {
            return `Unable to find file with name "${FILE_NAME}"`;
        }
        if (!(file instanceof TextFile)) {
            return new InvalidFileTypeError(file.name, "text");
        }
        if (!flag) {
            if (file.contents) {
                return new List().add(file.contents);
            }
            else {
                return 1;
            }
        }
        switch (flag) {
            case "-e":
            case "--edit":
                if (!user_input.recieved(1)) {
                    return "Not enough arguments provided";
                }
                const second_argument = user_input.shift();
                switch (second_argument) {
                    case "-a":
                    case "--add":
                        if (file.contents) {
                            file.contents += user_input.toString();
                        }
                        else {
                            file.contents = user_input.toString();
                        }
                        return 1; // Successfully appended text to file
                    case "-o":
                    case "--overwrite":
                        file.contents = user_input.toString();
                        return 1; // Successfilly over-written the file
                }
                break;
            default:
                return new InvalidArgumentError(flag);
        }
    }
};
