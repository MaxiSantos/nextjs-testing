import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `Unica One, sans-serif` },
        body: { value: `Unica One, sans-serif` },      
        mono: { value: "Menlo, monospace"}
      },
    },
  },
})
