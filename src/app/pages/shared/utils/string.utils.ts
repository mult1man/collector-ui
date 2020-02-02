export class StringUtils {

  static hasText(value: string): boolean {
    return value !== null && value !== undefined && value.trim() !== '';
  }

  static equals(value: string, value2: string): boolean {
    const v1 = StringUtils.clean(value);
    const v2 = StringUtils.clean(value2);
    return v1 === v2;
  }

  static equalsIgnoreCase(value: string, value2: string): boolean {
    const v1 = StringUtils.clean(value);
    const v2 = StringUtils.clean(value2);
    return v1.toLowerCase() === v2.toLowerCase();
  }

  // Clean the value by trimming and returning blank if null or undefined.
  static clean(value: string) {
    if (value) {
      return value.trim();
    } else {
      return '';
    }
  }

  static isString(arg: any): boolean {
    return typeof arg === 'string' || arg instanceof String;
  }

  static nullSafeCompare(a: string, b: string): number {
    return StringUtils.clean(a).localeCompare(StringUtils.clean(b));
  }

}
