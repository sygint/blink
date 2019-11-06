interface Bookmark {
  id: string;
}

type BookmarkIds = Array<string>;

export default ({ putFile, getFile }: any): object => {
  async function saveBookmarkIds(ids: BookmarkIds): Promise<void> {
    await putFile("blink/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveArchivedBookmarkIds(ids: BookmarkIds): Promise<void> {
    await putFile("blink/archive/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveBookmark(bookmark: Bookmark): Promise<void> {
    await putFile(
      `blink/bookmarks/${bookmark.id}.json`,
      JSON.stringify(bookmark)
    );
  }

  async function saveArticle(article: Bookmark): Promise<void> {
    await putFile(`blink/articles/${article.id}.json`, JSON.stringify(article));
  }

  async function getBookmarkIds(
    isArchived?: boolean
  ): Promise<BookmarkIds | undefined> {
    try {
      const json = await getFile(
        `blink/${isArchived && "archive/"}bookmarkIds.json`
      );

      if (!json || typeof json !== "string") {
        throw Error("Type Mismatch");
      }

      return JSON.parse(json);
    } catch (e) {
      // TODO: Add error handling
      console.log(e);
      return undefined;
    }
  }

  async function getArchivedBookmarkIds(): Promise<BookmarkIds | undefined> {
    return getBookmarkIds(true);
  }

  async function getBookmark(
    id: string,
    isArticle?: boolean
  ): Promise<Bookmark | undefined> {
    try {
      const json = await getFile(`blink/${isArticle && "acticle/"}${id}.json`);

      if (!json || typeof json !== "string") {
        throw Error("Type Mismatch");
      }

      return JSON.parse(json);
    } catch (e) {
      // TODO: Add error handling
      console.log(e);
      return undefined;
    }
  }

  async function getArticle(id: string): Promise<object | undefined> {
    return getBookmark(id, true);
  }

  async function getBookmarks(isArchive?: boolean): Promise<object> {
    const ids = await getBookmarkIds();

    if (!ids || (Array.isArray(ids) && ids.length === 0)) {
      return { bookmarkIds: [], bookmarks: [] };
    }

    const bookmarkPromises = ids.map(id => getBookmark(id, isArchive));

    const bookmarks = await Promise.all(bookmarkPromises);

    return isArchive
      ? { bookmarkIds: ids, bookmarks }
      : { archivedBookmarkIds: ids, archivedBookmarks: bookmarks };
  }

  async function getArchivedBookmarks(): Promise<object> {
    return getBookmarks(true);
  }

  return {
    saveBookmarkIds,
    saveArchivedBookmarkIds,
    saveBookmark,
    saveArticle,
    getBookmarkIds,
    getArchivedBookmarkIds,
    getBookmark,
    getArticle,
    getBookmarks,
    getArchivedBookmarks
  };
};
