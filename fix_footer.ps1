# Tidy: collapse multiple blank lines inside footer-brand blocks
$files = Get-ChildItem -Path '.' -Filter '*.html' | Where-Object { $_.Name -ne 'index_original.html' }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content

    # Collapse 3+ consecutive blank lines into 1 (inside the whole file, safe)
    $content = [regex]::Replace($content, '(\r?\n){3,}', "`r`n`r`n")

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Tidied: $($file.Name)"
    }
}
Write-Host "Done."
