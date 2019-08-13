export default api => {
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
    getBookmarkIds,
    getBookmark,
    getBookmarks
  };
};
