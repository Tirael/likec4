import { Box } from '@mantine/core'
import { type NodeProps, Handle, Position, useStore } from '@xyflow/react'
import clsx from 'clsx'
import { deepEqual, shallowEqual } from 'fast-equals'
import { m } from 'framer-motion'
import { memo, useCallback } from 'react'
import { Text } from '../../../controls/Text'
import { useDiagramState } from '../../../hooks'
import { ElementIcon } from '../../../xyflow/nodes/shared/ElementIcon'
import type { RelationshipsOfFlowTypes } from '../_types'
import * as css from './styles.css'

type CompoundNodeProps = NodeProps<RelationshipsOfFlowTypes.CompoundNode>

export const CompoundNode = memo<CompoundNodeProps>(({
  id,
  data: {
    element,
    ports,
    layoutId = id,
    leaving = false,
    entering = true,
    ...data
  },
  width = 200,
  height = 100,
  ...props
}) => {
  const scale = (diff: number) => ({
    scaleX: (width + diff) / width,
    scaleY: (height + diff) / height,
  })

  let opacity = 1
  if (data.dimmed) {
    opacity = data.dimmed === 'immediate' ? 0.05 : 0.15
  }
  if (leaving) {
    opacity = 0
  }

  const {
    elementsSelectable,
  } = useStore(
    useCallback((s) => ({
      elementsSelectable: s.elementsSelectable,
    }), []),
    shallowEqual,
  )
  const { currentViewId, renderIcon } = useDiagramState(s => ({
    currentViewId: s.view.id,
    renderIcon: s.renderIcon,
  }))

  const selectable = props.selectable ?? elementsSelectable
  const elementIcon = ElementIcon({
    element: { id, ...element },
    viewId: currentViewId,
    className: css.elementIcon,
    renderIcon: renderIcon,
  })

  return (
    <>
      <m.div
        className={clsx([
          css.compoundNodeBody,
          'likec4-compound-node',
        ])}
        layoutId={layoutId}
        data-compound-depth={data.depth ?? 1}
        data-likec4-color={element.color}
        initial={(layoutId === id && entering)
          ? {
            ...scale(-20),
            opacity: 0,
            width,
            height,
          }
          : false}
        animate={{
          ...scale(0),
          opacity,
          width,
          height,
          transition: {
            opacity: {
              delay: !leaving && data.dimmed === true ? .4 : 0,
              ...((leaving || data.dimmed === 'immediate') && {
                duration: 0.09,
              }),
            },
          },
        }}
        {...(selectable && {
          whileHover: {
            ...scale(12),
            transition: {
              delay: 0.1,
            },
          },
          whileTap: {
            ...scale(-8),
          },
        })}
      >
        <Box className={css.compoundNodeTitle}>
          {elementIcon}
          <Text className={css.compoundNodeTitleText} maw={width - 20}>
            {element.title}
          </Text>
        </Box>
      </m.div>
      {ports.in.map((id, i) => (
        <Handle
          key={id}
          id={id}
          type="target"
          position={Position.Left}
          style={{
            visibility: 'hidden',
            top: `${20 * (i + 1)}px`,
          }} />
      ))}
      {ports.out.map((id, i) => (
        <Handle
          key={id}
          id={id}
          type="source"
          position={Position.Right}
          style={{
            visibility: 'hidden',
            top: `${20 * (i + 1)}px`,
          }} />
      ))}
    </>
  )
}, (prev, next) => {
  return deepEqual(prev.data, next.data)
})
