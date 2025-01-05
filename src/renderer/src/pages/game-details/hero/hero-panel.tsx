import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { useDate, useDownload } from "@renderer/hooks";

import { HeroPanelActions } from "./hero-panel-actions";
import * as styles from "./hero-panel.css";
import { HeroPanelPlaytime } from "./hero-panel-playtime";

import { gameDetailsContext } from "@renderer/context";

export interface HeroPanelProps {
  isHeaderStuck: boolean;
}

export function HeroPanel({ isHeaderStuck }: HeroPanelProps) {
  const { t } = useTranslation("game_details");

  const { formatDate } = useDate();

  const { game, repacks, gameColor } = useContext(gameDetailsContext);

  const { lastPacket } = useDownload();

  const isGameDownloading =
    game?.status === "active" && lastPacket?.game.id === game?.id;

  const getInfo = () => {
    if (!game) {
      const [latestRepack] = repacks;

      if (latestRepack) {
        const lastUpdate = latestRepack.uploadDate
          ? formatDate(latestRepack.uploadDate!)
          : "";
        const repacksCount = repacks.length;

        return (
          <>
            <p>{t("updated_at", { updated_at: lastUpdate })}</p>
            <p>{t("download_options", { count: repacksCount })}</p>
          </>
        );
      }

      return <p>{t("no_downloads")}</p>;
    }

    return <HeroPanelPlaytime />;
  };

  const showProgressBar =
    (game?.status === "active" && game?.progress < 1) ||
    game?.status === "paused";

  return (
    <>
      <div
        style={{ backgroundColor: gameColor }}
        className={styles.panel({ stuck: isHeaderStuck })}
      >
        <div className={styles.content}>{getInfo()}</div>
        <div className={styles.actions}>
          <HeroPanelActions />
        </div>

        {showProgressBar && (
          <progress
            max={1}
            value={
              isGameDownloading ? lastPacket?.game.progress : game?.progress
            }
            className={styles.progressBar({
              disabled: game?.status === "paused",
            })}
          />
        )}
      </div>
    </>
  );
}
