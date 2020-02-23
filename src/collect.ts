import { Fixture } from "./fixture";

/**
 * Collects fixtures from an array type.
 *
 * @param value Array.
 */
function collectArray(value: any[]) {
  return value.reduce<Fixture[]>(
    (fixtures, element) => [...fixtures, ...collect(element)],
    []
  );
}

/**
 * Collects fixtures from an object type.
 *
 * @param value Object.
 */
function collectObject(value: any) {
  if (typeof value.__persisted === "boolean") {
    return [value];
  } else {
    return Object.values(value).reduce<Fixture[]>(
      (fixtures, element) => [...fixtures, ...collect(element)],
      []
    );
  }
}

/**
 * Collects fixtures from an arbitrary object or array structure.
 * Any value inside that structure has to be either an array of fixtures or an object which
 * values lead to a fixture.
 *
 * @param value Object or Array to collect from.
 */
export function collect(value: any): Fixture[] {
  if (value && Array.isArray(value)) {
    return collectArray(value);
  }

  if (typeof value === "object") {
    return collectObject(value);
  }

  throw new Error(`Invalid fixture definition.`);
}
