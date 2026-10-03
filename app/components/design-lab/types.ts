export type PrototypeId = 'coffee-colors' | 'travely' | 'real-estate' | 'course-f'

export interface DesignToken {
  name: string
  value: string
  type: 'color' | 'typography' | 'radius' | 'shadow'
}

export interface PrototypeMeta {
  id: PrototypeId
  title: string
  subtitle: string
  category: string
  year: string
  figmaUrl: string
  description: string
  highlights: string[]
  tokens: DesignToken[]
}
