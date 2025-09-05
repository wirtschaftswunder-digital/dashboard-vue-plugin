# Setup

1. Annahme der Pfade
    ```
    ./[App]/app/vite-[App]/package.json
    ./dashboard-vue-plugin/package.json (nur lokal DEV)
    ```
2. Node 22 wird benötigt
3. In `/[App]/app/vite-[App]` > `pnpm install`

# Build PROD oder Lokal ohne HMR

4. In `/[App]/app/vite-[App]` > `pnpm build`

5. [App] Neustarten

# Development mit HMR

-   3 Shells

-   `/[App]/app/vite-[App]`

    -   ??? `pnpm add ../../../dashboard-vue-plugin`
    -   `pnpm dev` (1/3) Vite HMR

-   `/dashboard-vue-plugin/`
    -   `pnpm install`
    -   `pnpm watch:ts` (2/3) Typescript Types HMR (benötigt Vite HMR)
    -   `pnpm watch:tw` (3/3) Tailwind HMR (benötigt Vite HMR)

<br>
<br>
<br>
<br>
<br>

# Aktuell Verfügbare Components

-   SimpleCard
-   MultiTextCard
-   ConfirmDialog
-   StyledCard
-   StyledMultiCard

# Props

### SimpleCard, StyledCard

-   `url?: string` On Click
-   `title?: string`
-   `titleClass?: string`
-   `description?: string`
-   `descriptionClass?: string`
-   `content?: string`
-   `contentClass?: string`
-   `note?: string` (nur StyledCard)
-   `noteClass?: string` (nur StyledCard)

### MultiTextCard

-   `title?: string`
-   `titleClass?: string`
-   `description?: string`
-   `descriptionClass?: string`
-   `items: {text: string, classes?: string, newLine?: boolean}[]`

### StyledMultiCard

- `url?: string;`
- `titleClass?: string;`
- `contentClass?: string;`
- `descriptionClass?: string;`
- `noteClass?: string;`
- `itemsTitle?: { text: string, classes?: string, newLine?: boolean, url?: string }[];`
- `itemsContent?: { text: string, classes?: string, newLine?: boolean, url?: string }[];`
- `itemsDescription?: { text: string, classes?: string, newLine?: boolean, url?: string }[];`
- `itemsNote?: { text: string, classes?: string, newLine?: boolean, url?: string }[];`

### ConfirmDialog

-   `title?: string`
-   `description?: string`
-   `content?: string`
-   `footer?: string`
