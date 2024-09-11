import { MAX_MASS_KG, MAX_VOLUME_CM, REJECTED, SPECIAL, STANDARD } from "./common.js";

export function sort(width, height, length, mass) {
    const bulky = calculateIsBulky(width, height, length);
    const heavy = calculateIsHeavy(mass);
    
    return getStuckByCriteriasResult(bulky, heavy);
}

function calculateIsBulky(width, height, length) {
    if (width === undefined) throw new Error("Width is not provided.");
    if (height === undefined) throw new Error("Height is not provided.");
    if (length === undefined) throw new Error("Length is not provided.");

    if (width < 0) throw new Error("Width can't be negative.");
    if (height < 0) throw new Error("Height can't be negative.");
    if (length < 0) throw new Error("Length can't be negative.");

    const volume = width * height * length;
    return volume >= MAX_VOLUME_CM;
}

function calculateIsHeavy(mass) {
    if (mass === undefined) throw new Error("Mass is not providec.");
    if (mass < 0) throw new Error("Mass can't be negative.");

    return mass >= MAX_MASS_KG;
}

function getStuckByCriteriasResult(bulky, heavy) {
    return bulky && heavy
        ? REJECTED
        : bulky || heavy
        ? SPECIAL
        : STANDARD;
}