#!/bin/bash
# 🕉️ Startup Script: Initializes Wine environment and starts services
# "यतो धर्मस्ततो जयः" - "Где праведность, там и победа."

# Exit on error
set -e

# 1. Start Virtual Framebuffer (Xvfb)
echo "🖥️ Starting Virtual Framebuffer on display :99..."
Xvfb :99 -screen 0 1920x1080x24 -ac +extension GLX +render -noreset > /app/logs/xvfb.log 2>&1 &
XVFB_PID=$!

# 2. Start Window Manager (Fluxbox)
echo "🖥️ Starting Window Manager (Fluxbox)..."
fluxbox -display :99 > /app/logs/fluxbox.log 2>&1 &
FLUXBOX_PID=$!
sleep 2

# 3. Start VNC Server for remote access
# The password is 'railway'
echo "🖥️ Starting VNC Server on port 5900..."
x11vnc -display :99 -N -forever -usepw -create -passwd railway > /app/logs/vnc.log 2>&1 &
VNC_PID=$!

# 4. Initialize Wine prefix (if not exists)
if [ ! -d "$WINEPREFIX" ]; then
  echo "🍷 Initializing Wine prefix in $WINEPREFIX..."
  wineboot --init > /app/logs/wineboot.log 2>&1
  
  # Install necessary Windows components
  echo "🍷 Installing Visual C++ Redistributables..."
  winetricks -q vcrun2019 > /app/logs/winetricks.log 2>&1 || true
  
  echo "🍷 Installing .NET Framework..."
  winetricks -q dotnet48 > /app/logs/winetricks-dotnet.log 2>&1 || true
fi

echo "✅ Virtual environment is ready."
echo "➡️ VNC available at port 5900 (password: railway)"
echo "➡️ Nexrender Server will start shortly..."

# 5. Setup graceful shutdown
cleanup() {
  echo "🛑 Shutting down services..."
  kill $VNC_PID $FLUXBOX_PID $XVFB_PID 2>/dev/null || true
  exit 0
}
trap cleanup SIGTERM SIGINT

# 6. Start the Nexrender Node.js Server
echo "🚀 Starting Nexrender server..."
# Use exec to replace the shell process with the Node process
exec node build/main/src/index.js >> /app/logs/nexrender.log 2>&1
