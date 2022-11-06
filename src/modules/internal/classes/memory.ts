export {}

class Memory
{
    memory:Array<Memory_Chunk>

    getAtAddress(memory_Address:string)
    {
        this.memory.find(memory => memory.address === memory_Address)
    }
}

class Memory_Chunk
{
    address:string;
    contents:any;
}