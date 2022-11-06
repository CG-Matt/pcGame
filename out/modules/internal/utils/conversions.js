export { toBits, toBytes, toFrequency };
function toBytes(exponent) {
    const exponents = [
        "B",
        "kB",
        "MB",
        "GB",
        "TB",
        "PB"
    ];
    if (exponent > exponents.length) {
        return exponents[0];
    }
    else {
        return exponents[exponent];
    }
}
function toBits(exponent) {
    const exponents = [
        "b",
        "kb",
        "Mb",
        "Gb",
        "Tb",
        "Pb"
    ];
    if (exponent > exponents.length) {
        return exponents[0];
    }
    else {
        return exponents[exponent];
    }
}
function toFrequency(exponent) {
    const exponents = [
        "Hz",
        "kHz",
        "MHz",
        "GHz",
        "THz",
        "PHz"
    ];
    if (exponent > exponents.length) {
        return exponents[0];
    }
    else {
        return exponents[exponent];
    }
}
