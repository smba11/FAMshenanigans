"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Play,
  Plus,
  Edit3,
  MonitorPlay,
  Eye,
  Upload,
  ChevronRight,
  ChevronDown,
  Search,
  Save,
  Film,
  Lock,
  Shield,
  LogOut,
  Trash2,
  Captions,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const VIEWER_CODE = "famwatch2026";
const CREATOR_CODE = "amancreator2026";

const starterShows = [
  {
    id: "show-1",
    title: "Shadow School",
    description:
      "A student-made series with secrets, rivalries, and a bigger mystery hiding in plain sight.",
    banner:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    featured: true,
    published: true,
    seasons: [
      {
        id: "season-1",
        number: 1,
        title: "Season 1",
        episodes: [
          {
            id: "ep-1",
            number: 1,
            title: "The First Bell",
            description: "A normal day at school turns into something way bigger.",
            duration: "18m",
            thumbnail:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            subtitleUrl: "",
            published: true,
          },
          {
            id: "ep-2",
            number: 2,
            title: "Rumors",
            description: "Everyone knows something, but no one knows enough.",
            duration: "21m",
            thumbnail:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            subtitleUrl: "",
            published: true,
          },
        ],
      },
    ],
  },
  {
    id: "show-2",
    title: "Hallway Tapes",
    description:
      "Short episodes, different stories, same school. Every hallway has a history.",
    banner:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=900&auto=format&fit=crop",
    featured: false,
    published: true,
    seasons: [
      {
        id: "season-2",
        number: 1,
        title: "Season 1",
        episodes: [
          {
            id: "ep-3",
            number: 1,
            title: "Locker 18",
            description: "One locker. Too many stories.",
            duration: "14m",
            thumbnail:
              "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=900&auto=format&fit=crop",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            subtitleUrl: "",
            published: true,
          },
        ],
      },
    ],
  },
];

const emptyShow = {
  title: "",
  description: "",
  banner: "",
  cover: "",
};

const emptySeason = {
  title: "",
  number: "",
};

const emptyEpisode = {
  title: "",
  number: "",
  description: "",
  duration: "",
  thumbnail: "",
  videoUrl: "",
  subtitleUrl: "",
  videoFileName: "",
  subtitleFileName: "",
};

function IntroAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.22),transparent_42%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_100%,60px_100%] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      <div className="relative h-44 w-28">
        <div className="absolute left-0 top-0 h-full w-5 rounded-sm bg-red-700 shadow-[0_0_40px_rgba(229,9,20,0.4)] animate-[leftBar_1.05s_ease-out_forwards]" />
        <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 skew-x-[24deg] rounded-sm bg-red-600 shadow-[0_0_50px_rgba(229,9,20,0.65)] animate-[midBar_1.15s_ease-out_forwards]" />
        <div className="absolute right-0 top-0 h-full w-5 rounded-sm bg-red-700 shadow-[0_0_40px_rgba(229,9,20,0.4)] animate-[rightBar_1.05s_ease-out_forwards]" />
      </div>
      <style jsx>{`
        @keyframes leftBar {
          0% { transform: translateY(22px) scaleY(0.2); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
        @keyframes midBar {
          0% { transform: translateX(-50%) scaleY(0.2) skewX(24deg); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateX(-50%) scaleY(1) skewX(24deg); opacity: 1; }
        }
        @keyframes rightBar {
          0% { transform: translateY(-22px) scaleY(0.2); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(0) scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ShowRow({ title, shows, onOpenShow, onQuickPlay }) {
  if (!shows.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shows.map((show) => (
          <Card
            key={show.id}
            className="group overflow-hidden border-zinc-800 bg-zinc-950 text-white transition-transform duration-200 hover:-translate-y-1 hover:border-zinc-700"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={show.cover}
                alt={show.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <Button size="sm" className="rounded-full" onClick={() => onQuickPlay(show)}>
                  <Play className="mr-1 h-4 w-4" /> Play
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                  onClick={() => onOpenShow(show)}
                >
                  Details
                </Button>
              </div>
            </div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="line-clamp-1 text-lg font-semibold">{show.title}</h3>
                <Badge className="bg-red-600 text-white hover:bg-red-600">Series</Badge>
              </div>
              <p className="line-clamp-2 text-sm text-zinc-400">{show.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function EpisodeCard({ episode, onWatch }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 md:flex-row md:items-center">
      <img
        src={episode.thumbnail}
        alt={episode.title}
        className="h-32 w-full rounded-xl object-cover md:w-56"
      />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Episode {episode.number}</span>
          <span>•</span>
          <span>{episode.duration || "TBD"}</span>
        </div>
        <h4 className="text-lg font-semibold text-white">{episode.title}</h4>
        <p className="text-sm text-zinc-400">{episode.description}</p>
      </div>
      <Button className="rounded-full" onClick={() => onWatch(episode)}>
        <Play className="mr-2 h-4 w-4" /> Watch
      </Button>
    </div>
  );
}

export default function StreamingPlatformV1() {
  const [showIntro, setShowIntro] = useState(true);
  const [accessRole, setAccessRole] = useState(null);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");

  const [mode, setMode] = useState("user");
  const [view, setView] = useState("home");
  const [shows, setShows] = useState(starterShows);
  const [search, setSearch] = useState("");
  const [selectedShowId, setSelectedShowId] = useState(starterShows[0].id);
  const [selectedEpisode, setSelectedEpisode] = useState(
    starterShows[0].seasons[0].episodes[0]
  );
  const [seasonDropdowns, setSeasonDropdowns] = useState({});

  const [showForm, setShowForm] = useState(emptyShow);
  const [seasonForm, setSeasonForm] = useState(emptySeason);
  const [episodeForm, setEpisodeForm] = useState(emptyEpisode);
  const [creatorSelectedShowId, setCreatorSelectedShowId] = useState(starterShows[0].id);
  const [creatorSelectedSeasonId, setCreatorSelectedSeasonId] = useState(starterShows[0].seasons[0].id);

  const handleEpisodeVideoFile = (file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setEpisodeForm((prev) => ({
      ...prev,
      videoUrl: fileUrl,
      videoFileName: file.name,
    }));
  };

  const handleEpisodeSubtitleFile = (file) => {
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setEpisodeForm((prev) => ({
      ...prev,
      subtitleUrl: fileUrl,
      subtitleFileName: file.name,
    }));
  };

  const publishedShows = useMemo(() => shows.filter((show) => show.published), [shows]);

  const filteredShows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return publishedShows;
    return publishedShows.filter(
      (show) =>
        show.title.toLowerCase().includes(q) ||
        show.description.toLowerCase().includes(q)
    );
  }, [publishedShows, search]);

  const selectedShow = useMemo(
    () => shows.find((show) => show.id === selectedShowId) || shows[0],
    [shows, selectedShowId]
  );

  const creatorSelectedShow = useMemo(
    () => shows.find((show) => show.id === creatorSelectedShowId) || shows[0],
    [shows, creatorSelectedShowId]
  );

  const creatorSelectedSeason = useMemo(
    () =>
      creatorSelectedShow?.seasons.find((season) => season.id === creatorSelectedSeasonId) ||
      creatorSelectedShow?.seasons[0],
    [creatorSelectedShow, creatorSelectedSeasonId]
  );

  const featuredShow = publishedShows.find((show) => show.featured) || publishedShows[0];

  const handleAccessSubmit = () => {
    if (accessCode === CREATOR_CODE) {
      setAccessRole("creator");
      setMode("creator");
      setView("creator");
      setAccessError("");
      return;
    }

    if (accessCode === VIEWER_CODE) {
      setAccessRole("viewer");
      setMode("user");
      setView("home");
      setAccessError("");
      return;
    }

    setAccessError("Wrong code. Try again.");
  };

  const logout = () => {
    setAccessRole(null);
    setAccessCode("");
    setAccessError("");
    setMode("user");
    setView("home");
  };

  const openShow = (show) => {
    setSelectedShowId(show.id);
    setView("show");
  };

  const quickPlay = (show) => {
    const firstPublishedEpisode = show.seasons
      .flatMap((season) => season.episodes)
      .find((ep) => ep.published);

    if (firstPublishedEpisode) {
      setSelectedShowId(show.id);
      setSelectedEpisode(firstPublishedEpisode);
      setView("watch");
    }
  };

  const watchEpisode = (episode) => {
    setSelectedEpisode(episode);
    setView("watch");
  };

  const toggleSeason = (seasonId) => {
    setSeasonDropdowns((prev) => ({ ...prev, [seasonId]: !prev[seasonId] }));
  };

  const addShow = () => {
    if (!showForm.title.trim()) return;

    const newShowId = `show-${Date.now()}`;
    const fallbackCover =
      showForm.cover ||
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop";
    const fallbackBanner = showForm.banner || fallbackCover;

    const newShow = {
      id: newShowId,
      title: showForm.title,
      description: showForm.description,
      cover: fallbackCover,
      banner: fallbackBanner,
      featured: false,
      published: true,
      seasons: [],
    };

    setShows((prev) => [...prev, newShow]);
    setCreatorSelectedShowId(newShowId);
    setCreatorSelectedSeasonId("");
    setShowForm(emptyShow);
  };

  const addSeason = () => {
    if (!creatorSelectedShow || !seasonForm.number) return;

    const newSeasonId = `season-${Date.now()}`;
    setShows((prev) =>
      prev.map((show) => {
        if (show.id !== creatorSelectedShow.id) return show;
        return {
          ...show,
          seasons: [
            ...show.seasons,
            {
              id: newSeasonId,
              number: Number(seasonForm.number),
              title: seasonForm.title || `Season ${seasonForm.number}`,
              episodes: [],
            },
          ],
        };
      })
    );

    setCreatorSelectedSeasonId(newSeasonId);
    setSeasonForm(emptySeason);
  };

  const addEpisode = () => {
    if (!creatorSelectedShow || !creatorSelectedSeason || !episodeForm.title.trim()) return;

    const newEpisode = {
      id: `ep-${Date.now()}`,
      number: Number(episodeForm.number || creatorSelectedSeason.episodes.length + 1),
      title: episodeForm.title,
      description: episodeForm.description,
      duration: episodeForm.duration,
      thumbnail:
        episodeForm.thumbnail ||
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop",
      videoUrl: episodeForm.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4",
      subtitleUrl: episodeForm.subtitleUrl || "",
      published: true,
    };

    setShows((prev) =>
      prev.map((show) => {
        if (show.id !== creatorSelectedShow.id) return show;
        return {
          ...show,
          seasons: show.seasons.map((season) => {
            if (season.id !== creatorSelectedSeason.id) return season;
            return {
              ...season,
              episodes: [...season.episodes, newEpisode],
            };
          }),
        };
      })
    );

    setEpisodeForm(emptyEpisode);
  };

  const togglePublished = (showId) => {
    setShows((prev) =>
      prev.map((show) =>
        show.id === showId ? { ...show, published: !show.published } : show
      )
    );
  };

  const setFeatured = (showId) => {
    setShows((prev) => prev.map((show) => ({ ...show, featured: show.id === showId })));
  };

  const deleteShow = (showId) => {
    setShows((prev) => {
      if (prev.length <= 1) return prev;
      const nextShows = prev.filter((show) => show.id !== showId);

      if (selectedShowId === showId) {
        setSelectedShowId(nextShows[0].id);
        const nextEpisode = nextShows[0]?.seasons?.[0]?.episodes?.[0];
        if (nextEpisode) setSelectedEpisode(nextEpisode);
      }

      if (creatorSelectedShowId === showId) {
        setCreatorSelectedShowId(nextShows[0].id);
        setCreatorSelectedSeasonId(nextShows[0]?.seasons?.[0]?.id || "");
      }

      return nextShows;
    });
  };

  if (showIntro) {
    return <IntroAnimation onFinish={() => setShowIntro(false)} />;
  }

  if (!accessRole) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141414] px-4 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:60px_100%] opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.14),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />
        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-zinc-800/80 bg-black/80 p-8 shadow-2xl shadow-black/60 backdrop-blur-sm">
          <div className="mb-8 space-y-3">
            <h1 className="text-5xl font-black tracking-[0.28em] text-red-600">SMBAFLEX</h1>
            <p className="text-sm text-zinc-400">Invite-only streaming access</p>
          </div>

          <div className="mb-6 space-y-3 rounded-2xl border border-zinc-800 bg-[#141414] p-4 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Viewer code = watch access
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Creator code = dashboard access
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAccessSubmit()}
              className="h-12 border-zinc-800 bg-zinc-900 text-white"
            />
            {accessError && <p className="text-sm text-red-400">{accessError}</p>}
            <Button className="h-12 w-full rounded-xl" onClick={handleAccessSubmit}>
              Enter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-[#141414]/85 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_100%] opacity-15" />
          <div className="relative z-10 flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-[0.22em] text-red-600">SMBAFLEX</h1>
            <div>
              <p className="text-xs text-zinc-400">
                {accessRole === "creator" ? "Creator access" : "Viewer access"}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            {accessRole === "creator" && (
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-1">
                <Button
                  variant={mode === "user" ? "default" : "ghost"}
                  className="rounded-xl"
                  onClick={() => {
                    setMode("user");
                    setView("home");
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" /> User Mode
                </Button>
                <Button
                  variant={mode === "creator" ? "default" : "ghost"}
                  className="rounded-xl"
                  onClick={() => {
                    setMode("creator");
                    setView("creator");
                  }}
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Creator Mode
                </Button>
              </div>
            )}

            <Button
              variant="secondary"
              className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </Button>
          </div>
        </div>
      </header>

      {mode === "user" && (
        <main className="relative mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_100%] opacity-20" />
          {view === "home" && featuredShow && (
            <>
              <section className="relative overflow-hidden rounded-[2rem] border border-zinc-900">
                <img
                  src={featuredShow.banner}
                  alt={featuredShow.title}
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 max-w-2xl space-y-5 p-8 md:p-12">
                  <Badge className="bg-red-600 text-white hover:bg-red-600">Featured Series</Badge>
                  <h2 className="text-4xl font-black tracking-tight md:text-6xl">{featuredShow.title}</h2>
                  <p className="max-w-xl text-base text-zinc-300 md:text-lg">{featuredShow.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" className="rounded-full px-6" onClick={() => quickPlay(featuredShow)}>
                      <Play className="mr-2 h-5 w-5" /> Watch Now
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full bg-zinc-800 px-6 text-white hover:bg-zinc-700"
                      onClick={() => openShow(featuredShow)}
                    >
                      <Film className="mr-2 h-5 w-5" /> View Details
                    </Button>
                  </div>
                </div>
              </section>

              <section className="flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
                <Search className="h-5 w-5 text-zinc-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search shows..."
                  className="border-none bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-0"
                />
              </section>

              <ShowRow
                title="Trending Now"
                shows={filteredShows}
                onOpenShow={openShow}
                onQuickPlay={quickPlay}
              />
              <ShowRow
                title="Recently Added"
                shows={[...filteredShows].reverse()}
                onOpenShow={openShow}
                onQuickPlay={quickPlay}
              />
            </>
          )}

          {view === "show" && selectedShow && (
            <section className="space-y-8">
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-900">
                <img src={selectedShow.banner} alt={selectedShow.title} className="h-[320px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 max-w-2xl space-y-4 p-8">
                  <Button
                    variant="secondary"
                    className="w-fit rounded-full bg-zinc-800 text-white"
                    onClick={() => setView("home")}
                  >
                    Back Home
                  </Button>
                  <h2 className="text-4xl font-black">{selectedShow.title}</h2>
                  <p className="text-zinc-300">{selectedShow.description}</p>
                </div>
              </div>

              <div className="space-y-5">
                {selectedShow.seasons.map((season) => {
                  const isOpen = seasonDropdowns[season.id] ?? true;
                  const visibleEpisodes = season.episodes.filter((ep) => ep.published);
                  return (
                    <div key={season.id} className="rounded-[1.5rem] border border-zinc-900 bg-zinc-950 p-5">
                      <button
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => toggleSeason(season.id)}
                      >
                        <div>
                          <h3 className="text-2xl font-bold">{season.title}</h3>
                          <p className="text-sm text-zinc-400">{visibleEpisodes.length} episode(s)</p>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="mt-5 space-y-4">
                          {visibleEpisodes.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} onWatch={watchEpisode} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {view === "watch" && selectedEpisode && selectedShow && (
            <section className="space-y-6">
              <Button
                variant="secondary"
                className="rounded-full bg-zinc-800 text-white"
                onClick={() => setView("show")}
              >
                Back to Show
              </Button>

              <div className="overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950">
                <video className="aspect-video w-full bg-[#141414]" controls src={selectedEpisode.videoUrl}>
                  {selectedEpisode.subtitleUrl && (
                    <track
                      kind="subtitles"
                      src={selectedEpisode.subtitleUrl}
                      srcLang="en"
                      label="English"
                      default
                    />
                  )}
                </video>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-red-600 text-white hover:bg-red-600">Now Playing</Badge>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                      {selectedShow.title}
                    </Badge>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{selectedEpisode.title}</h2>
                    <p className="mt-2 text-zinc-400">{selectedEpisode.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">More Episodes</h3>
                {selectedShow.seasons
                  .flatMap((season) => season.episodes)
                  .filter((ep) => ep.published && ep.id !== selectedEpisode.id)
                  .map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} onWatch={watchEpisode} />
                  ))}
              </div>
            </section>
          )}
        </main>
      )}

      {mode === "creator" && accessRole === "creator" && (
        <main className="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_100%] opacity-20" />
          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="border-zinc-900 bg-zinc-950 text-white lg:col-span-1">
              <CardContent className="space-y-4 p-6">
                <div>
                  <h2 className="text-2xl font-bold">Add New Show</h2>
                  <p className="text-sm text-zinc-400">Create a show entry for new seasons and episodes.</p>
                </div>
                <Input
                  placeholder="Show title"
                  value={showForm.title}
                  onChange={(e) => setShowForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="border-zinc-800 bg-zinc-900"
                />
                <Textarea
                  placeholder="Show description"
                  value={showForm.description}
                  onChange={(e) => setShowForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px] border-zinc-800 bg-zinc-900"
                />
                <Input
                  placeholder="Banner image URL"
                  value={showForm.banner}
                  onChange={(e) => setShowForm((prev) => ({ ...prev, banner: e.target.value }))}
                  className="border-zinc-800 bg-zinc-900"
                />
                <Input
                  placeholder="Cover image URL"
                  value={showForm.cover}
                  onChange={(e) => setShowForm((prev) => ({ ...prev, cover: e.target.value }))}
                  className="border-zinc-800 bg-zinc-900"
                />
                <Button className="w-full rounded-xl" onClick={addShow}>
                  <Plus className="mr-2 h-4 w-4" /> Create Show
                </Button>
              </CardContent>
            </Card>

            <Card className="border-zinc-900 bg-zinc-950 text-white lg:col-span-2">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold">Creator Dashboard</h2>
                    <p className="text-sm text-zinc-400">Manage shows, seasons, and episodes.</p>
                  </div>
                  <Badge className="bg-zinc-800 text-zinc-200 hover:bg-zinc-800">
                    <MonitorPlay className="mr-2 h-4 w-4" /> {shows.length} show(s)
                  </Badge>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#141414] p-4 text-sm text-zinc-300">
                  <p>
                    Viewer code: <span className="font-semibold text-white">{VIEWER_CODE}</span>
                  </p>
                  <p>
                    Creator code: <span className="font-semibold text-white">{CREATOR_CODE}</span>
                  </p>
                  <p className="mt-2 text-zinc-500">
                    These are hardcoded for V1. Next we can move them into Supabase so you can change them from a settings page.
                  </p>
                  <p className="mt-2 text-zinc-500">
                    URL video links stay inside the website as long as they are direct video file URLs like .mp4, .webm, or streaming file URLs.
                  </p>
                  <p className="mt-2 text-zinc-500">
                    File uploads in this V1 are local preview only and disappear on refresh. Permanent storage needs a backend later.
                  </p>
                  <p className="mt-2 text-zinc-500">
                    Subtitles work here if you add a .vtt subtitle URL or upload a .vtt file.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Select Show</label>
                    <div className="mb-2 flex gap-2">
                      <Button
                        variant="destructive"
                        className="rounded-full"
                        onClick={() => deleteShow(creatorSelectedShowId)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Selected Show
                      </Button>
                    </div>
                    <select
                      value={creatorSelectedShowId}
                      onChange={(e) => {
                        const nextShowId = e.target.value;
                        setCreatorSelectedShowId(nextShowId);
                        const nextShow = shows.find((show) => show.id === nextShowId);
                        setCreatorSelectedSeasonId(nextShow?.seasons[0]?.id || "");
                      }}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none"
                    >
                      {shows.map((show) => (
                        <option key={show.id} value={show.id}>
                          {show.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400">Select Season</label>
                    <select
                      value={creatorSelectedSeasonId}
                      onChange={(e) => setCreatorSelectedSeasonId(e.target.value)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none"
                    >
                      {(creatorSelectedShow?.seasons || []).map((season) => (
                        <option key={season.id} value={season.id}>
                          {season.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <h3 className="font-semibold">Add Season</h3>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Season number"
                        value={seasonForm.number}
                        onChange={(e) => setSeasonForm((prev) => ({ ...prev, number: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Input
                        placeholder="Season title"
                        value={seasonForm.title}
                        onChange={(e) => setSeasonForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Button className="w-full rounded-xl" onClick={addSeason}>
                        <Save className="mr-2 h-4 w-4" /> Save Season
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <h3 className="font-semibold">Add Episode</h3>
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Episode number"
                        value={episodeForm.number}
                        onChange={(e) => setEpisodeForm((prev) => ({ ...prev, number: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Input
                        placeholder="Episode title"
                        value={episodeForm.title}
                        onChange={(e) => setEpisodeForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Textarea
                        placeholder="Episode description"
                        value={episodeForm.description}
                        onChange={(e) => setEpisodeForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="min-h-[90px] border-zinc-800 bg-zinc-900"
                      />
                      <Input
                        placeholder="Duration (ex: 22m)"
                        value={episodeForm.duration}
                        onChange={(e) => setEpisodeForm((prev) => ({ ...prev, duration: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Input
                        placeholder="Thumbnail URL"
                        value={episodeForm.thumbnail}
                        onChange={(e) => setEpisodeForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <Input
                        placeholder="Video URL"
                        value={episodeForm.videoUrl}
                        onChange={(e) =>
                          setEpisodeForm((prev) => ({ ...prev, videoUrl: e.target.value, videoFileName: "" }))
                        }
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <div className="space-y-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-3">
                        <label className="block text-sm text-zinc-400">Or upload video file</label>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleEpisodeVideoFile(e.target.files?.[0])}
                          className="border-zinc-800 bg-zinc-900 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1 file:text-white"
                        />
                        {episodeForm.videoFileName && (
                          <p className="text-xs text-zinc-400">Loaded file: {episodeForm.videoFileName}</p>
                        )}
                      </div>
                      <Input
                        placeholder="Subtitle URL (.vtt)"
                        value={episodeForm.subtitleUrl}
                        onChange={(e) =>
                          setEpisodeForm((prev) => ({ ...prev, subtitleUrl: e.target.value, subtitleFileName: "" }))
                        }
                        className="border-zinc-800 bg-zinc-900"
                      />
                      <div className="space-y-2 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 p-3">
                        <label className="flex items-center gap-2 text-sm text-zinc-400">
                          <Captions className="h-4 w-4" /> Or upload subtitle file (.vtt)
                        </label>
                        <Input
                          type="file"
                          accept=".vtt,text/vtt"
                          onChange={(e) => handleEpisodeSubtitleFile(e.target.files?.[0])}
                          className="border-zinc-800 bg-zinc-900 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1 file:text-white"
                        />
                        {episodeForm.subtitleFileName && (
                          <p className="text-xs text-zinc-400">Loaded subtitles: {episodeForm.subtitleFileName}</p>
                        )}
                      </div>
                      <Button className="w-full rounded-xl" onClick={addEpisode}>
                        <Save className="mr-2 h-4 w-4" /> Save Episode
                      </Button>
                      <p className="text-xs text-zinc-500">
                        V1 file uploads are local preview only and are not permanent yet.
                      </p>
                    </div>
                                        </div>
                  </div>
                </div>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">Your Shows</h2>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {shows.map((show) => (
                      <Card key={show.id} className="border-zinc-900 bg-zinc-950 text-white">
                        <CardContent className="space-y-4 p-5">
                          <div className="flex gap-4">
                            <img
                              src={show.cover}
                              alt={show.title}
                              className="h-28 w-24 rounded-xl object-cover"
                            />
                            <div className="min-w-0 flex-1 space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-xl font-semibold">{show.title}</h3>

                                {show.featured && (
                                  <Badge className="bg-red-600 text-white hover:bg-red-600">
                                    Featured
                                  </Badge>
                                )}

                                <Badge
                                  variant="outline"
                                  className="border-zinc-700 text-zinc-300"
                                >
                                  {show.published ? "Published" : "Hidden"}
                                </Badge>
                              </div>

                              <p className="line-clamp-3 text-sm text-zinc-400">
                                {show.description}
                              </p>

                              <p className="text-xs text-zinc-500">
                                {show.seasons.length} season(s) •{" "}
                                {show.seasons.reduce(
                                  (sum, season) => sum + season.episodes.length,
                                  0
                                )}{" "}
                                episode(s)
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="secondary"
                              className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                              onClick={() => togglePublished(show.id)}
                            >
                              {show.published ? "Unpublish" : "Publish"}
                            </Button>

                            <Button
                              variant="secondary"
                              className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                              onClick={() => setFeatured(show.id)}
                            >
                              Set Featured
                            </Button>

                            <Button
                              variant="secondary"
                              className="rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                              onClick={() => {
                                setMode("user");
                                setSelectedShowId(show.id);
                                setView("show");
                              }}
                            >
                              Preview
                            </Button>

                            <Button
                              variant="destructive"
                              className="rounded-full"
                              onClick={() => deleteShow(show.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Show
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>
          </section>
        </main>
      )}
    </div>
  );
}
                
