import { Footer, Header, List } from "../../internal/classes/dataFormats.js"
import { Computer } from "../../internal/classes/devices.js"
import { InvalidDeviceError } from "../../internal/classes/errors.js"
import { Session, UserInput, LocalData } from "../../internal/classes/executeTypes.js"
import { Website } from "../../internal/classes/websites.js"
import { getResolvedDomain } from "../../internal/utils/ip.js"

export default
{
    name: "net",
    description: "Allows you to access location on the network and the internet",
    execute(session:Session, user_input:UserInput, local_data:LocalData)
    {
        const { command_flag: flag } = user_input
        let check:any;

        if(!user_input.recieved()){ return "Please provide more arguments" }

        const { domain, error } = getResolvedDomain(user_input.shift().toLowerCase(), session, local_data)
        if(error){ return error }
        
        const website = session.websites.fetch(domain)
        if(!website){ return `Unable to resolve domain "${domain}"` }
        
        if(!flag)
        {
            user_input.shift()
            return website.execute(session, user_input, local_data)
        }

        switch(flag)
        {
            case "-q":
            case "--query":
                check = check_files(website)
                if(check){ return check }
                return display_website_data(website)

            case "-d":
            case "--download":
                check = check_files(website)
                if(check){ return check }

                const { client } = local_data
                const { argument: file_name, exist } = user_input.getArgument(["-f", "--file"])
                const file = website.download(file_name)

                if(!(client instanceof Computer)){ return new InvalidDeviceError() }
                if(!exist){ return `File to download not specified please use "-f <file_name>" to specify a file to download` }
                if(!file_name){ return `No file name provided please specify it with "-f <file_name>"`}
                if(!file){ return `The domain "${website.name}" does not contain a file with the name "${file_name}"` }

                client.files.insert(website.download(file_name))
                return `File "${file_name}" successfully downloaded`

        }
    }
}

function display_website_data(website:Website)
{
    return new List()
    .importArray(website.listFiles())
    .addFirst(Header("<FILES>", 60))
    .add(Footer(60))
}

function check_files(website:Website)
{
    if(!website.hasFiles()){ return `The domain "${website.name}" does not contain any files` }
    if(!website.allowGuestFileAccess){ return `Access to files in not permitted` }
}