Add-Type -AssemblyName System.Drawing
$dir = 'c:\Users\Hetul Mistry\Documents\Portfolio Main\hetulmistry-portfolio\public\icons'
$files = Get-ChildItem -Path $dir -Filter '*.png'
foreach ($f in $files) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $newImg = New-Object System.Drawing.Bitmap(96, 96)
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 96, 96)
    $img.Dispose()
    $tempPath = $f.FullName + '.temp.png'
    $newImg.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newImg.Dispose()
    $g.Dispose()
    Move-Item -Path $tempPath -Destination $f.FullName -Force
}
