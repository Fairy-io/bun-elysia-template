export const parseIntObject = (obj: {
    [key: string]: any;
}): { [key: string]: any } => {
    const parsedObject: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
        const parsedValue = parseInt(obj[key]);

        if (!Number.isNaN(parsedValue)) {
            parsedObject[key] = parsedValue;
        } else {
            parsedObject[key] = obj[key];
        }
    });

    return parsedObject;
};
