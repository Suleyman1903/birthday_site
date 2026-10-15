import { useState, useRef, useEffect } from 'react';
import { Music, Disc, Play, Pause, SkipForward, SkipBack, Heart, Sparkles, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { birthdayData, type SongItem } from '@/data/birthdayData';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function SongsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isMuted, setIsMuted] = useState(false);

  const songs: SongItem[] = birthdayData.songs || [];
  const currentSong = songs[currentIndex] || null;

  // Intersection observer for smooth entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Play audio safely
  const playAudio = async () => {
    if (!audioRef.current || !currentSong?.audioUrl) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('Playback error or blocked by browser:', err);
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleSelectSong = (index: number) => {
    setCurrentIndex(index);
    setCurrentTime(0);
    // When selected by user click, immediately start playback
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        playAudio();
      }
    }, 50);
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    handleSelectSong(nextIdx);
  };

  const handlePrev = () => {
    if (songs.length === 0) return;
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    handleSelectSong(prevIdx);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percent * duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const onEnded = () => {
    handleNext();
  };

  if (!songs || songs.length === 0) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-3 sm:px-6 overflow-hidden">
      {/* HTML5 Audio element for genuine sound playback */}
      <audio
        ref={audioRef}
        src={currentSong?.audioUrl || ''}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="auto"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-rose-200/35 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-500 text-xs font-heading font-medium mb-3 shadow-sm">
            <Music className="w-3.5 h-3.5" />
            <span>Bizim Melodilerimiz</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl text-rose-500 font-bold mb-3 px-2">
            Seni Hatırlatan Şarkılar
          </h2>
          <p className="font-body text-ink-700 text-sm sm:text-base max-w-lg mx-auto px-4">
            Aşağıdaki şarkılardan birine dokunarak dinleyebilirsin... 🎵
          </p>
        </div>

        {/* Featured Romantic Player Card */}
        {currentSong && (
          <div
            className={`relative mb-10 sm:mb-12 rounded-3xl glass-card bg-white/85 p-5 sm:p-8 border border-white/90 shadow-2xl shadow-rose-200/50 transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              {/* Spinning Vinyl Record Visual with Album Art */}
              <div
                onClick={togglePlay}
                className="relative group shrink-0 cursor-pointer"
                title={isPlaying ? 'Durdur' : 'Oynat'}
              >
                <div
                  className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-stone-900 border-4 border-stone-800 shadow-2xl flex items-center justify-center transition-transform duration-700 hover:scale-105 active:scale-95 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-radial-gradient(circle, #292524 0, #1c1917 2px, #292524 4px)',
                  }}
                >
                  {/* Vinyl grooves shine overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Vinyl Center Album Art Label */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/90 overflow-hidden shadow-inner flex items-center justify-center bg-rose-200">
                    {currentSong.cover ? (
                      <img
                        src={currentSong.cover}
                        alt={currentSong.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    )}
                    {/* Small center vinyl spindle dot */}
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-stone-950 border border-white/60 shadow-sm" />
                  </div>
                </div>

                {/* Disc / Play Badge Overlay */}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white border border-rose-200 shadow-md flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                  {isPlaying ? (
                    <Disc className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5 fill-rose-500 ml-0.5" />
                  )}
                </div>
              </div>

              {/* Player Info & Interactive Controls */}
              <div className="flex-1 w-full text-center md:text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                    <span className="text-xs font-heading font-semibold text-rose-500 uppercase tracking-wider">
                      Şarkı {currentIndex + 1} / {songs.length}
                    </span>
                    {isPlaying && (
                      <span className="flex items-center gap-0.5 h-3">
                        <span className="w-1 bg-rose-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-rose-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-peach-400 rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink-900 leading-tight">
                    {currentSong.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-rose-500 font-medium mb-3">
                    {currentSong.artist}
                  </p>

                  {/* Special Romantic Note if provided */}
                  {currentSong.note && (
                    <div className="relative p-3 rounded-2xl bg-rose-50/80 border border-rose-200/60 mb-4 text-xs sm:text-sm text-ink-700 italic">
                      <span className="text-rose-400 font-serif mr-1">“</span>
                      {currentSong.note}
                      <span className="text-rose-400 font-serif ml-1">”</span>
                    </div>
                  )}
                </div>

                {/* Interactive Clickable Seek Bar */}
                <div className="w-full mb-4">
                  <div
                    onClick={handleSeek}
                    className="group/seek relative w-full h-2 rounded-full bg-rose-100 cursor-pointer overflow-hidden py-0.5"
                    title="İlerletmek için tıkla"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-peach-400 transition-all duration-150 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                    />
                  </div>
                  {/* Timer display */}
                  <div className="flex justify-between items-center text-[11px] font-mono text-ink-700/60 mt-1 px-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  {/* Main Playback Buttons */}
                  <div className="flex items-center justify-center gap-3 mx-auto md:mx-0">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-full bg-rose-100/80 hover:bg-rose-200 active:scale-95 text-rose-600 transition-all cursor-pointer shadow-sm"
                      aria-label="Önceki şarkı"
                    >
                      <SkipBack className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 hover:scale-105 active:scale-95 text-white shadow-lg shadow-rose-300/60 flex items-center justify-center transition-all cursor-pointer"
                      aria-label={isPlaying ? 'Durdur' : 'Oynat'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-full bg-rose-100/80 hover:bg-rose-200 active:scale-95 text-rose-600 transition-all cursor-pointer shadow-sm"
                      aria-label="Sonraki şarkı"
                    >
                      <SkipForward className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full text-rose-400 hover:text-rose-600 transition-colors cursor-pointer ml-1"
                      aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Spotify Button */}
                  <div className="flex items-center justify-center gap-2 mx-auto md:mx-0">
                    {currentSong.spotifyUrl && (
                      <a
                        href={currentSong.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] text-xs font-heading font-medium transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Spotify'da Aç</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5 Song Cards Playlist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {songs.map((song, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={song.id || idx}
                onClick={() => handleSelectSong(idx)}
                className={`relative rounded-2xl p-3.5 sm:p-4 transition-all duration-300 cursor-pointer select-none group border ${
                  isActive
                    ? 'glass-card bg-white/95 border-rose-300 shadow-lg shadow-rose-200/50 scale-[1.02] -translate-y-0.5'
                    : 'glass-card bg-white/60 hover:bg-white/85 border-white/80 hover:border-rose-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Album Cover Thumbnail with Play/Pause state */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0 border border-rose-100 bg-rose-50 flex items-center justify-center">
                    {song.cover ? (
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-5 h-5 text-rose-400" />
                    )}

                    {/* Active playing indicator badge */}
                    {isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        {isPlaying ? (
                          <span className="flex items-center gap-0.5 h-3">
                            <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                            <span className="w-0.5 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
                            <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
                          </span>
                        ) : (
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Song details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`font-heading font-semibold text-sm truncate transition-colors ${
                          isActive ? 'text-rose-600' : 'text-ink-900 group-hover:text-rose-600'
                        }`}
                      >
                        {song.title}
                      </h4>
                      {isActive && (
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0 animate-pulse" />
                      )}
                    </div>

                    <p className="font-body text-xs text-ink-700/80 truncate">
                      {song.artist}
                    </p>

                    {song.note && (
                      <p className="font-body text-[11px] text-ink-700/70 line-clamp-1 leading-relaxed mt-1">
                        {song.note}
                      </p>
                    )}
                  </div>

                  {/* Click to play icon hint */}
                  <div className="shrink-0 text-rose-400 opacity-70 group-hover:opacity-100 transition-opacity">
                    {isActive && isPlaying ? (
                      <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
