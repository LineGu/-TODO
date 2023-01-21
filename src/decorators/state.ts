export function State(target: any, propertyKey: string) {
  let value: unknown;

  const getter = function () {
    return value;
  };

  const setter = function (this: { get: () => unknown; set: (newValue: unknown) => void }, newValue: any) {
    if (value !== newValue) {
      value = newValue;
      target.render.call(this);
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}
