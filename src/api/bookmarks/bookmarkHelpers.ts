interface API {
  putFile(path: string, json: string): Promise<void>;
  getFile(path: string): Promise<string>;
}

interface Bookmark {
  id: string;
  bookmarkId: string;
  index?: number;
  array?: [];
}

export default ({ putFile, getFile }: API): object => {
  async function saveBookmarkIds(ids: string[]): Promise<void> {
    await putFile("blink/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveArchivedBookmarkIds(ids: string[]): Promise<void> {
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

  async function getBookmarkIds(): Promise<object[]> {
    const bookmarkIdsJson = await getFile(`blink/bookmarkIds.json`);

    if (!bookmarkIdsJson) {
      return [];
    }

    return JSON.parse(bookmarkIdsJson);
  }

  async function getArchivedBookmarkIds(): Promise<[] | object[]> {
    const archivedBookmarkIdsJson = await getFile(
      `blink/archive/bookmarkIds.json`
    );

    if (!archivedBookmarkIdsJson) {
      return [];
    }

    return JSON.parse(archivedBookmarkIdsJson);
  }

  async function getBookmark(id: string): Promise<undefined | object> {
    const json = await getFile(`blink/bookmarks/${id}.json`);

    if (!json) {
      return undefined;
    }

    return JSON.parse(json) as Bookmark;
  }

  async function getArticle(id: string): Promise<null | object> {
    const articleJson = await getFile(`blink/articles/${id}.json`);

    if (!articleJson) {
      return null;
    }

    return JSON.parse(articleJson);
  }

  async function getBookmarks(): Promise<object> {
    const bookmarkIds = await getBookmarkIds();

    if (!bookmarkIds || bookmarkIds.length === 0) {
      return { bookmarkIds: [], bookmarks: [] };
    }

    const bookmarkPromises = bookmarkIds.map(getBookmark);

    const bookmarks = await Promise.all(bookmarkPromises);

    return { bookmarkIds, bookmarks };
  }

  async function getArchivedBookmarks(): Promise<object> {
    const archivedBookmarkIds = await getArchivedBookmarkIds();

    if (!archivedBookmarkIds || archivedBookmarkIds.length === 0) {
      return { archivedBookmarkIds: [], archivedBookmarks: [] };
    }

    const archivedBookmarkPromises = archivedBookmarkIds.map(
      (bookmarkId: string) => getBookmark(bookmarkId)
    );

    const archivedBookmarks = await Promise.all(archivedBookmarkPromises);

    return { archivedBookmarkIds, archivedBookmarks };
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
