import { FileContainer } from "./files.js";
export { Website, WebsiteContainer };
class WebsiteContainer {
    contents = [];
    insert(website) {
        this.contents.push(website);
    }
    fetch(website_name) {
        return this.contents.find(website => website.name === website_name);
    }
}
class Website {
    name;
    allowGuestFileAccess;
    files = new FileContainer();
    execute;
    constructor(name, allowGuestFileAccess = false, execute) {
        this.name = name;
        this.allowGuestFileAccess = allowGuestFileAccess;
        this.execute = execute;
    }
    hasFiles() { return this.files.contents.length > 0; }
    hasFile(file_name) {
        if (this.files.fetch(file_name)) {
            return true;
        }
        else {
            return false;
        }
    }
    listFiles() {
        return this.files.contents.map(file => `File name: ${file.name}\t\t File type: ${file.type}`);
    }
    download(file_name) {
        return this.files.fetch(file_name);
    }
    upload(file) {
        this.files.insert(file);
        return this;
    }
}
