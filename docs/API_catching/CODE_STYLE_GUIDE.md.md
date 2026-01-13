# 🧰 Code Style & Project Structure Guide

This guide outlines the conventions and structure we use across the project to ensure consistency and maintainability.

---

## 1. Naming Conventions

- **Variables & Functions**: `camelCase`  
  e.g., `fetchUserData`, `isVisible`, `calculateTotal()`

- **Classes, Components & Types**: `PascalCase`  
  e.g., `UserController`, `OrderManager`, `UserProfile`

- **Constants**: `UPPER_SNAKE_CASE`  
  e.g., `API_BASE_URL`, `MAX_RETRIES`

- **File & Folder Names**: `kebab-case` (lowercase with hyphens)  
  e.g., `user-profile.service.ts`, `auth-service.ts`

  - Avoid uppercase and spaces
  - Use ASCII alphanumeric, hyphens, and underscores

- **React Hooks**: `camelCase`, prefixed with `use`  
  e.g., `useAuth()`

- **File Naming Patterns**:
  - Components: `ComponentName.jsx` or `.tsx`
  - Test files: `moduleName.test.ts` or `.spec.ts`

---

## 2. Folder / File Structure

Organize by **feature/domain**, not tech layer:

- Keep nesting shallow (max ∼3 levels)
- Use `index.ts` for central exports

---

## 3. Project Organization

- **src/**: source code
- **public/** or **assets/**: images, fonts, static files
- **tests/**: e2e/integration tests (or colocated in `*.test.ts`)
- **config/**: environment vars, DB settings
- **migrations/**: timestamps + migration scripts

---

## 4. Best Practices

- No abbreviations unless standard
- Avoid special characters/spaces in filenames
- Follow case consistency across OSs (Git sensitivity)
- Prefer flat structure over deeply nested files

---

## 5. Tooling

- **Linting & Formatting**: ESLint, Prettier
- **Testing**: Jest, React Testing Library, or Cypress
- **CI/CD**: enforce style & test pipelines
- **Documentation**: `README.md`, `CONTRIBUTING.md`

---

## 6. Git & Repo Conventions

- **Branch names**: `feature/your-feature`, `bugfix/issue-123`
- **Commit messages**: Imperative present tense  
  e.g., `Add user login endpoint`, `Fix typo in header`
- **Repo naming**: lowercase kebab-case, descriptive (e.g., `user-profile-service`)

---

## 7. Markdown Guidelines

- Headings: use `# Heading` with a space
- Blank line before & after headings
- Code & paths inline: use backticks `` `path/to/file` ``
- File names & directories: lowercase kebab-case
- End files with a newline
