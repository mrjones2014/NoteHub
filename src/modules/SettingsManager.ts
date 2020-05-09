import nameof from '@modules/nameof';
import Settings from 'electron-settings';

export interface UserSettings {
    personalAccessToken?: string;
}

export default class SettingsManager {
    static get githubPersonalAccessToken(): string | undefined {
        return Settings.get(nameof<UserSettings>("personalAccessToken")) as string;
    }

    static set githubPersonalAccessToken(token: string) {
        Settings.set(nameof<UserSettings>("personalAccessToken"), token);
    }

    static get filePath(): string {
        return Settings.file();
    }
}
