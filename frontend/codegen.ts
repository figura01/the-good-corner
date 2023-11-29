import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ['src/requestes/queries/*.queries.ts', 'src/requestes/mutations/*.mutations.ts'],
  generates: {
    "./src/types/graphql.ts": {
      config: {
        useIndexSignature: true,
        // maybeValue: "T | undefined",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};
export default config;