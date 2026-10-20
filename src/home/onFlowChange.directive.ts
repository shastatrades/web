// web/src/home/onFlowChange.directive.ts

import { query } from '@hono-dom'
import { enumFlowSteps } from '@src/enums/flowSteps.enum'
import { datasetFlowStepButton, datasetFlowStepContainer } from '@src/lib/dom'


export default (el: HTMLDivElement) => {
  const datasetButton = datasetFlowStepButton()
  const datasetContainer = datasetFlowStepContainer()

  const domSteps = new Map<string, HTMLDivElement | null>()
  const domButtons = new Map<string, HTMLButtonElement | null>()

  for (const step of enumFlowSteps.array) {
    domSteps.set(step.id, query<HTMLDivElement>(datasetContainer.query(step.id)).root(el).one())
    domButtons.set(step.id, query<HTMLButtonElement>(datasetButton.query(step.id)).root(el).one())
  }

  for (const step of enumFlowSteps.array) {
    domButtons.get(step.id)?.addEventListener('click', () => {
      onFlowChange(step.id)
    })
  }

  function onFlowChange(id: string) {
    for (const s of enumFlowSteps.array) {
      const step = domSteps.get(s.id)
      const button = domButtons.get(s.id)

      step?.style.setProperty('--steps', String(s.steps.length)) // set steps count
      step?.classList.toggle('hidden', s.id !== id) // set steps hidden class
      button?.classList.toggle('orange', s.id === id) // set button active class
      button?.classList.toggle('transparent', s.id !== id) // set button transparent class
    }
  }

  onFlowChange(enumFlowSteps.obj.community.id)
}
