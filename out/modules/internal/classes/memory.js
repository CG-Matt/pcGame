class Memory {
    memory;
    getAtAddress(memory_Address) {
        this.memory.find(memory => memory.address === memory_Address);
    }
}
class Memory_Chunk {
    address;
    contents;
}
export {};
