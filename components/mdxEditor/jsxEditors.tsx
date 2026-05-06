'use client';

import {
  GenericJsxEditor,
  type JsxEditorProps,
  type JsxComponentDescriptor,
  useLexicalNodeRemove,
} from '@mdxeditor/editor';
import { cn } from '@/lib/utils';
import { BiTrash } from 'react-icons/bi';
import { RiLoader4Fill } from 'react-icons/ri';
import YouTubeEmbed from '@/components/mdx/YouTube';
import { Button } from '@/components/ui/button';
import { useDeleteFile } from '@/hooks/file/useDeleteFile';

function blockShellClass(readOnly?: boolean) {
  return cn(
    'not-prose',
    readOnly
      ? 'rounded-none border-0 bg-transparent p-0'
      : 'rounded-2xl border border-border bg-background p-4'
  );
}

function blockHeaderClass(readOnly?: boolean) {
  return cn('flex items-center justify-between gap-3', readOnly ? 'mb-2' : 'mb-3');
}

function getJsxStringProp(mdastNode: unknown, propName: string): string | undefined {
  const attributes = (mdastNode as { attributes?: Array<{ name?: string; value?: unknown }> })
    ?.attributes;
  const attr = attributes?.find(a => a?.name === propName);
  const value = attr?.value;
  return typeof value === 'string' ? value : undefined;
}

type CreateJsxComponentDescriptorsOptions = {
  courseId?: string;
  moduleId?: string;
  readOnly?: boolean;
};

function createFileAssetJsxEditor({
  courseId,
  moduleId,
  readOnly,
}: CreateJsxComponentDescriptorsOptions) {
  return function FileAssetJsxEditor({ mdastNode }: JsxEditorProps) {
    const url = getJsxStringProp(mdastNode, 'url');
    const name = getJsxStringProp(mdastNode, 'name');
    const fileId = getJsxStringProp(mdastNode, 'id');
    const removeNode = useLexicalNodeRemove();

    const { deleteFile, isDeleting } = useDeleteFile();

    const disableRemove = Boolean(readOnly) || isDeleting;

    return (
      <div className={blockShellClass(readOnly)}>
        <div className={blockHeaderClass(readOnly)}>
          {!readOnly && (
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{name ?? 'File'}</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => {
                if (!url) return;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              disabled={!url}
            >
              Open
            </Button>

            {!readOnly && (
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                onClick={async () => {
                  if (disableRemove) return;

                  if (courseId && moduleId && fileId) {
                    try {
                      await deleteFile({ courseId, moduleId, fileId });
                    } catch (err) {
                      console.error('Failed to delete file asset', err);
                    }
                  }

                  removeNode();
                }}
                aria-label="Remove file asset"
                title="Remove"
                disabled={disableRemove}
              >
                {isDeleting ? <RiLoader4Fill className="animate-spin" /> : <BiTrash />}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
}

function createVideoAssetJsxEditor({
  courseId,
  moduleId,
  readOnly,
}: CreateJsxComponentDescriptorsOptions) {
  return function VideoAssetJsxEditor({ mdastNode }: JsxEditorProps) {
    const url = getJsxStringProp(mdastNode, 'url');
    const poster = getJsxStringProp(mdastNode, 'poster');
    const title = getJsxStringProp(mdastNode, 'title');
    const fileId = getJsxStringProp(mdastNode, 'id');
    const removeNode = useLexicalNodeRemove();

    const { deleteFile, isDeleting } = useDeleteFile();

    const disableRemove = Boolean(readOnly) || isDeleting;

    return (
      <div className={blockShellClass(readOnly)}>
        <div className={blockHeaderClass(readOnly)}>
          <div className="min-w-0">
            {title ? <div className="truncate text-sm font-medium">{title}</div> : null}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => {
                if (!url) return;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              disabled={!url}
            >
              Open
            </Button>

            {!readOnly && (
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                onClick={async () => {
                  if (disableRemove) return;

                  if (courseId && moduleId && fileId) {
                    try {
                      await deleteFile({ courseId, moduleId, fileId });
                    } catch (err) {
                      console.error('Failed to delete video asset', err);
                    }
                  }

                  removeNode();
                }}
                aria-label="Remove video asset"
                title="Remove"
                disabled={disableRemove}
              >
                {isDeleting ? <RiLoader4Fill className="animate-spin" /> : <BiTrash />}
              </Button>
            )}
          </div>
        </div>

        {url ? (
          <div
            className={cn(
              !readOnly && 'overflow-hidden rounded-2xl border border-border bg-background'
            )}
          >
            <video
              controls
              preload="metadata"
              poster={poster}
              src={url}
              style={{ width: '100%' }}
            />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Video URL missing</div>
        )}
      </div>
    );
  };
}

function createImageAssetJsxEditor({
  courseId,
  moduleId,
  readOnly,
}: CreateJsxComponentDescriptorsOptions) {
  return function ImageAssetJsxEditor({ mdastNode }: JsxEditorProps) {
    const url = getJsxStringProp(mdastNode, 'url');
    const alt = getJsxStringProp(mdastNode, 'alt');
    const title = getJsxStringProp(mdastNode, 'title');
    const fileId = getJsxStringProp(mdastNode, 'id');
    const removeNode = useLexicalNodeRemove();

    const { deleteFile, isDeleting } = useDeleteFile();

    const disableRemove = Boolean(readOnly) || isDeleting;

    return (
      <div className={blockShellClass(readOnly)}>
        <div className={blockHeaderClass(readOnly)}>
          <div className="flex w-full justify-end items-center gap-2">
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => {
                if (!url) return;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              disabled={!url}
            >
              Open
            </Button>

            {!readOnly && (
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                onClick={async () => {
                  if (disableRemove) return;

                  if (courseId && moduleId && fileId) {
                    try {
                      await deleteFile({ courseId, moduleId, fileId });
                    } catch (err) {
                      console.error('Failed to delete image asset', err);
                    }
                  }

                  removeNode();
                }}
                aria-label="Remove image asset"
                title="Remove"
                disabled={disableRemove}
              >
                {isDeleting ? <RiLoader4Fill className="animate-spin" /> : <BiTrash />}
              </Button>
            )}
          </div>
        </div>

        {url ? (
          <div
            className={cn(
              !readOnly && 'overflow-hidden rounded-2xl border border-border bg-background'
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={alt ?? ''}
              loading="lazy"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">Image URL missing</div>
        )}
      </div>
    );
  };
}

function createYouTubeJsxEditor({ readOnly }: CreateJsxComponentDescriptorsOptions) {
  return function YouTubeJsxEditor({ mdastNode }: JsxEditorProps) {
    const url = getJsxStringProp(mdastNode, 'url');
    const title = getJsxStringProp(mdastNode, 'title');
    const removeNode = useLexicalNodeRemove();

    return (
      <div className={cn(blockShellClass(readOnly), 'my-2')}>
        <div className={blockHeaderClass(readOnly)}>
          <div className="min-w-0">
            {!readOnly && <div className="truncate text-sm font-medium">{title ?? 'YouTube'}</div>}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => {
                if (!url) return;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              disabled={!url}
            >
              Open
            </Button>
            {!readOnly && (
              <Button
                type="button"
                onClick={() => removeNode()}
                variant="destructive"
                size="icon-sm"
                aria-label="Remove YouTube embed"
                title="Remove"
              >
                <BiTrash />
              </Button>
            )}
          </div>
        </div>

        {url ? (
          <YouTubeEmbed url={url} title={title} />
        ) : (
          <div className="text-sm text-muted-foreground">YouTube URL missing</div>
        )}
      </div>
    );
  };
}

function createJsxComponentDescriptors(options: CreateJsxComponentDescriptorsOptions) {
  const descriptors: JsxComponentDescriptor[] = [
    {
      name: 'video',
      kind: 'flow' as const,
      props: [
        { name: 'src', type: 'string' as const, required: true },
        { name: 'controls', type: 'expression' as const },
        { name: 'width', type: 'number' as const },
      ],
      hasChildren: false,
      Editor: GenericJsxEditor,
    },
    {
      name: 'FileAsset',
      kind: 'flow' as const,
      source: '@/components/mdx/FileAsset',
      defaultExport: true,
      props: [
        { name: 'id', type: 'string' as const, required: true },
        { name: 'url', type: 'string' as const, required: true },
        { name: 'name', type: 'string' as const, required: true },
        { name: 'size', type: 'number' as const },
      ],
      hasChildren: false,
      Editor: createFileAssetJsxEditor(options),
    },
    {
      name: 'VideoAsset',
      kind: 'flow' as const,
      source: '@/components/mdx/VideoAsset',
      defaultExport: true,
      props: [
        { name: 'id', type: 'string' as const, required: true },
        { name: 'url', type: 'string' as const, required: true },
        { name: 'poster', type: 'string' as const },
        { name: 'title', type: 'string' as const },
      ],
      hasChildren: false,
      Editor: createVideoAssetJsxEditor(options),
    },
    {
      name: 'ImageAsset',
      kind: 'flow' as const,
      source: '@/components/mdx/ImageAsset',
      defaultExport: true,
      props: [
        { name: 'id', type: 'string' as const, required: true },
        { name: 'url', type: 'string' as const, required: true },
        { name: 'alt', type: 'string' as const },
        { name: 'title', type: 'string' as const },
      ],
      hasChildren: false,
      Editor: createImageAssetJsxEditor(options),
    },
    {
      name: 'YouTube',
      kind: 'flow' as const,
      source: '@/components/mdx/YouTube',
      defaultExport: true,
      props: [
        { name: 'url', type: 'string' as const, required: true },
        { name: 'title', type: 'string' as const },
      ],
      hasChildren: false,
      Editor: createYouTubeJsxEditor(options),
    },
  ];

  return descriptors;
}

export { createJsxComponentDescriptors };
