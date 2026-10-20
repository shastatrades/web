// web/src/lib/Loading.tsx

import type { FC } from 'hono/jsx'

export default (() => {
  return <img src="/img/loading.svg" class="loading" alt="Loading..." />
}) satisfies FC
