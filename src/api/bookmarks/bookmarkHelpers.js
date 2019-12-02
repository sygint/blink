export default ({ putFile, getFile }) => {
  async function saveBookmarkIds(ids) {
    await putFile("blink/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveArchivedBookmarkIds(ids) {
    await putFile("blink/archive/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveBookmark(bookmark) {
    await putFile(
      `blink/bookmarks/${bookmark.id}.json`,
      JSON.stringify(bookmark)
    );
  }

  async function saveArticle(article) {
    await putFile(`blink/articles/${article.id}.json`, JSON.stringify(article));
  }

  async function getBookmarkIds() {
    const bookmarkIdsJson = await getFile(`blink/bookmarkIds.json`);

    if (!bookmarkIdsJson) {
      return [];
    }

    return JSON.parse(bookmarkIdsJson);
  }

  async function getArchivedBookmarkIds() {
    const archivedBookmarkIdsJson = await getFile(
      `blink/archive/bookmarkIds.json`
    );

    if (!archivedBookmarkIdsJson) {
      return [];
    }

    return JSON.parse(archivedBookmarkIdsJson);
  }

  async function getBookmark(id) {
    const bookmarkJson = await getFile(`blink/bookmarks/${id}.json`);

    if (!bookmarkJson) {
      return null;
    }

    return JSON.parse(bookmarkJson);
  }

  async function getArticle(id) {
    const articleJson = await getFile(`blink/articles/${id}.json`);

    if (!articleJson) {
      return null;
    }

    return JSON.parse(articleJson);
  }

  async function getBookmarks() {
    const bookmarkIds = await getBookmarkIds();

    if (!bookmarkIds || bookmarkIds.length === 0) {
      return { bookmarkIds: [], bookmarks: [] };
    }

    const bookmarkPromises = bookmarkIds.map(bookmarkId =>
      getBookmark(bookmarkId)
    );

    const bookmarks = await Promise.all(bookmarkPromises);

    return { bookmarkIds, bookmarks };
  }

  async function getArchivedBookmarks() {
    const archivedBookmarkIds = await getArchivedBookmarkIds();

    if (!archivedBookmarkIds || archivedBookmarkIds.length === 0) {
      return { archivedBookmarkIds: [], archivedBookmarks: [] };
    }

    const archivedBookmarkPromises = archivedBookmarkIds.map(
      archivedBookmarkId => getBookmark(archivedBookmarkId)
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
