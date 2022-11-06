export { toBits, toBytes, toFrequency }

function toBytes(exponent:number)
{
    const exponents =
    [
        "B",
        "kB",
        "MB",
        "GB",
        "TB",
        "PB"
    ]

    if(exponent > exponents.length){ return exponents[0] }
    else{ return exponents[exponent] }
}

function toBits(exponent:number)
{
    const exponents =
    [
        "b",
        "kb",
        "Mb",
        "Gb",
        "Tb",
        "Pb"
    ]

    if(exponent > exponents.length){ return exponents[0] }
    else{ return exponents[exponent] }
}

function toFrequency(exponent:number)
{
    const exponents =
    [
        "Hz",
        "kHz",
        "MHz",
        "GHz",
        "THz",
        "PHz"
    ]

    if(exponent > exponents.length){ return exponents[0] }
    else{ return exponents[exponent] }
}