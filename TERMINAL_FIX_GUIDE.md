# 🔧 Terminal Issue - Solutions

We detected a terminal output buffering issue. Here are the solutions:

## Solution 1: Use the Launcher Script (RECOMMENDED) ✅

The easiest way to start CineConnect:

### macOS / Linux:
```bash
# Double-click this file in Finder:
/Users/hirushapathum/Documents/GitHub/cineconnect-lk/launch-dev.command

# OR run from Terminal:
bash /Users/hirushapathum/Documents/GitHub/cineconnect-lk/launch-dev.command
```

### What it does:
- ✅ Changes to project directory
- ✅ Checks if npm is installed
- ✅ Installs dependencies if needed
- ✅ Starts the dev server
- ✅ Displays nice formatted output

---

## Solution 2: VS Code Integrated Terminal (BEST) 🚀

Use VS Code's built-in terminal (works best):

1. **Open VS Code**
   ```bash
   code /Users/hirushapathum/Documents/GitHub/cineconnect-lk
   ```

2. **Open Terminal in VS Code**
   - Press: `Ctrl + ~` (or Cmd + ~ on Mac)
   - Or: View → Terminal

3. **Run commands in VS Code terminal:**
   ```bash
   npm install
   npm run dev
   ```

**VS Code terminal properly handles output**, so you'll see:
- ✅ Server startup messages
- ✅ Build progress
- ✅ Hot reload notifications
- ✅ Error messages (if any)

---

## Solution 3: System Terminal with Logging

If you prefer native macOS Terminal:

1. **Open Terminal app**
   - Cmd + Space → type "Terminal" → Enter

2. **Run with output logging:**
   ```bash
   cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
   npm run dev 2>&1 | tee server.log
   ```

   This:
   - Runs the dev server
   - Shows output in Terminal
   - Saves output to `server.log` file

3. **Access the app:** Open browser to `http://localhost:3000`

---

## Solution 4: PM2 Process Manager (Advanced)

For persistent background running:

```bash
# Install pm2 globally
npm install -g pm2

# Start server with pm2
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
pm2 start "npm run dev" --name "cineconnect"

# View status
pm2 status

# View logs
pm2 logs cineconnect

# Stop server
pm2 stop cineconnect
```

---

## Solution 5: Docker (If You Have Docker)

```bash
# Create Dockerfile (if not exists)
cat > /Users/hirushapathum/Documents/GitHub/cineconnect-lk/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
EOF

# Build and run
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
docker build -t cineconnect .
docker run -p 3000:3000 cineconnect
```

---

## Quick Diagnosis

Let me verify your setup is correct:

### Check Node.js:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
```

### Check Project Files:
```bash
cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk
ls -la package.json  # Should exist
ls -la src/app/page.tsx  # Should exist
```

### Check Dependencies:
```bash
npm list | head -20  # Shows installed packages
```

### Check Port:
```bash
# See what's using port 3000
lsof -i :3000

# If something is using it, kill it:
kill -9 <PID>
```

---

## Expected Output When Server Starts

When the dev server starts correctly, you should see:

```
> cineconnect-lk@0.1.0 dev
> next dev

  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

  ✓ Ready in 2.5s
```

Then open your browser to **http://localhost:3000** and you'll see the landing page!

---

## Troubleshooting

### Server won't start?

1. **Check if Node.js is installed:**
   ```bash
   which node
   ```
   
   If nothing shows, install from https://nodejs.org/

2. **Check if dependencies are installed:**
   ```bash
   ls -la node_modules
   ```
   
   If empty, run:
   ```bash
   npm install
   ```

3. **Check for errors:**
   ```bash
   npm run build
   ```
   
   This will show any code issues

4. **Port 3000 in use?**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

### Getting "command not found"?

```bash
# Full paths approach
/usr/local/bin/npm run dev

# Or use Homebrew to reinstall
brew install node
```

### Permissions issues?

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## Recommended: Use VS Code

For the best experience, **use VS Code's integrated terminal**:

```bash
# 1. Install VS Code (if needed)
# Download from: https://code.visualstudio.com/

# 2. Open project
code /Users/hirushapathum/Documents/GitHub/cineconnect-lk

# 3. Open terminal (Ctrl + ~)
# 4. Type: npm run dev
```

VS Code handles terminal output perfectly and shows:
- ✅ Server messages
- ✅ Hot reload notifications
- ✅ Error details
- ✅ Type checking
- ✅ Build warnings

---

## Terminal Output Comparison

| Method | Output | Real-time | Logging |
|--------|--------|-----------|---------|
| **VS Code Terminal** | ✅ Perfect | ✅ Yes | ✅ Easy |
| **Native Terminal** | ✅ Good | ✅ Yes | ⚠️ Need tee |
| **launch-dev.command** | ✅ Good | ✅ Yes | ⚠️ File only |
| **PM2** | ✅ Good | ❌ No | ✅ Automatic |
| **Docker** | ✅ Perfect | ✅ Yes | ✅ Automatic |

---

## Next Steps

**Option A: Quick Start (Recommended)**
1. Open Terminal
2. Run: `cd /Users/hirushapathum/Documents/GitHub/cineconnect-lk`
3. Run: `npm run dev`
4. Open: http://localhost:3000

**Option B: Use Script**
1. Run: `bash /Users/hirushapathum/Documents/GitHub/cineconnect-lk/launch-dev.command`
2. Open: http://localhost:3000

**Option C: Use VS Code**
1. Run: `code /Users/hirushapathum/Documents/GitHub/cineconnect-lk`
2. Press: `Ctrl + ~`
3. Run: `npm run dev`
4. Open: http://localhost:3000

---

## Success Indicators

When everything is working, you'll see:

✅ Terminal shows "Ready in Xs"
✅ Landing page loads at http://localhost:3000
✅ Browser shows CineConnect logo and content
✅ Navigation buttons work
✅ No error messages in browser console (F12)

---

## Getting Help

If you still have issues:

1. Check browser console: Press `F12` → Console tab
2. Check for error messages in terminal
3. Try: `npm run build` to see compilation errors
4. Try: `npm cache clean --force` and reinstall
5. Verify Node version: `node --version` (should be 18+)

---

**Try the VS Code terminal method - it works best! 🚀**
