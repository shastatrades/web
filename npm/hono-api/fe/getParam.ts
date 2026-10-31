// web/npm/hono-api/fe/getParam.ts

/**
 * @param position A value of `1` (default) provides the last param w/in the url (e.g., for the url `/api/blog/how-to-win` we'd return `how-to-win`), a position of `2` provides the 2nd to last param w/in the url (e.g., for the url `/api/blog/seeing-beauty/9` we'd return `seeing-beauty`), etc., 🚨 IF the position number is too large for the current URL THEN we return undefined. IF the url has a position that is empty (e.g., `//` THEN this value is skipped and not accessible via any position value)
 * @returns url param on the `FE`
 */
export function getParam(position = 1): string | undefined {
  const segments = window.location.pathname.split('/').filter(Boolean)
  return segments.at(-position)
}
