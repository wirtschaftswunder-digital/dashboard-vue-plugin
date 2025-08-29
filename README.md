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

- 3 Shells

- `/[App]/app/vite-[App]`

    - ??? `pnpm add ../../../dashboard-vue-plugin`
    - `pnpm dev` (1/3)

- `/dashboard-vue-plugin/`
    - `pnpm install`
    - `pnpm watch:ts` (2/3) Typescript Types HMR
    - `pnpm watch:tw` (3/3) Tailwind HMR

<br>
<br>
<br>
<br>
<br>

# Aktuell Verfügbare Components

- SimpleCard
- ConfirmDialog




# Props

### SimpleCard

Nur 1 Icon

- `title?: string`
- `description?: string`
- `content?: string`
- `footer?: string`
- `iconFas?: string` [Fontawesome 5 Pro](https://fontawesome.com/v5/search?o=r)
- `iconLc?: string` [Lucide](https://lucide.dev/icons/categories)

### ConfirmDialog



- `title?: string`
- `description?: string`
- `content?: string`
- `footer?: string`