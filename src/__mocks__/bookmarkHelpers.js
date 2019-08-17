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

   function getBookmark(id) {
    const bookmarkJson =  localStorage.getItem(`blink/bookmarks/${id}.json`);

    if (!bookmarkJson) {
      return null;
    }

    return JSON.parse(bookmarkJson);
  }

   function getArticle(id) {
    const articleJson =  localStorage.getItem(`blink/articles/${id}.json`);

    if (!articleJson) {
      return null;
    }

    return JSON.parse(articleJson);
  }

   function getBookmarks() {
    const bookmarkIds =  getBookmarkIds();

    if (!bookmarkIds || bookmarkIds.length === 0) {
      return { bookmarkIds: [], bookmarks: [] };
    }

    const bookmarks = bookmarkIds.map(bookmarkId =>
      getBookmark(bookmarkId)
    );

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
