# Add Google Site Verification meta tag to all HTML files
$metaTag = '  <meta name="google-site-verification" content="eew-2YPhOJBOebMndsCwSZj5D-81QFe-ZEsrE2IcGGk" />'
$files = Get-ChildItem -Path '.' -Filter '*.html' | Where-Object { $_.Name -ne 'index_original.html' }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    # Check if already exists
    if ($content -match "google-site-verification") {
        Write-Host "Skipping (already exists): $($file.Name)"
        continue
    }

    # Insert after <head> tag
    $newContent = $content -replace '(?i)<head>', "<head>`r`n$metaTag"

    if ($newContent -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done."
