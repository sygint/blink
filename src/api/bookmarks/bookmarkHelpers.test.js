import bookmarkHelpers from "./bookmarkHelpers";

const mockBookmarkIds = ["mock1", "mock2", "mock3"];
const mockBookmark = {
  url: "http://example.com",
  excerpt: "Example excerpt",
  title: "mock title",
  thumbnail: "mock thumbnail",
  wordCount: 25,
  id: "1234567890"
};
const mockBookmark1 = mockBookmark;
const mockBookmark2 = {
  url: "http://example.net",
  excerpt: "Example excerpt 2",
  title: "mock title 2",
  thumbnail: "mock thumbnail 2",
  wordCount: 30,
  id: "mock2"
};
const mockBookmark3 = {
  url: "http://example.org",
  excerpt: "Example excerpt 3",
  title: "mock title 3",
  thumbnail: "mock thumbnail 3",
  wordCount: 35,
  id: "mock3"
};
const mockArticle = {
  author: "Mock Author",
  content: "mock content",
  date_published: "mock date",
  dek: false,
  direction: "ltr",
  domain: "example.com",
  id: "1234567890"
};
const mockBookmarks = [mockBookmark1, mockBookmark2, mockBookmark3];
const mockBookmarkData = {
  bookmarkIds: mockBookmarkIds,
  bookmarks: mockBookmarks
};
const mockData = {
  "blink/bookmarkIds.json": mockBookmarkIds,
  "blink/bookmarks/mock.json": mockBookmark,
  "blink/bookmarks/mock1.json": mockBookmark1,
  "blink/bookmarks/mock2.json": mockBookmark2,
  "blink/bookmarks/mock3.json": mockBookmark3,
  "blink/articles/mock.json": mockArticle
};

const mockBookmarkIdsJson = JSON.stringify(mockBookmarkIds);
const mockBookmarkJson = JSON.stringify(mockBookmark);
const mockArticleJson = JSON.stringify(mockArticle);

const mockPutFile = jest.fn();
const mockGetFile = jest.fn(file => {
  return JSON.stringify(mockData[file]);
});

const mockUserSession = {
  putFile: mockPutFile,
  getFile: mockGetFile
};

const bookmarkApi = bookmarkHelpers(mockUserSession);
const {
  getBookmarkIds,
  getBookmark,
  getArticle,
  getBookmarks
} = bookmarkApi;

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
      expect(await getBookmarkIds()).toEqual(mockBookmarkIds);
    });
  });

  describe("getBookmark()", () => {
    it("should get bookmark", async () => {
      expect(await getBookmark("mock")).toEqual(mockBookmark);
    });
  });

  describe("getArticle()", () => {
    it("should get article", async () => {
      expect(await getArticle("mock")).toEqual(mockArticle);
    });
  });

  describe("getBookmarks()", () => {
    it("should get a list of bookmarks", async () => {
      expect(await getBookmarks()).toEqual(mockBookmarkData);
    });
  });
});
