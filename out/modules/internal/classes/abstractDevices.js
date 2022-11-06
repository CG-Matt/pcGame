export { Web };
class Web {
    name = "web";
    children = [];
    extend(child_class) {
        this.children.push(child_class);
    }
    getNetwork_byIP(network_pubic_ip) {
        return this.children.find(child => child.public_ip === network_pubic_ip);
    }
    getNetwork_byID(network_id) {
        return this.children.find(child => child.network_id === network_id);
    }
}
