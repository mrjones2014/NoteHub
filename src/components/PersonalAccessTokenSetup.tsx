import React, { useState } from "react";
import GlobalConstants from "@modules/GlobalConstants";
import { Button, Input } from '@material-ui/core';
import { shell } from 'electron';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsManager from '@modules/SettingsManager';
import useAppState from '@appstate';

const PersonalAccessTokenSetup: React.FC = () => {
    const [appState, setAppState] = useAppState();
    const [buttonClicked, setButtonClicked] = useState(false);
    const [token, setToken] = useState("");
    const onClick = () => {
        shell.openExternal(GlobalConstants.githubPersonalAccessTokenCreationUrl);
        setButtonClicked(true);
    };
    const onTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value);
    const setPersonalAccessToken = () => {
        SettingsManager.githubPersonalAccessToken = token;
        setAppState(appState.with({ githubPersonalAccessToken: token }));
    };

    return (
        <div className="c-personal-access-token-setup">
            {
                !buttonClicked &&
                <React.Fragment>
                    <p>To get started, create a Github Personal Access Token.</p>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<GitHubIcon/>}
                        onClick={onClick}>
                            Set Up Your Github Personal Access Token
                    </Button>
                </React.Fragment>
            }
            {
                buttonClicked &&
                <React.Fragment>
                    <p>Then, paste your Personal Access Token here.</p>
                    <Input
                        placeholder="Paste your Personal Access Token, then click the button below."
                        type="text"
                        value={token}
                        onChange={onTokenInputChange}/>
                    <Button
                        className="-step-2"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<GitHubIcon/>}
                        onClick={setPersonalAccessToken}>
                            Set Token
                    </Button>
                </React.Fragment>
            }
        </div>
    );
};

export default PersonalAccessTokenSetup;
