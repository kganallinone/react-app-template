export function isPathName(paths: string[], callback: () => void) {
  if (paths.includes(location.pathname)) {
    callback(); // Execute the callback if any path matches
  }
}

export function isHref(href: string) {
  return location.href === `${href}`;
}
