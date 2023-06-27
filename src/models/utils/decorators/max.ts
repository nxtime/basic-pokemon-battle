function MaxValue(maxValue: number) {
  return function (target: any, propertyKey: any) {
    const instanceKey = `_${propertyKey}`;

    const getter = function (this: any) {
      return this[instanceKey];
    };

    const setter = function (this: any, newVal: any) {
      if (typeof newVal === 'number' && newVal > maxValue) {
        this["errors"] += `${propertyKey} must be less than or equal to ${maxValue},\n`;
        return;
      }

      Object.defineProperty(this, instanceKey, {
        value: newVal,
        writable: true,
        enumerable: true,
        configurable: true
      });
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

export {
  MaxValue
}