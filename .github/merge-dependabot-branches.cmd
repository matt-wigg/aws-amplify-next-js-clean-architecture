@echo off
setlocal enabledelayedexpansion

:: Merge all remote branches that start with "dependabot/"
for /f "delims=" %%b in ('git branch -r ^| findstr "origin/dependabot/"') do (
    for /f "tokens=* delims= " %%c in ("%%b") do (
        set "branch=%%c"
        set "cleaned=!branch:origin/=!"
        echo.
        echo Merging: origin/!cleaned!
        git merge --no-ff --no-edit -m "chore(dependabot): bump !cleaned!" origin/!cleaned!
    )
)

endlocal
pause
