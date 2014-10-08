@echo off

ping -n 2 %AUTOVPN_REMOTE_LAN_IP% | find "TTL"
if %errorlevel%==0 goto end


title Terminating Lync...
:terminateLync
timeout 1 >nul 2>&1
taskkill /IM lync.exe /F >nul 2>&1
if not %errorlevel%==0 goto terminateLync
timeout 3 >nul 2>&1
tasklist /FI "IMAGENAME eq lync.exe" | findstr lync.exe >nul 2>&1
if %errorlevel%==0 goto terminateLync

title Will launch Lync (waiting for VPN connection)...
:detectVpnConnection
ping -n 2 %AUTOVPN_REMOTE_LAN_IP% | find "TTL"
if %errorlevel%==1 goto detectVpnConnection

start "" "C:\Program Files (x86)\Microsoft Office\Office15\lync.exe" /fromrunkey

:end
