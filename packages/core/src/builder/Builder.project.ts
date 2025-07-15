import type { AnyTypes } from './_types'
import type { Builder } from './Builder'

export interface ProjectBuilder<T extends AnyTypes> extends Builder<T> {
}

export function project<
  A extends AnyTypes,
>(): (input: Builder<A>) => Builder<A>

export function project<
  A extends AnyTypes,
  B extends AnyTypes,
>(
  op1: (input: ProjectBuilder<A>) => ProjectBuilder<B>,
): (input: Builder<A>) => Builder<B>

export function project<
  A extends AnyTypes,
  B extends AnyTypes,
  C extends AnyTypes,
>(
  op1: (input: ProjectBuilder<A>) => ProjectBuilder<B>,
  op2: (input: ProjectBuilder<B>) => ProjectBuilder<C>,
): (input: Builder<A>) => Builder<C>
export function project(...ops: any[]) {
  return (input: Builder<any>) => {
    let builder = input
    for (const op of ops) {
      builder = op(builder)
    }
    return builder
  }
}

export type StringPropertyHelper<T extends AnyTypes> = <
  T extends AnyTypes,
>(
  value: string,
) => (builder: ProjectBuilder<T>) => ProjectBuilder<T>

export type ProjectHelpers<T extends AnyTypes> = {
  project: typeof project
  id: StringPropertyHelper<T>
  name: StringPropertyHelper<T>
  title: StringPropertyHelper<T>
}

export type ProjectBuilderFunction<A extends AnyTypes, B extends AnyTypes> = (
  helpers: ProjectHelpers<A> & {
    _: ProjectHelpers<A>['project']
  },
) =>
  | ((builder: ProjectBuilder<A>) => ProjectBuilder<B>)
  | ((builder: Builder<A>) => Builder<B>)
