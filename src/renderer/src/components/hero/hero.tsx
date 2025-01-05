import { useNavigate } from "react-router-dom";
import * as styles from "./hero.css";
import { useEffect, useState } from "react";
import type { TrendingGame } from "@types";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

export function Hero() {
  const [featuredGameDetails, setFeaturedGameDetails] = useState<
    TrendingGame[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const { i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    window.electron
      .getTrendingGames()
      .then((result) => {
        setFeaturedGameDetails(result);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  if (isLoading) {
    return <Skeleton className={styles.hero} />;
  }

  if (featuredGameDetails?.length) {
    return featuredGameDetails.map((game, index) => (
      <button
        type="button"
        onClick={() => navigate(game.uri)}
        className={styles.hero}
        key={index}
      >
        <div className={styles.backdrop}>
          <img
            src={game.background}
            alt={game.description}
            className={styles.heroMedia}
          />

          <div className={styles.content}>
            {game.logo && (
              <img
                src={game.logo}
                width="250px"
                alt={game.description}
                loading="eager"
              />
            )}
            <p className={styles.description}>{game.description}</p>
          </div>
        </div>
      </button>
    ));
  }

  return null;
}
