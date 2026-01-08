# Script para generar iconos PWA usando Python o PowerShell

Write-Host "Generando iconos PWA..." -ForegroundColor Cyan

# Crear iconos base64 PNG simples
$icon192Base64 = "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJklEQVR4nO3dMW4bMRRA0S+wC+cCPkDO4KP4Fj6Kb+EjeGkXQrIwBCMgmKI4/J+Z9wpBFGWSb0YaWf4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBKvr29/Xh7e/t1dn1n+Hz9+fLz9efvs+s9m/dvb2+/lw/zb/bxf/9+f/35z9n1A9zq8/Xny8/Xn7/P7v/z9efLz9efv8+uF+BWn68/f5zdz+frz5efL37/flY/wC0+X3++/Hz9+fvs/j9ff778fP35++x6AW71+frzy8/Xn7/P7v/z9efLz9efv8+uF+BWn68/f5zdz+frz5efr79//35SP8BN/vf3+vpz9v0fZ/cPcKvP158vP19//j67/8/Xny8/X3/+PrtegFt9vv788vP15++z+/98/fny8/Xn77PrBbjV5+vPL2f38/n68+Xn6+/fv5/UD3CTv7++vv6cff/H2f0D3Orz9efLz9efv8/u//P158vP15+/z64X4Fafrz+/nN3P5+vPl5+vv3//flI/wE3+/vr6+nP2/R9n9w9wq8/Xny8/X3/+Prv/z9efLz9ff/4+u16AW32+/vxydj+frz9ffr7+/v37Sf0AN/n76+vry9n3f5zdP8CtPl9/vvx8/fn77P4/X3++/Hz9+fvsegFu9fn688vP15+/z+7/8/Xny8/Xn7/Prhfg1v8BPl9//j67/8/Xny8/X3/+PrtegFt9vv78cnY/n68/X36+/v39+0n9ADf5++vr68vZ93+c3T/ArT5ff778fP35++z+P19/vvx8/fn77HoBbvX5+vPLz9efv8/u//P158vP15+/z64X4Fafrz+/nN3P5+vPl5+vv3//flI/wE3+/vr6+nL2/R9n9w9wq8/Xny8/X3/+Prv/z9efLz9ff/4+u16AW32+/vzy8/Xn77P7/3z9+fLz9efvs+sFuNXn688vZ/fz+frz5efr79+/n9QPcJO/v76+vpx9/8fZ/QPc6vP158vP15+/z+7/8/Xny8/Xn7/Prhfg1v8BPl9//j67/8/Xny8/X3/+PrtegFt9vv78cnY/n68/X36+/v79+0n9ADf5++vr68vZ93+c3T/ArT5ff778fP35++z+P19/vvx8/fn77HoBbvX5+vPLz9efv8/u//P158vP15+/z64X4Fafrz+/nN3P5+vPl5+vv3//flI/wE3+/vr6+nL2/R9n9w9wq8/Xny8/X3/+Prv/z9efLz9ff/4+u16AW32+/vzy8/Xn77P7/3z9+fLz9efvs+sFuNXn688vZ/fz+frz5efr79+/n9QPcJO/v76+vpx9/8fZ/QPc6vP158vP15+/z+7/8/Xny8/Xn7/Prhfg1v8BPl9//j67/8/Xny8/X3/+PrtegFt9vv78cnY/n68/X36+/v79+0n9ADf5++vr68vZ93+c3T/ArT5ff778fP35++z+P19/vvx8/fn77HoBbvX5+vPLz9efv8/u//P158vP15+/z64X4FaT9efLz9efv8+u//P158vP15+/z64X4FaTref8fu59dr0At5q0n/P7uffZ9QLcatL+zu/n3mfXC3CrSfs5v597n10vwK0m7ef8fu59dr0At5q0n/P7uffZ9QLcatJ+zu/n3mfXC3CrSfs5v597n10vwK0m7ef8fu59dr0At5q0n/P7uffZ9QLcatJ+zu/n3mfXC3CrSfs5v597n10vwK0m7ef8fu59dr0At5q0n/P7uffZ9QLcatJ+zu/n3mfXC3CrSfs5v597n10vwK0m7ef8fu59dr0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAALC2P/EKIHFvPGzsAAAAAElFTkSuQmCC"

$icon512Base64 = "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"

try {
    # Decodificar y guardar icon-192.png
    $bytes192 = [Convert]::FromBase64String($icon192Base64)
    [IO.File]::WriteAllBytes("$PSScriptRoot\icon-192.png", $bytes192)
    Write-Host "✅ icon-192.png creado" -ForegroundColor Green
    
    # Decodificar y guardar icon-512.png
    $bytes512 = [Convert]::FromBase64String($icon512Base64)
    [IO.File]::WriteAllBytes("$PSScriptRoot\icon-512.png", $bytes512)
    Write-Host "✅ icon-512.png creado" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🎉 ¡Iconos PWA generados exitosamente!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ahora haz:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m 'Add PWA support'" -ForegroundColor White
    Write-Host "  git push" -ForegroundColor White
    
} catch {
    Write-Host "❌ Error al generar iconos: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternativa: Usa https://realfavicongenerator.net/" -ForegroundColor Yellow
}
