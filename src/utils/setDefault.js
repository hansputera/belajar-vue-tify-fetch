function setAsDefault(data) {
    switch(typeof data) {
        case "number":
        case "bigint":
            return 0;
        case "boolean":
            return false;
        case "object":
            return {};
        case "string":
            return "";
        default:
            return undefined;
    }
}

export default setAsDefault;