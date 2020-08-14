const fieldSubStringMap = {
    batteryId: ["BAT"],
    customerId: ["CUS"],
    vehicleId: ["BLR"]
}

export function searchKeyField(searchStringSub :string){
    let key = ''
    let entries = Object.entries(fieldSubStringMap);
    for (const [prop, val] of entries) {
        if ((val.filter(str => str === searchStringSub)).length > 0) {
            key = prop
            return key
        }
    }
    return key
}

