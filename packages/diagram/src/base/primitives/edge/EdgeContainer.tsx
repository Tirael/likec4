import type { DiagramEdge } from '@likec4/core'
import clsx from 'clsx'
import { type PropsWithChildren } from 'react'
import type { UndefinedOnPartialDeep } from 'type-fest'
import type { EdgeProps } from '../../types'
import * as css from './edge.css'

type Data = UndefinedOnPartialDeep<
  Pick<
    DiagramEdge,
    | 'dir'
    | 'color'
  >
>

type EdgeContainerProps = PropsWithChildren<
  EdgeProps<Data> & {
    className?: string | undefined
  }
>

export function EdgeContainer({
  className,
  data: {
    hovered: isHovered = false,
    active: isActive = false,
    dimmed: isDimmed = false,
    ...data
  },
  children,
}: EdgeContainerProps) {
  return (
    <g
      className={clsx(
        css.edgeContainer,
        className,
      )}
      data-likec4-color={data.color ?? 'gray'}
      data-edge-dir={data.dir ?? 'forward'}
      data-edge-active={isActive}
      data-edge-animated={isActive}
      data-edge-hovered={isHovered}
      {...isDimmed !== false && {
        'data-edge-dimmed': isDimmed,
      }}>
      {children}
    </g>
  )
}
