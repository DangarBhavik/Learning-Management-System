export const getEmbedUrl = (input: string): string | null => {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    // Allow pasting URLs without scheme.
    try {
      parsedUrl = new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }

  const hostname = parsedUrl.hostname.replace(/^www\./, '').toLowerCase();

  const toEmbed = (videoId: string) => {
    // Use nocookie domain for better privacy defaults.
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  if (hostname === 'youtu.be') {
    const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0];
    return videoId ? toEmbed(videoId) : null;
  }

  if (hostname.endsWith('youtube.com')) {
    // youtube.com/watch?v=<id>
    if (parsedUrl.pathname === '/watch') {
      const videoId = parsedUrl.searchParams.get('v');
      return videoId ? toEmbed(videoId) : null;
    }

    // youtube.com/embed/<id>
    if (parsedUrl.pathname.startsWith('/embed/')) {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[1];
      return videoId ? toEmbed(videoId) : null;
    }

    // youtube.com/shorts/<id>
    if (parsedUrl.pathname.startsWith('/shorts/')) {
      const shortsId = parsedUrl.pathname.split('/').filter(Boolean)[1];
      return shortsId ? toEmbed(shortsId) : null;
    }
  }

  return null;
};