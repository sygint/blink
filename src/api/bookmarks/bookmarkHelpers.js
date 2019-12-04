export default ({ putFile, getFile }) => {
  async function getData(filename, fallback = null) {
    const fileData = await getFile(`blink/${filename}.json`);

    if (!fileData) {
      return fallback;
    }

    return JSON.parse(fileData);
  }

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

  async function getBookmarkIds(isArchive) {
    const filename = isArchive ? "archivedBookmarkIds" : "bookmarkIds";
    return getData(filename, []);
  }

  async function getArchivedBookmarkIds() {
    return getBookmarkIds(true);
  }

  async function getBookmark(id) {
    return getData(`bookmarks/${id}`);
  }

  async function getArticle(id) {
    return getData(`articles/${id}`);
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
