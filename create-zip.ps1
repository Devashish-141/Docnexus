# Create deployment ZIP
$source = "f:\docnexu\d"
$destination = "f:\docnexu\docnexus-deployment.zip"

# Remove old zip if exists
if (Test-Path $destination) {
    Remove-Item $destination -Force
}

# Files and folders to exclude
$exclude = @(
    "node_modules",
    ".git",
    ".netlify",
    "dist",
    "dist-ssr",
    ".env",
    "*.log",
    "deploy_frontend.zip",
    "docnexus-deployment.zip"
)

# Get all files except excluded
$files = Get-ChildItem -Path $source -Recurse | Where-Object {
    $item = $_
    $shouldExclude = $false
    
    foreach ($pattern in $exclude) {
        if ($item.FullName -like "*\$pattern\*" -or $item.Name -like $pattern) {
            $shouldExclude = $true
            break
        }
    }
    
    -not $shouldExclude
}

# Create temp directory
$temp = "f:\docnexu\temp_zip"
if (Test-Path $temp) {
    Remove-Item $temp -Recurse -Force
}
New-Item -ItemType Directory -Path $temp | Out-Null

# Copy files maintaining structure
foreach ($file in $files) {
    if (-not $file.PSIsContainer) {
        $relativePath = $file.FullName.Substring($source.Length + 1)
        $destPath = Join-Path $temp $relativePath
        $destDir = Split-Path $destPath -Parent
        
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        
        Copy-Item $file.FullName -Destination $destPath -Force
    }
}

# Create ZIP
Compress-Archive -Path "$temp\*" -DestinationPath $destination -CompressionLevel Optimal -Force

# Cleanup
Remove-Item $temp -Recurse -Force

Write-Host "✅ ZIP created successfully at: $destination"
$zipSize = (Get-Item $destination).Length / 1MB
Write-Host "📦 Size: $([math]::Round($zipSize, 2)) MB"
