#!/bin/bash

# Update imports
find frontend/src -type f -name "*.tsx" -exec sed -i '' 's/import styled from '\''styled-components'\'';/import styled from '\''styled-components'\''\;\nimport \{ PageTitle \} from '\''\.\.\/styles\/shared'\'';/g' {} +

# Replace Title styled component declarations
find frontend/src -type f -name "*.tsx" -exec sed -i '' '/const Title = styled.h1`/,/`;/d' {} +

# Replace Title usage with PageTitle
find frontend/src -type f -name "*.tsx" -exec sed -i '' 's/<Title>/<PageTitle>/g' {} +
find frontend/src -type f -name "*.tsx" -exec sed -i '' 's/<\/Title>/<\/PageTitle>/g' {} + 