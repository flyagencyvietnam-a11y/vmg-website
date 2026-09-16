$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetRoot = Join-Path (Split-Path $PSScriptRoot -Parent) 'public/legacy'
foreach ($name in @('long-khanh.jpg', 'phuoc-tan.jpg', 'lhu-career-fair.jpg', 'cambridge-2026.jpg', 'team-bien-hoa.jpg')) {
  $path = Join-Path $assetRoot $name
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $stream = [System.IO.MemoryStream]::new($bytes, 0, $bytes.Length)
  $source = [System.Drawing.Image]::FromStream($stream)
  $ratio = [Math]::Min(1.0, 1200.0 / $source.Width)
  $bitmap = [System.Drawing.Bitmap]::new([int]($source.Width * $ratio), [int]($source.Height * $ratio))
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($source, 0, 0, $bitmap.Width, $bitmap.Height)
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]82)
  $bitmap.Save($path, $encoder, $parameters)
  $graphics.Dispose(); $bitmap.Dispose(); $source.Dispose(); $stream.Dispose(); $parameters.Dispose()
  Write-Output ($name + ': ' + (Get-Item -LiteralPath $path).Length + ' bytes')
}
