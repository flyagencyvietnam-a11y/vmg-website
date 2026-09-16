$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$assets = @{
  'chairman.png' = 'https://vmgenglish.edu.vn/upload_images/images/A%CC%89nh%20se%CC%82%CC%81p%20-%20WEB.png'
  'long-khanh.jpg' = 'https://vmgenglish.edu.vn/images/central/2023/10/12/resized/dsc00656_1697107536.jpg'
  'phuoc-tan.jpg' = 'https://vmgenglish.edu.vn/upload_images/images/FSB_7167.jpg'
  'lhu-career-fair.jpg' = 'https://vmgenglish.edu.vn/upload_images/images/vmg-lien-ket-dai-hoc-lac-hong.jpg'
  'cambridge-2026.jpg' = 'https://vmgenglish.edu.vn/upload_images/images/694703248_1408146314681986_6428906090039994365_n.jpg'
  'team-bien-hoa.jpg' = 'https://vmgenglish.edu.vn/images/central/2022/11/22/original/DSC02518.png'
}
$destination = Join-Path $root 'public/legacy'
New-Item -ItemType Directory -Force $destination | Out-Null
foreach ($asset in $assets.GetEnumerator()) {
  $target = Join-Path $destination $asset.Key
  if (-not (Test-Path -LiteralPath $target)) { Invoke-WebRequest -Uri $asset.Value -OutFile $target }
  Write-Output ($asset.Key + ': ' + (Get-Item -LiteralPath $target).Length + ' bytes')
}
