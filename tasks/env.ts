export const development: () => void = nodeEnvSetter('development')
export const production: () => void = nodeEnvSetter('production')
export const test: () => void = nodeEnvSetter('production')

function nodeEnvSetter(value: string): () => void {
  return function () {
    process.env.NODE_ENV = value
  }
}