import SeasonNow from "@/components/SeasonNow";
import TopAnime from "@/components/TopAnime";
import TopManga from "@/components/TopManga";

export default function Home() {
  return (
    <main className="w-full">
      <SeasonNow />
      <TopAnime />
      <TopManga />
    </main>
  )
}
