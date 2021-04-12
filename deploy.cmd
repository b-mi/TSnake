@echo off
call npm version patch
call ng deploy --base-href=TSnake
pause
