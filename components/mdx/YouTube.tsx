'use client';

import { getEmbedUrl } from '@/utils/embeded-url';
import * as React from 'react';

type YouTubeProps = {
  url: string;
  title?: string;
};

export default function YouTube({ url, title }: YouTubeProps) {
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="not-prose rounded-2xl border border-border bg-background p-4">
        <div className="text-sm font-medium">{title ?? 'YouTube'}</div>
        <div className="mt-1 text-sm text-muted-foreground">Invalid YouTube URL</div>
        {url ? (
          <a
            className="mt-2 inline-block text-sm underline"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Open link
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="not-prose">
      {title ? <div className="mb-2 text-sm font-medium">{title}</div> : null}
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title ?? 'YouTube video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
