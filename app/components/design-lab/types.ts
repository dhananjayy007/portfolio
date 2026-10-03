export type PrototypeId = 'coffee-colors' | 'travely' | 'real-estate' | 'course-f'

export interface PrototypeMeta {
  id: PrototypeId
  title: string
  subtitle: string
  category: string
  year: string
  description: string
  highlights: string[]
}
