# Dsolcam — sitio web oficial

Sitio estático (HTML + CSS + JavaScript puro, sin frameworks ni backend) para
Dsolcam y su juego **TerraPiezas**, preparado para publicarse en **Cloudflare
Pages** sin proceso de compilación.

## 1. Probar el sitio en tu computadora

No se necesita instalar nada obligatoriamente: puedes abrir `index.html`
haciendo doble clic y el sitio funcionará (navegación, cambio de idioma,
menú móvil, galería). Sin embargo, algunos navegadores restringen ciertas
peticiones al abrir archivos con `file://`, así que se recomienda usar un
servidor local sencillo:

```bash
# Con Python (ya viene instalado en la mayoría de sistemas)
cd dsolcam-web
python3 -m http.server 8080
# Abre http://localhost:8080 en tu navegador
```

o, si tienes Node.js instalado:

```bash
cd dsolcam-web
npx serve .
```

Verifica:
- que el selector ES / English cambie todos los textos;
- que el menú hamburguesa funcione en una ventana angosta;
- que la galería abra el visor modal y se cierre con Escape;
- que los enlaces de Privacidad, Soporte y Términos funcionen;
- que no aparezcan errores en la consola del navegador (F12).

## 2. Crear un repositorio en GitHub

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo (por ejemplo, `dsolcam-web`). Puede ser privado o público.
3. Desde la carpeta del proyecto, en una terminal:

```bash
cd dsolcam-web
git init
git add .
git commit -m "Sitio inicial de Dsolcam"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/dsolcam-web.git
git push -u origin main
```

## 3. Crear una cuenta en Cloudflare

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) y crea una cuenta gratuita si no tienes una.

## 4. Crear el proyecto en Cloudflare Pages

1. En el panel de Cloudflare, entra a **Workers & Pages**.
2. Haz clic en **Crear aplicación** (Create application) → pestaña **Pages** → **Conectar con Git** (Connect to Git).
3. Autoriza el acceso a GitHub y selecciona el repositorio `dsolcam-web`.
4. En la configuración de compilación (build settings), usa exactamente:
   - **Framework preset:** `None`
   - **Build command:** (déjalo vacío)
   - **Build output directory:** `/`
5. Haz clic en **Guardar y desplegar** (Save and Deploy).

Cloudflare generará una URL temporal del tipo `dsolcam-web.pages.dev` donde
podrás ver el sitio publicado antes de conectar el dominio propio.

## 5. Agregar el dominio personalizado dsolcam.com

1. Dentro del proyecto de Pages, ve a la pestaña **Custom domains** (Dominios personalizados).
2. Haz clic en **Set up a custom domain** y escribe `dsolcam.com`.
3. Repite el proceso y agrega también `www.dsolcam.com`.

### Si el dominio ya administra su DNS en Cloudflare
Cloudflare configurará automáticamente los registros DNS necesarios.

### Si el dominio fue comprado en otro proveedor (GoDaddy, Namecheap, etc.)
No asumas que Cloudflare ya administra el DNS. Deberás:

1. Agregar el sitio `dsolcam.com` como una **zona** nueva en Cloudflare (menú principal → **Agregar un sitio**).
2. Cloudflare te dará dos servidores de nombres (nameservers), por ejemplo `ana.ns.cloudflare.com` y `bob.ns.cloudflare.com`.
3. Entra al panel de tu proveedor de dominio actual (donde compraste `dsolcam.com`) y reemplaza los nameservers existentes por los que te dio Cloudflare.
4. Espera la propagación (puede tardar desde minutos hasta 24-48 horas).
5. Una vez que Cloudflare confirme que la zona está activa, repite el paso de **Custom domains** en el proyecto de Pages.

## 6. Configurar la redirección de www

Con `www.dsolcam.com` agregado como dominio personalizado y el archivo
`_redirects` ya incluido en el proyecto (que redirige `www` hacia el dominio
raíz), Cloudflare debería aplicar la redirección automáticamente. Si prefieres
gestionarlo desde reglas de Cloudflare en lugar de `_redirects`, puedes crear
una regla de redirección (Redirect Rule) en el panel de Cloudflare, en la
sección **Rules**.

## 7. Comprobar el certificado HTTPS

1. En el panel del dominio en Cloudflare, ve a **SSL/TLS**.
2. Verifica que el modo esté en **Full** o **Full (strict)**.
3. Espera unos minutos a que se emita el certificado (se ve como "Active" / "Activo").

## 8. Verificar que todo funcione

Visita cada una de estas direcciones y confirma que cargan correctamente:

- `https://dsolcam.com`
- `https://dsolcam.com/privacy.html`
- `https://dsolcam.com/support.html`
- `https://dsolcam.com/terms.html`
- `https://dsolcam.com/app-ads.txt` (debe mostrarse como texto plano)
- `https://www.dsolcam.com` (debe redirigir a `https://dsolcam.com`)
- `https://dsolcam.com/una-ruta-que-no-existe` (debe mostrar la página 404 personalizada)

## 9. Actualizar el sitio

Cada vez que quieras publicar un cambio:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Cloudflare Pages detectará el nuevo commit y volverá a publicar el sitio
automáticamente en 1-2 minutos.

## 10. Invalidar caché

Si haces un cambio y no lo ves reflejado (por el `Cache-Control` de larga
duración definido en `_headers` para CSS, JS e imágenes):

1. Ve al panel de Cloudflare → tu dominio → **Caching** → **Configuration**.
2. Usa **Purge Everything** (Purgar todo) para forzar la actualización, o
   **Custom Purge** para invalidar solo archivos específicos.
3. Alternativamente, cambia el nombre de archivo (por ejemplo `styles.css` a
   `styles.v2.css`) para forzar una nueva descarga; esto no es necesario en
   uso normal.

## 11. Vincular con Google Play Console

Cuando publiques TerraPiezas en Google Play Console, usa:
- **Sitio web / Website:** `https://dsolcam.com`
- **Política de privacidad:** `https://dsolcam.com/privacy.html`
- Una vez que tengas la URL final de la ficha de Google Play, reemplaza el
  marcador `REEMPLAZAR_CON_URL_GOOGLE_PLAY` en `index.html` (ver
  `CONFIGURACION_PENDIENTE.md`) y habilita los botones correspondientes.

---

Consulta **CONFIGURACION_PENDIENTE.md** para la lista completa de datos que
debes reemplazar antes de publicar el sitio en producción.
