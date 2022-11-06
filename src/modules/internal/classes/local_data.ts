export { Locator, LocalData, UserInput }

import { Device, Computer, Router } from "./devices.js"
import { CommandContainer } from "./commands.js"
import { DNSContainer } from "./dns.js"

type LocalData =
{
    location:Locator
    client:Device|Computer|Router;
    commands:CommandContainer;
    dns:DNSContainer;
}

class Locator
{
    single:string = undefined;
    array:Array<string> = [];

    update(){this.single = this.array.join("\\")}

    extend(location:string)
    {
        this.array.push(location)
        this.update()
    }

    drop()
    {
        this.array.pop()
        this.update()
    }
}

class UserInput
{
    command:string;
    array:Array<string>;
    isPassed = false;

    constructor(input:Array<string>)
    {
        this.command = input.shift().toLowerCase()
        this.array = input
    }

    toString(){ return this.array.join(" ") }
    empty()
    {
        this.command = ""
        this.array.length = 0
        return this
    }

    getCommandFlag(error_message?:string)
    {
        if(!error_message){ error_message = "Please provide more arguments" }

        let out = { flag: "", error: "" }

        if(!this.recieved()){ out.error = error_message; return out }
        if(this.first().startsWith("-")){ out.flag = this.shift() }

        return out
    }

    getArgument(argument:Array<string>)
    {
        let out = {argument: undefined, index: 0, exist: false}
        this.array.forEach((entry, idx) =>
        {
            argument.forEach(arg =>
            {
                if(entry == arg)
                {
                    out.argument = this.array[idx+1]
                    out.index = idx + 1
                    out.exist = true
                }
            })
        })

        return out
    }

    recieved(array_idx = 0){ if(this.array[array_idx]){ return true }else{ return false } }
    first(){ return this.array[0] }

    shift(count = 1)
    {
        let out:string;
        for(let i = 0; i < count; i++)
        {
            out = this.array.shift()
        }
        return out
    }

    shiftToArray(count = 1)
    {
        let out:Array<string> = [];
        for(let i = 0; i < count; i++)
        {
            out.push(this.array.shift())
        }
        return out
    }

    hasPassthrough(){ if(this.array.find(string => string == ">>")){ return true } else { return false } }
}