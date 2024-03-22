// singleton object

class InMemoryCache {
    constructor(id) {
      this.cache = { id };
    }
  
    get(key) {
      return this.cache[key];
    }
  
    set(key, value) {
      this.cache[key] = value;
    }
  
    has(key) {
      return key in this.cache;
    }
  
    remove(key) {
      if (this.has(key)) delete this.cache[key];
    }
  
    clear() {
      this.cache = {};
    }
    static getInstance(id) {
        if (!InMemoryCache.instance) {
          InMemoryCache.instance = new InMemoryCache(id);
        }
        return InMemoryCache.instance;
      }
}
const cache = InMemoryCache.getInstance();

module.exports = {
  cache,
};