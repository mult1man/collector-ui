export class StringifyUtils {

  /**
   * Correctly replaces ES6 Set and Map
   */
  static ES6AwareReplacer(key, value) {
    if (typeof value === 'object') {
      if (value instanceof Set) {
        return {_Set: Array.from(value.values())};
      } else if (value instanceof Map) {
        return {_Map: Array.from(value.entries())};
      }
    }
    return value;
  }

  /**
   * Correctly revives ES6 Set and Map
   */
  static ES6AwareReviver(key, value) {
    if (value) {
      if (value._Map) {
        return new Map(value._Map);
      } else if (value._Set) {
        return new Set(value._Set);
      }
    }
    return value;
  }
}
