// web/npm/hono-form/src/form/localNow.directive.ts

export default (el: HTMLInputElement) => {
  const d = new Date()
  el.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const pad = (n: number) => String(n).padStart(2, '0')
