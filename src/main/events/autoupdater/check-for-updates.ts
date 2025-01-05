import type { AppUpdaterEvent } from "@types";
import { registerEvent } from "../register-event";
import updater, { UpdateInfo } from "electron-updater";
import { WindowManager } from "@main/services";
import { app } from "electron";
import { publishNotificationUpdateReadyToInstall } from "@main/services/notifications";

const { autoUpdater } = updater;

const sendEvent = (event: AppUpdaterEvent) => {
  WindowManager.mainWindow?.webContents.send("autoUpdaterEvent", event);
};

const sendEventsForDebug = false;

const isAutoInstallAvailable =
  process.platform !== "darwin" && process.env.PORTABLE_EXECUTABLE_FILE == null;

const mockValuesForDebug = () => {
  sendEvent({ type: "update-available", info: { version: "1.3.0" } });
  sendEvent({ type: "update-downloaded" });
};

const newVersionInfo = { version: "" };

const checkForUpdates = async (_event: Electron.IpcMainInvokeEvent) => {
  autoUpdater
    .once("update-available", (info: UpdateInfo) => {
      sendEvent({ type: "update-available", info });
      newVersionInfo.version = info.version;
    })
    .once("update-downloaded", () => {
      sendEvent({ type: "update-downloaded" });
      publishNotificationUpdateReadyToInstall(newVersionInfo.version);
    });

  if (app.isPackaged) {
    autoUpdater.autoDownload = isAutoInstallAvailable;
    autoUpdater.checkForUpdates();
  } else if (sendEventsForDebug) {
    mockValuesForDebug();
  }

  return isAutoInstallAvailable;
};

registerEvent("checkForUpdates", checkForUpdates);
