export class ReactUtils {
    public static bindAll(obj: any): void {
        for (const key of Object.getOwnPropertyNames(obj.constructor.prototype)) {
            const val = obj[key];
    
            if (key !== "constructor" && typeof val === "function") {
                obj[key] = val.bind(obj);
            }
        }
    }
}
