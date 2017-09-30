export class Base {

  constructor(data?: object, from_back: boolean = false) {
    Object.keys(data).forEach(key => {
      if (from_back) {
        this[this._toCamel(key)] = data[key];
      } else if (this[key] !== undefined) {
        this[key] = data[key];
      }
    })
  }

  public for_sent(): Object {
    let object: Object;
    Object.keys(this).forEach(key => {
      object[this._toUnderscore(key)] = this[key]
    })
    return object;
  }

  protected _toUnderscore(text: string): string {
    return text.replace(/([A-Z])/g, function($1){return "_" + $1.toLowerCase();});
  }

  protected _toCamel(text: string): string {
    return text.replace(/(\_[a-z])/g, function($1){return $1.toUpperCase().replace('_','');});
  };

  public equals(copy): boolean {
    return JSON.stringify(this) === JSON.stringify(copy);
  }
}
