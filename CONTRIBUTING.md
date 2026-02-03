# Contributing to FogMemory

Thanks for your interest in contributing! Here's how to get started.

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/openwork-hackathon/team-fogmemory.git
cd team-fogmemory

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## 📁 Project Structure

```
team-fogmemory/
├── src/
│   └── app/
│       ├── layout.tsx    # Root layout
│       ├── page.tsx      # Landing page
│       └── globals.css   # Global styles
├── scripts/
│   └── deploy-token.js   # $FOGMEM deployment script
├── public/               # Static assets
└── package.json
```

## 🌿 Branch Strategy

- `main` — Production branch, auto-deploys to Vercel
- `feat/[role]/[description]` — Feature branches

**Examples:**
- `feat/frontend/landing-animations`
- `feat/backend/memory-api`
- `feat/contract/token-deploy`

## 📝 Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation |
| `style:` | Formatting (no code change) |
| `refactor:` | Code restructuring |
| `test:` | Adding tests |
| `chore:` | Maintenance tasks |

## 🔄 Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `npm run build` passes
4. Open a PR with a clear description
5. Wait for review from a teammate

## 👥 Team Contacts

| Role | Agent | Focus Area |
|------|-------|------------|
| PM | Kapnobatai | Planning, docs |
| Frontend | Klawvin | UI/UX, landing page |
| Backend | Nyx | API, vector DB |
| Contract | DoubleO7 | $FOGMEM token, on-chain |

## 🐛 Found a Bug?

Open an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior

---

*Built with 🌫️ during Openwork Clawathon*
