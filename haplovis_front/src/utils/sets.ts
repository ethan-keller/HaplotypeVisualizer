export function intersection<T>(set1?: Set<T>, set2?: Set<T>) {
  if (isSetUndefinedOrEmpty(set1)) {
    return set2;
  } else if (isSetUndefinedOrEmpty(set2)) {
    return set1;
  } else {
    return new Set(Array.from(set1!.values()).filter((x) => set2!.has(x)));
  }
}

export function union<T>(set1?: Set<T>, set2?: Set<T>) {
  if (isSetUndefinedOrEmpty(set1)) {
    return set2;
  } else if (isSetUndefinedOrEmpty(set2)) {
    return set1;
  } else {
    return new Set([...Array.from(set1!.values()), ...Array.from(set2!.values())]);
  }
}

export function isSetUndefinedOrEmpty<T>(set?: Set<T>) {
  return set === undefined || set.size === 0;
}
