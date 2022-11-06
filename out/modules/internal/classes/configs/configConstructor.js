export { PC_Config };
class PC_Config {
    cpu_threads;
    ram_amount;
    ram_exponent;
    constructor(config) {
        this.cpu_threads = config.cpu_threads;
        this.ram_amount = config.ram_amount;
        this.ram_exponent = config.ram_exponent;
    }
}
class Router_Config {
    constructor(config_file) {
    }
}
