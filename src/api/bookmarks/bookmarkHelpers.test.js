import bookmarkHelpers from "./bookmarkHelpers";

const mockBookmarkIds = ["mock1", "mock2", "mock3"];
const mockData = {
  "blink/bookmarkIds.json": mockBookmarkIds
};

const mockBookmarkIdsJson = JSON.stringify(mockBookmarkIds);
const mockBookmark = {
  url: "http://example.com",
  excerpt: "Example excerpt",
  title: "mock title",
  thumbnail: "mock thumbnail",
  wordCount: 25,
  id: "1234567890"
};
const mockBookmarkJson = JSON.stringify(mockBookmark);
const mockArticle = {
  author: "Mock Author",
  content: "mock content",
  date_published: "mock date",
  dek: false,
  direction: "ltr",
  domain: "example.com",
  id: "1234567890"
};
const mockArticleJson = JSON.stringify(mockArticle);
const mockBookmarks = [
  {
    url: "http://example.com",
    excerpt: "Example excerpt 1",
    title: "mock title 1",
    thumbnail: "mock thumbnail 1",
    wordCount: 25,
    id: "mock1"
  },
  {
    url: "http://example.net",
    excerpt: "Example excerpt 2",
    title: "mock title 2",
    thumbnail: "mock thumbnail 2",
    wordCount: 30,
    id: "mock2"
  },
  {
    url: "http://example.org",
    excerpt: "Example excerpt 3",
    title: "mock title 3",
    thumbnail: "mock thumbnail 3",
    wordCount: 35,
    id: "mock3"
  }
];

const mockPutFile = jest.fn();
const mockGetFile = jest.fn(file => {
  switch (file) {
    case "blink/bookmarks/mock.json":
      return mockBookmarkJson;

    case "blink/articles/mock.json":
      return mockArticleJson;

    case "blink/bookmarks/mock1.json":
      return JSON.stringify(mockBookmarks[0]);

    case "blink/bookmarks/mock2.json":
      return JSON.stringify(mockBookmarks[1]);

    case "blink/bookmarks/mock3.json":
      return JSON.stringify(mockBookmarks[2]);

    default:
      return JSON.stringify(mockData[file]);
  }
});

const mockUserSession = {
  putFile: mockPutFile,
  getFile: mockGetFile
};

const bookmarkApi = bookmarkHelpers(mockUserSession);

describe("bookmarkHelpers", () => {
  beforeEach(() => {
    mockPutFile.mockClear();
    mockGetFile.mockClear();
  });

  describe("saveBookmarkIds()", () => {
    it("should save bookmark ids", async () => {
      await bookmarkApi.saveBookmarkIds(mockBookmarkIds);

      expect(mockPutFile.mock.calls.length).toBe(1);
      expect(mockPutFile).toBeCalledWith(
        "blink/bookmarkIds.json",
        mockBookmarkIdsJson
      );
    });
  });

  describe("saveBookmark()", () => {
    it("should save bookmark", async () => {
      await bookmarkApi.saveBookmark(mockBookmark);

      expect(mockPutFile.mock.calls.length).toBe(1);
      expect(mockPutFile).toBeCalledWith(
        `blink/bookmarks/${mockBookmark.id}.json`,
        mockBookmarkJson
      );
    });
  });

  describe("saveArticle()", () => {
    it("should save article", async () => {
      await bookmarkApi.saveArticle(mockArticle);

      expect(mockPutFile.mock.calls.length).toBe(1);
      expect(mockPutFile).toBeCalledWith(
        `blink/articles/${mockArticle.id}.json`,
        mockArticleJson
      );
    });
  });

  describe("getBookmarkIds()", () => {
    it("should get bookmark ids", async () => {
      const result = await bookmarkApi.getBookmarkIds();

      expect(mockGetFile.mock.calls.length).toBe(1);
      expect(mockGetFile).toBeCalledWith("blink/bookmarkIds.json");
      expect(result).toEqual(mockBookmarkIds);
    });
  });

  describe("getBookmark()", () => {
    it("should get bookmark", async () => {
      const result = await bookmarkApi.getBookmark("mock");

      expect(mockGetFile.mock.calls.length).toBe(1);
      expect(mockGetFile).toBeCalledWith("blink/bookmarks/mock.json");
      expect(result).toEqual(mockBookmark);
    });
  });

  describe("getArticle()", () => {
    it("should get article", async () => {
      const result = await bookmarkApi.getArticle("mock");

      expect(mockGetFile.mock.calls.length).toBe(1);
      expect(mockGetFile).toBeCalledWith("blink/articles/mock.json");
      expect(result).toEqual(mockArticle);
    });
  });

  describe("getBookmarks()", () => {
    it("should get a list of bookmarks", async () => {
      mockGetFile.mockReturnValueOnce(mockBookmarkIdsJson);
      const result = await bookmarkApi.getBookmarks();

      expect(result).toEqual({
        bookmarkIds: mockBookmarkIds,
        bookmarks: mockBookmarks
      });
    });
  });
});
