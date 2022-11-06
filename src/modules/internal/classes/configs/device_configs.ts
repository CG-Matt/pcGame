export { PC_Specs, Device_Config, PC_Config, Router_Config, Port_Config }

type Port_Config =
{
    name:string;
    id:number;
    status:boolean;
}

type Device_Config =
{
    display_name:string;
    device_type:string;
    private_ip:string;
    network_id:number;
    isp_id:number
    physical_access?:boolean;
}

type PC_Config =
{
    display_name:string;
    root_access:boolean;
    money:number;
    private_ip:string;
    ports:Array<Port_Config>|string;
    specs:PC_Specs;
    physical_access?:boolean;
    is_start_point?:boolean;
}

type Router_Config =
{
    display_name:string;
    public_ip:string;
    private_ip:string;
    password:string;
    physical_access?:boolean;
}

type PC_Specs =
{
    cpu_threads:number;
    ram_amount:number;
    ram_exponent:number;
}

