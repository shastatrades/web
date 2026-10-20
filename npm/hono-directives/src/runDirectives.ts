// web/npm/hono-directives/src/runDirectives.ts


/**
 * Run directives across the entire document on initial page load
 */
export function runDirectivesOnPageLoad() {
  const run = () => {
    const elements = document.querySelectorAll<Element>('[data-directive]')
    processElements(elements)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true })
  } else {
    run()
  }
}



/**
 * Run directives on demand for a dynamically added root elements children
 */
export async function runDirectivesOnDemand(root: Element) {
  const elements: Element[] = []

  // Find all descendant elements with the directive
  const descendants = root.querySelectorAll<Element>('[data-directive]')

  for (const el of descendants) {
    elements.push(el)
  }

  await processElements(elements)
}



type DirectiveFn = (element: Element, ...args: any[]) => void



const directiveModules = import.meta.glob<{ default: DirectiveFn }>(
  '../../../../**/*.directive.{ts,tsx}',
  { eager: false }
)



/* Cache the registry so we don't rebuild it on every onDemand call */
let registryCache: Record<string, () => Promise<{ default: DirectiveFn }>> | null = null



function getRegistry() {
  if (registryCache) return registryCache

  const registry: Record<string, () => Promise<{ default: DirectiveFn }>> = {}

  for (const path in directiveModules) {
    const fileName = path.split('/').pop() || ''
    const name = fileName.replace(/\.directive\.(ts|tsx)$/, '')

    if (name) {
      const mod = directiveModules[path]

      if (mod) {
        registry[name] = mod
      }
    }
  }

  registryCache = registry
  return registry
}



async function processElements(elements: Iterable<Element>) {
  const registry = getRegistry()

  for (const el of elements) {
    const raw = el.getAttribute('data-directive')
    if (!raw) continue

    let parsed: { name: string; args: any[] }

    try {
      parsed = JSON.parse(raw)
    } catch {
      console.warn(`Invalid JSON in data-directive: ${raw}`, el)
      continue
    }

    const { name, args = [] } = parsed
    const loader = registry[name]

    if (!loader) {
      console.warn(`Directive "${name}" not found for element`, el)
      continue
    }

    const mod = await loader()
    const directiveFn = mod.default

    if (typeof directiveFn === 'function') {
      directiveFn(el, ...args)
    }
  }
}
