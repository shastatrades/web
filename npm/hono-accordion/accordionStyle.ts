// web/npm/hono-accordion/accordionStyle.ts

import { css } from 'hono/css'


export const accordionStyle = css`
  .accordion-item {
    margin-bottom: var(--space-lite);
    &.open {
      .accordion-chevron {
        transform: rotate(90deg);
      }
    }

    .accordion-header {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem 0;
      user-select: none;
      transition: var(--fast-transition);
      background-color: rgba(0, 0, 0, 0.015);
      border-radius: var(--radius);
      &:hover {
        box-shadow: 0px 10px 9px 1px rgba(0 ,0, 0, 0.33);
        transform: translateY(-0.2rem);
      }
      &:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0px 9px 3px 0 rgba(0 ,0, 0, 0.33);
      }
    }

    .accordion-chevron {
      flex-shrink: 0;
      width: 2.4rem;
      height: 2.4rem;
      margin-right: calc(var(--space-lite) / 2);
      transition: var(--transition);
    }

    .accordion-title {
      flex: 1; 

      /* reset heading margins inside the title */
      h1,
      h2,
      h3 {
        margin: 0;
        font-size: 2.4rem; /* optionally keep heading hierarchy */

        svg {
          width: 2.4rem;
          height: 2.4rem;
        }
      }
    }

    .accordion-body {
      overflow: hidden;
      transition: var(--transition);
      height: 0; /* will be set by JavaScript */

      > *:first-child {
        margin-block: var(--space-lite);
      }

      > *:last-child {
        margin-bottom: 0;
      }
    }
  }
`
