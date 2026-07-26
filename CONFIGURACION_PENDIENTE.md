# Configuración pendiente antes de publicar

Este archivo centraliza **todos** los marcadores que dejé en el proyecto para
que los reemplaces con información real. Ningún dato de contacto, legal o
comercial fue inventado: donde faltaba información, se dejó un marcador
explícito.

## Marcadores obligatorios antes de publicar

### 1. `REEMPLAZAR_CON_CORREO_DE_SOPORTE`
**Qué es:** el correo electrónico donde las personas usuarias podrán
contactarte.
**Dónde aparece:**
- `index.html` (botón "Escribir por correo" en la sección de contacto)
- `support.html` (botón "Enviar correo a soporte")
- `privacy.html` (sección 12, "Contacto")
- `terms.html` (sección 8, "Contacto")

**Qué hacer:** busca `REEMPLAZAR_CON_CORREO_DE_SOPORTE` en esos archivos y
reemplázalo por tu correo real, tanto en el texto visible como en el
atributo `href="mailto:..."`.

**Obligatorio antes de publicar:** sí. Sin un correo real, las personas
usuarias no podrán contactarte ni reportar errores.

---

### 2. `REEMPLAZAR_CON_URL_GOOGLE_PLAY`
**Qué es:** la URL de la ficha de TerraPiezas en Google Play.
**Dónde aparece:** mencionado en comentarios de `index.html`, en la sección
de aplicaciones y en la sección destacada de TerraPiezas.

**Qué hacer:** cuando tengas la URL real:
1. Reemplaza el `<button disabled>` de "Próximamente en Google Play" por un
   `<a class="btn btn-primary" href="TU_URL_REAL">` (el texto exacto a usar
   ya está indicado en un comentario justo antes de cada botón).
2. Actualiza también el texto de estado (`app-status`) de "Próximamente en
   Google Play" a algo como "Disponible en Google Play".
3. Actualiza el JSON-LD de `index.html` (bloque `MobileApplication`) agregando
   un campo `"installUrl": "TU_URL_REAL"`.

**Obligatorio antes de publicar:** no impide publicar el sitio; puede
agregarse después, cuando la app esté aprobada en Google Play.

---

### 3. `REEMPLAZAR_CON_PUBLISHER_ID`
**Qué es:** tu Publisher ID real de Google AdMob.
**Dónde aparece:** `app-ads.txt`, en la raíz del proyecto.

**Qué hacer:** reemplaza `pub-REEMPLAZAR_CON_PUBLISHER_ID` por el ID
completo que te da AdMob (formato `pub-XXXXXXXXXXXXXXXX`).

**Obligatorio antes de publicar:** sí, si vas a monetizar con AdMob. Sin el
ID correcto, AdMob no podrá verificar el archivo y los anuncios no se
mostrarán correctamente.

---

### 4. `REEMPLAZAR_FECHA`
**Qué es:** la fecha de la versión vigente de los documentos legales.
**Dónde aparece:**
- `privacy.html` ("Última actualización")
- `terms.html` ("Última actualización")
- Las mismas cadenas también están centralizadas en `js/translations.js`
  (claves `privacy.updated` y `terms.updated`).

**Qué hacer:** reemplaza `REEMPLAZAR_FECHA` por la fecha real de publicación,
por ejemplo `25 de julio de 2026`.

**Obligatorio antes de publicar:** sí, es una buena práctica legal y de
transparencia mostrar cuándo se actualizó cada documento por última vez.

---

### 5. `REVISAR_ANTES_DE_PUBLICAR`
**Qué es:** un marcador para todo texto legal o de soporte que no pude
confirmar porque depende de decisiones tuyas (por ejemplo, si la app
requiere internet, la clasificación de edad definitiva, o el alcance legal
de la limitación de responsabilidad).
**Dónde aparece:** repartido en `privacy.html`, `terms.html` y `support.html`
(y en sus equivalentes de `js/translations.js`).

**Qué hacer:** busca este texto en los tres archivos, revisa cada frase en su
contexto y complétala con la información real o correcta. Idealmente, que
`privacy.html` y `terms.html` sean revisados por una persona con
conocimiento legal antes de la publicación definitiva.

**Obligatorio antes de publicar:** sí, especialmente en `privacy.html`, ya
que es el documento que enlazarás en Google Play Console.

---

## Imágenes: estado actual

Todas las imágenes solicitadas ya fueron agregadas al proyecto (ninguna fue
inventada ni descargada de internet; todas las que aparecen a continuación
las proporcionaste tú):

| Archivo | Usado en | Estado |
|---|---|---|
| `assets/logo/dsolcam-logo.jpg` | Hero de `index.html` | Agregado (convertido a JPEG optimizado, 177 KB) |
| `assets/logo/dsolcam-mark.png` | Encabezado y pie de página (todas las páginas) | Agregado (recorte cuadrado del logotipo) |
| `assets/logo/terrapiezas-logo.png` | Sección destacada de TerraPiezas | Agregado |
| `assets/icons/terrapiezas-icon.png` | Tarjeta de aplicación y sección destacada | Agregado |
| `assets/screenshots/terrapiezas-home.jpg` | Galería (menú principal) | Agregado |
| `assets/screenshots/terrapiezas-game.jpg` | Galería (pantalla de juego) | Agregado |
| `assets/screenshots/terrapiezas-gallery.jpg` | Galería (galería de paisajes) | Agregado |

⚠️ **Aviso importante — inconsistencia de nombre detectada:** el logotipo
`terrapiezas-logo.png` que enviaste dice **"TerraPieces"** (en inglés),
mientras que el ícono de la app, las capturas de pantalla y todo el resto
del sitio usan **"TerraPiezas"**. No corregí ni edité tu logotipo — solo lo
integré tal como lo enviaste. Antes de publicar, decide cuál de los dos
nombres es el definitivo y, si corresponde, pide un logotipo actualizado
para que coincida con el nombre usado en el resto de la marca.

⚠️ **Capturas de pantalla:** las tres imágenes de la galería son capturas
reales del teléfono e incluyen la barra de estado de Android (hora,
batería, notificaciones). Para las capturas que subas a la ficha de
Google Play Console, Google recomienda imágenes sin esa barra de estado o
con una barra "limpia". Para el sitio web no es obligatorio, pero es buen
momento para recortarlas si piensas reutilizarlas en Play Store.

Nota: el ícono de marca que aparece en el encabezado y el pie de página
(`favicon.ico` y los PNG relacionados) ya fueron generados a partir de tu
logotipo real de Dsolcam (la placa metálica grabada), así que reflejan tu
marca definitiva y no una versión provisional.

## Optimización de imágenes ya realizada

Ya comprimí y redimensioné los archivos pesados para que el sitio cargue
rápido, sin que pierdan nitidez perceptible:

- `assets/logo/dsolcam-logo.jpg`: convertida de PNG (2.8 MB) a JPEG optimizado
  (177 KB), redimensionada a 760×950 px (suficiente para el marco del hero,
  incluso en pantallas de alta densidad).
- `assets/logo/terrapiezas-logo.png`: redimensionada de 1752×412 a 900×212 px
  y recomprimida (de 1.1 MB a 284 KB), conservando la transparencia.
- `assets/icons/terrapiezas-icon.png`: redimensionado a 512×512 px (284 KB),
  el tamaño estándar que también podrás subir a Google Play Console.
- Las tres capturas de pantalla se redujeron de ~1080×2400 px a 720×1600 px
  y se comprimieron a calidad 82 en JPEG (entre 92 KB y 236 KB cada una).

Si más adelante quieres exprimir aún más el rendimiento, el siguiente paso
sería convertir estos mismos archivos a **WebP**, que suele pesar entre 20%
y 30% menos que un JPEG/PNG equivalente sin pérdida perceptible.

## Resumen: qué es obligatorio y qué puede esperar

**Obligatorio antes de publicar:**
- `REEMPLAZAR_CON_CORREO_DE_SOPORTE`
- `REEMPLAZAR_CON_PUBLISHER_ID` (si usarás AdMob desde el lanzamiento)
- `REEMPLAZAR_FECHA`
- Revisar todo el texto marcado con `REVISAR_ANTES_DE_PUBLICAR`, en especial
  en `privacy.html`

**Puede completarse después del lanzamiento inicial:**
- `REEMPLAZAR_CON_URL_GOOGLE_PLAY` (hasta que la app esté publicada)
- Resolver la inconsistencia "TerraPieces" / "TerraPiezas" en el logotipo
- Si quieres exprimir aún más el rendimiento, convertir las imágenes ya
  optimizadas a formato WebP (ver sección anterior)
