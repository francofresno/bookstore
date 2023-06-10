export const BOOKS_URL = "https://openlibrary.org";
export const COVERS_URL = "https://covers.openlibrary.org/b/id";
export const NO_COVER_URL = "https://fakeimg.pl/130x200?text=No+Cover";

export const BOOKS_DATA_MAPPER = {
  shouldReturn: (data) => !data?.docs.length,
  mapValue: (data) => data.docs,
};
export const GENERAL_DATA_MAPPER = {
  shouldReturn: (data) => !data,
  mapValue: (data) => data,
};
