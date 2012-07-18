@echo off
title Will launch Trillian (waiting for VPN connection)...
:detectVpnConnection
ping -n 2 %AUTOVPN_REMOTE_LAN_IP% | find "TTL"
if %errorlevel%==1 goto detectVpnConnection

start "" "C:\Program Files (x86)\Trillian\trillian.exe"

