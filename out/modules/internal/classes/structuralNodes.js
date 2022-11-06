export { TreeTop, TreeNode };
class TreeTop {
    children = [];
    self;
    constructor(abstract_device) {
        this.self = abstract_device;
    }
    // appendTop(abstract_device:Web | ISP)
    // {
    //     this.children.push(new TreeTop(abstract_device))
    // }
    // appendNode(device:Router | Computer)
    // {
    //     this.children.push(new TreeNode(device))
    // }
    // newChild(child:TreeTop | TreeNode)
    // {
    //     this.children.push(child)
    // }
    get(display_name) {
        return this.children.find(node => node.self.display_name === display_name);
    }
}
class TreeNode {
    children = [];
    self;
    constructor(device) {
        this.self = device;
    }
    newChild(child_device) {
        this.children.push(new TreeNode(child_device));
    }
    get(child_private_ip) {
        if (child_private_ip) {
            if (typeof child_private_ip === "string") {
                return this.children.find(node => node.self.private_ip === child_private_ip);
            }
            if (typeof child_private_ip === "object") {
                return this.children.filter(node => child_private_ip.includes(node.self.private_ip));
            }
        }
        else {
            return this.children;
        }
    }
}
