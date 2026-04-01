@echo off
rd /s /q .next
Remove-Item -Recurse -Force .next

taskkill /pid node.exe /f
taskkill /pid node.exe /f
taskkill /pid node.exe /f
taskkill /pid node.exe /f
npx pnpm dev