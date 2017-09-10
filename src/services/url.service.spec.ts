import { UrlService } from './url.service';

describe('URL Service', () => {

    it('should build path correctly', () => {
      const url: UrlService = new UrlService();
      expect(url.build(['a'])).toEqual(url.baseUrl + 'a');
      expect(url.build(['a', 'b'])).toEqual(url.baseUrl + 'a/b');
      expect(url.build(['a', 'b', 'c'])).toEqual(url.baseUrl + 'a/b/c');
      expect(url.build(['aa', 'bb'])).toEqual(url.baseUrl + 'aa/bb');
      expect(url.build([])).toEqual(url.baseUrl);
    });

    it('should add query params correctly', () => {
      const url: UrlService = new UrlService();
      expect(url.build(['a'], { page: 1 })).toEqual(url.baseUrl + 'a?page=1');
      expect(url.build(['a', 'b'], {})).toEqual(url.baseUrl + 'a/b?');
      expect(url.build(['a', 'b', 'c'], { page: 2, limit: 3 })).toEqual(url.baseUrl + 'a/b/c?page=2&limit=3');
      expect(url.build(['aa', 'bb'], { a: 1, b: 2, c: 'string', d: 'another-string' }))
      .toEqual(url.baseUrl + 'aa/bb?a=1&b=2&c=string&d=another-string');
      expect(url.build([], {})).toEqual(url.baseUrl + '?');
    });
});
