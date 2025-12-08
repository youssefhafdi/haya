@echo off
echo Checking if haya-assurances.com points to VPS...
echo.
curl -sI http://haya-assurances.com | findstr /C:"nginx" /C:"x-iplb"
echo.
if errorlevel 1 (
    echo Domain might not be accessible yet
) else (
    echo If you see "nginx" - it's ready!
    echo If you see "x-iplb" - still waiting for OVH cache to clear
)
pause
