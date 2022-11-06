import { startsWithVowel } from "../utils/strings.js";

export { anyError, Error, GenericError, InvalidDeviceError, InvalidArgumentError, InvalidFileTypeError }

type anyError = Error | GenericError | InvalidDeviceError | InvalidArgumentError | InvalidFileTypeError

class Error
{
    name:string;
    description:string;
    isClassError = true;

    constructor(name:string, description:string)
    {
        this.name = name
        this.description = description
    }
}

class GenericError extends Error
{
    constructor(message:string)
    {
        super("GenericError", message)
    }
}

class InvalidDeviceError extends Error
{
    constructor()
    {
        super("InvalidDeviceError", "Invalid device detected")
    }
}

class InvalidArgumentError extends Error
{
    argument:string;
    constructor(argument:string)
    {
        super("InvalidArgumentError", `Unrecognised argument "${argument}" provided`)
        this.argument = argument
    }
}

class InvalidFileTypeError extends Error
{
    constructor(file_name:string, target_type:string)
    {
        let a = "a"
        if(startsWithVowel(target_type)){ a += "n" }
        super("InvalidFileTypeError", `The file "${file_name}" is not ${a} ${target_type} file`)
    }
}