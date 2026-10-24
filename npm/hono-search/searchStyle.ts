// web/npm/hono-search/searchStyle.ts

import { css } from 'hono/css'


export const searchStyle = css`
  .search-input {
    position: relative;

    input {
      width: 100%;
      display: block;
      border-radius: var(--radius);
      padding: var(--space-lite) var(--space-lite) var(--space-lite) 4.5rem;
      transition: var(--fast-transition);
      margin-bottom: var(--space-lite);
      color: #495057;
      border: 1px solid #ced3d6;
      &:focus {
        outline: 0;
        border-color: transparent;
        box-shadow: 0 0 0 0.3rem rgba(0, 123, 255, 0.25);
      }
    }

    span,
    button {
      position: absolute;
      top: 50%;
      height: 3.3rem;
      width: 3.3rem;
      margin-top: -1.65rem;
    }

    span {
      left: 0.9rem;
      color: #959595;
    }

    button {
      right: 0.9rem;
      padding: 0;
      border: none;
      filter: grayscale(1);
      cursor: pointer;
      background: transparent;
      transition: var(--transition);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        filter: grayscale(0);
        box-shadow: 0px 10px 9px 1px rgba(0 ,0, 0, 0.33);
        transform: translateY(-0.2rem);
      }
      &:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0px 9px 3px 0 rgba(0 ,0, 0, 0.33);
      }

      svg {
        width: 100%;
        height: 100%;
        color: #d80000;
        opacity: 0.6;
        height: 2.4rem;
        width: 2.4rem;
      }
    }
  }
`
