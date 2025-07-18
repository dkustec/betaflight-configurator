import { checkSetupAnalytics } from "./Analytics";
import $ from "jquery";

const css_dark = ["./css/dark-theme.css"];

const DarkTheme = {
    configSetting: undefined,
    enabled: false,
};

DarkTheme.isDarkThemeEnabled = function (callback) {
    if (this.configSetting === 0) {
        callback(true);
    } else if (this.configSetting === 2) {
        const isEnabled = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        callback(isEnabled);
    } else {
        callback(false);
    }
};

DarkTheme.apply = function () {
    const self = this;
    this.isDarkThemeEnabled(function (isEnabled) {
        if (isEnabled) {
            self.applyDark();
        } else {
            self.applyNormal();
        }
    });
};

DarkTheme.autoSet = function () {
    if (this.configSetting === 2) {
        this.apply();
    }
};

DarkTheme.setConfig = function (result) {
    if (this.configSetting !== result) {
        this.configSetting = result;
        this.apply();
    }
};

DarkTheme.applyDark = function () {
    $("body").addClass("dark-theme");
    this.enabled = true;
};

DarkTheme.applyNormal = function () {
    $("body").removeClass("dark-theme");
    this.enabled = false;
};

export function setDarkTheme(enabled) {
    DarkTheme.setConfig(enabled);
}

export default DarkTheme;
