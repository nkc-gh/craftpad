# Contributing

Rules for contributing small builds, prototypes, and learning projects to this repository.

## Project Scope

Craftpad is exclusively for **small builds** created while learning. Major, complex, or production-grade projects do not belong here.

### What Defines "Small Enough"?

A project qualifies for Craftpad if it meets these criteria:

1. **Single Purpose / Focus**: The build solves one specific problem, explores a single technology/API, or demonstrates one core concept (e.g., a CLI tool, a game, an API scraper, a UI widget, or an algorithm visualizer).
2. **Lightweight & Self-Contained**: Can be run with minimal setup and dependencies. It should not require complex multi-service architectures, external database clusters, or elaborate deployment infrastructure.
3. **Short Build Scope**: Typically built in a few hours to a few days as part of a learning sprint, rather than a long-term, multi-month evolving application.
4. **Self-Contained Directory**: The entire build lives inside its own dedicated folder and does not depend on other projects in the repo.

---

## Project Structure

Each build must live in its own directory and follow this structure:

```text
craftpad/
└── <project_name>/
    ├── README.md       # Project overview and run instructions
    ├── .gitignore      # Local ignores for dependencies/build artifacts
    └── <source_files>  # Source code
```

### Individual Project `README.md`

Every build must include a concise `README.md` containing:

- **Description**: What the project does (1-2 sentences).
- **Tech Stack**: Languages, libraries, or tools used.
- **How to Run**: Exact commands to install dependencies and execute the project.

---

## Commit Messages

Use this format for commit messages:

```text
<Action>: [<file or directory>]

<description of the change>

- 
- 
```

### Actions

| Action | Use |
| --- | --- |
| `Add` | Add a new build, feature, or document |
| `Update` | Update existing code, documentation, or dependencies |
| `Fix` | Fix bugs, broken scripts, or logic errors |
| `Remove` | Delete obsolete files, old builds, or unused code |

### Examples

```text
Add: [cli_weather_app/weather.py]

- Added CLI weather utility using OpenWeatherMap API.

Update: [markdown_parser/README.md]

- Added setup and usage instructions.

Fix: [tic_tac_toe/game.py]

- Fixed diagonal win check condition.

Remove: [calculator/legacy_eval.py]

- Deleted deprecated evaluation function.
```

**When changing multiple files in one commit , use this format :**

```text
Update: [cli_weather_app/main.py, api.py ; to_do_list/README.md]

- Added Celsius and Fahrenheit toggle flag in main.py.
- Added weather read function in api.py.
- Document new flags in README.md.
```

**Commit Rules:**

- Keep commits focused on a single logical change.
- Keep the first line short and direct.
- Use bullet points in the commit body when additional details are needed.

---

## File and Directory Naming

- Use **snake_case** for all project directories and filenames.
- Examples:
  - `cli_weather_app/`
  - `markdown_to_html/`
  - `ascii_art_generator/`
  - `main.py`
  - `data_parser.js`

---

## Code and Documentation Rules

- **Explain code and commands using comments**: Add comments (`//`, `#`, etc.) next to or directly above non-obvious code, key logic, or shell commands to explain what they do.

  Example:
  ```python
  # parse CLI flags for temperature unit conversion
  parser.add_argument("--unit", choices=["c", "f"], default="c")
  ```
- **Direct and simple**: Keep code simple and readable, and explanations about it brief and to the point.
- **No secrets**: Never commit private keys, passwords, API tokens, or `.env` files.
- **No build clutter**: Never commit build artifacts, virtual environments (`venv`, `.venv`), dependencies (`node_modules`), or compiled binaries. Keep them excluded using `.gitignore`.