import type {
  Color,
  DeploymentFqn,
  DiagramNode,
  Fqn,
  IconUrl,
  RelationId,
  RelationshipLineType,
  RichTextOrEmpty,
  ViewId,
} from '@likec4/core/types'
import type { Simplify } from 'type-fest'
import type { Base, NonOptional, ReactFlowEdge, ReactFlowNode } from '../../base/types'

export namespace RelationshipDetailsTypes {
  export type Column = 'sources' | 'targets'
  /**
   * The node's incoming and outgoing ports
   */
  export type Ports = {
    in: string[]
    out: string[]
  }

  export type ElementNodeData =
    & Base.NodeData
    & NonOptional<
      Pick<
        DiagramNode,
        | 'title'
        | 'technology'
        | 'color'
        | 'shape'
        | 'width'
        | 'height'
        | 'navigateTo'
        | 'style'
        | 'tags'
      >
    >
    & {
      column: Column
      fqn: Fqn | DeploymentFqn
      icon: IconUrl
      ports: Ports
      description: RichTextOrEmpty
    }

  export type CompoundNodeData =
    & Base.NodeData
    & NonOptional<
      Pick<
        DiagramNode,
        | 'title'
        | 'color'
        | 'style'
      >
    >
    & {
      column: Column
      fqn: Fqn | DeploymentFqn
      depth: number
      icon?: IconUrl
      ports: Ports
    }

  export type ElementNode = ReactFlowNode<ElementNodeData, 'element'>

  export type CompoundNode = ReactFlowNode<CompoundNodeData, 'compound'>

  export type Node = ElementNode | CompoundNode
  export type NodeData = Node['data']

  // Extend the edge types provided by SharedFlowTypes with RelationshipsOfEdgeData

  export type EdgeData = Simplify<
    Base.EdgeData & {
      relationId: RelationId
      color: Color | undefined
      label: string | null
      technology?: string | undefined
      navigateTo: ViewId | null
      line: RelationshipLineType
      description: RichTextOrEmpty
    }
  >

  export type Edge = ReactFlowEdge<EdgeData, 'relationship'>
}
