export class CookieManager {
    static set(name: string, value: string): void {
        document.cookie = name+"="+value+"; path=/";
    }

    static get(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }

    static delete(name: string): void {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
    }
}

export enum Cookies {
    RootDirPath = 'NoteHub.Cookies.RootDir'
}
