function Column(options: {
  type: "number" | "string" | "boolean" | Array<any>;
  required?: boolean,
  default?: any,
  condition?: (_val: number, _conditionalVal: number) => boolean
}) {
  return function (target: any, propertyKey: any) {
    const instanceKey = `_${propertyKey}`;
    let value: any;

    if (options?.default !== undefined) { // Verify if there's a default value and if the new value is empty
      value = options?.default;
    }

    function setter(this: any, newVal: unknown) {
      let errorMessages = "";

      if (!options.required) return;

      if (options?.required && !newVal) { // Verify if the new value is empty and if it's required
        errorMessages += `${propertyKey}(${options.type}) is required,\n`;

      } else if (typeof newVal !== options.type) { // Verify if the new value is the same type as the one specified

        if (typeof options.type === "object") { // Verify if it's an object or an Array
          if (!options.type.includes(newVal))
            errorMessages += `${propertyKey} must be one of the following: ${options.type.join(", ")},\n`;
        } else { // if it's not an array or object, just return the corresponding options type
          errorMessages += `${propertyKey} must be a ${options.type},\n`;
        }

      }

      if (errorMessages !== "") {
        this["errors"] += errorMessages;
        return;
      }

      // If everything is ok, set the new value
      this[instanceKey] = newVal;
    };

    const getter = function (this: any) {
      return this[instanceKey] ?? value
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      configurable: true
    });
  };
}

function Id() {
  return function (target: any, propertyKey: any, descriptor?: TypedPropertyDescriptor<number>) {
    let value: any;

    const setter = () => {
      value = Math.ceil(Math.random() * 999999999);
    };

    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: setter
    });
  };
}

export {
  Column,
  Id
}