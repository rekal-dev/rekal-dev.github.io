import type { Metadata } from "next";
import Game from "./Game";

export const metadata: Metadata = {
  title: "World Cup Math — Solve fast, score goals",
  description:
    "A free 1v1 football math game. Answer quick-fire math questions to dribble past your opponent and score — four difficulty levels from Rookie to Legend.",
  alternates: { canonical: "https://rekal.dev/worldcupmath" },
  openGraph: {
    title: "World Cup Math ⚽ Solve fast, score goals",
    description:
      "Answer quick-fire math questions to dribble past your opponent and score goals. Free to play, no accounts.",
    url: "https://rekal.dev/worldcupmath",
    siteName: "Rekal",
    type: "website",
  },
};

export default function Page() {
  return <Game />;
}
