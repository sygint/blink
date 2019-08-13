export default api => {
  async function saveBookmarkIds(ids) {
    await api.putFile("blink/bookmarkIds.json", JSON.stringify(ids));
  }

  async function saveBookmark(bookmark) {
    await api.putFile(
      `blink/bookmarks/${bookmark.id}.json`,
      JSON.stringify(bookmark)
    );
  }

  async function saveArticle(article) {
    await api.putFile(
      `blink/articles/${article.id}.json`,
      JSON.stringify(article)
    );
  }

  async function getBookmarkIds() {
    const bookmarkIdsJson = await api.getFile(`blink/bookmarkIds.json`);

    if (!bookmarkIdsJson) {
      return [];
    }

    return JSON.parse(bookmarkIdsJson);
  }

  async function getBookmark(id) {
    const bookmarkJson = await api.getFile(`blink/bookmarks/${id}.json`);

    if (!bookmarkJson) {
      return null;
    }

    return JSON.parse(bookmarkJson);
  }

  async function getArticle(id) {
    const articleJson = await api.getFile(`blink/articles/${id}.json`);

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

  return {
    saveBookmarkIds,
    saveBookmark,
    saveArticle,
    getBookmarkIds,
    getBookmark,
    getArticle,
    getBookmarks
  };
};
