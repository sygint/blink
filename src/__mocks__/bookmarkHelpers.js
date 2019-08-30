export default () => {
  function saveBookmarkIds(ids) {
    localStorage.setItem("blink/bookmarkIds.json", JSON.stringify(ids));
  }

  function saveBookmark(bookmark) {
    localStorage.setItem(
      `blink/bookmarks/${bookmark.id}.json`,
      JSON.stringify(bookmark)
    );
  }

  function saveArticle(article) {
    localStorage.setItem(
      `blink/articles/${article.id}.json`,
      JSON.stringify(article)
    );
  }

  function getBookmarkIds() {
    const bookmarkIdsJson = localStorage.getItem(`blink/bookmarkIds.json`);

    if (!bookmarkIdsJson) {
      return [];
    }

    return JSON.parse(bookmarkIdsJson);
  }

  function getArchivedBookmarkIds() {
    const archivedBookmarkIdsJson = localStorage.getItem(
      `blink/archive/bookmarkIds.json`
    );

    if (!archivedBookmarkIdsJson) {
      return [];
    }

    return JSON.parse(archivedBookmarkIdsJson);
  }

  function getBookmark(id) {
    const bookmarkJson = localStorage.getItem(`blink/bookmarks/${id}.json`);

    if (!bookmarkJson) {
      return null;
    }

    return JSON.parse(bookmarkJson);
  }

  function getArticle(id) {
    const articleJson = localStorage.getItem(`blink/articles/${id}.json`);

    if (!articleJson) {
      return null;
    }

    return JSON.parse(articleJson);
  }

  function getBookmarks() {
    const bookmarkIds = getBookmarkIds();

    if (!bookmarkIds || bookmarkIds.length === 0) {
      return { bookmarkIds: [], bookmarks: [] };
    }

    const bookmarks = bookmarkIds.map(bookmarkId => getBookmark(bookmarkId));

    return { bookmarkIds, bookmarks };
  }

  function getArchivedBookmarks() {
    const archivedBookmarkIds = getArchivedBookmarkIds();

    if (!archivedBookmarkIds || archivedBookmarkIds.length === 0) {
      return { archivedBookmarkIds: [], archivedBookmarks: [] };
    }

    const archivedBookmarks = archivedBookmarkIds.map(archivedBookmarkId =>
      getBookmark(archivedBookmarkId)
    );

    return { archivedBookmarkIds, archivedBookmarks };
  }

  return {
    saveBookmarkIds,
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
