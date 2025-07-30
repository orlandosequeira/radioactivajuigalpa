# Guía de Configuración de Contenido para RADIOACTIVAJUIGALPA

¡Felicidades por llevar tu aplicación al siguiente nivel!

Para que puedas gestionar el contenido de tu aplicación (el logo y las imágenes de la galería) de forma fácil y gratuita, hemos conectado la app a una Hoja de Cálculo de Google (Google Sheets).

Sigue estos sencillos pasos para configurarla.

### Paso 1: Crea tu Hoja de Cálculo

1.  Ve a [sheets.google.com](https://sheets.google.com) y crea una nueva hoja de cálculo en blanco.
2.  Nómbrala como "Contenido App Radioactiva" o algo similar.
3.  En la primera fila (fila 1), escribe los siguientes encabezados, cada uno en una columna separada:
    *   En la celda `A1`, escribe: `type`
    *   En la celda `B1`, escribe: `url`
    *   En la celda `C1`, escribe: `alt`

Tu hoja debería verse así:

|   | A    | B                               | C               |
|---|------|---------------------------------|-----------------|
| 1 | type | url                             | alt             |
| 2 |      |                                 |                 |

### Paso 2: Añade tu Contenido

Ahora, vamos a añadir las URLs de tu logo y de las imágenes de la galería.

1.  **Para el Logo:**
    *   En la celda `A2`, escribe `logo`.
    *   En la celda `B2`, pega la URL completa de tu imagen de logo. (Ej: `https://i.imgur.com/tu_logo.png`)
    *   En la celda `C2`, escribe una descripción como `Logo de la radio`.

2.  **Para las Imágenes de la Galería:**
    *   En la celda `A3`, escribe `slide`.
    *   En la celda `B3`, pega la URL de tu primera imagen de la galería.
    *   En la celda `C3`, escribe una descripción para la imagen.
    *   Repite este proceso para cada imagen que quieras en tu galería, una por fila.

**Ejemplo de cómo debería quedar:**

|   | A       | B                                                    | C                        |
|---|---------|------------------------------------------------------|--------------------------|
| 1 | type    | url                                                  | alt                      |
| 2 | logo    | https://placehold.co/400x128/000000/fbbf24?text=LOGO | Logo de RADIOACTIVAJUIGALPA |
| 3 | slide   | https://placehold.co/1080x1080/fbbf24/000000?text=1   | Imagen de evento 1       |
| 4 | slide   | https://placehold.co/1080x1080/000000/fbbf24?text=2   | Anuncio de programa      |
| 5 | slide   | https://placehold.co/1080x1080/fbbf24/000000?text=3   | Versículo del día        |

### Paso 3: Publica la Hoja en la Web

Este es el paso más importante para que la aplicación pueda leer los datos.

1.  Dentro de tu hoja de cálculo, ve al menú **Archivo > Compartir > Publicar en la web**.
2.  En la ventana que aparece:
    *   En la sección "Enlace", asegúrate de que esté seleccionada la **Hoja 1** (o la hoja donde pusiste el contenido).
    *   En el menú desplegable de la derecha, selecciona **Valores separados por comas (.csv)**.
3.  Haz clic en el botón verde que dice **Publicar**.
4.  Te pedirá confirmación, haz clic en **Aceptar**.
5.  Se generará una URL. **Copia esta URL.** ¡Es la que necesitas para la aplicación!



### Paso 4: Conecta la Hoja a tu Aplicación

1.  Abre el archivo `services/geminiService.ts` en tu proyecto.
2.  Busca la línea que dice: `const GOOGLE_SHEET_CSV_URL = 'URL_PUBLICA_DE_TU_CSV_AQUI';`
3.  **Reemplaza `'URL_PUBLICA_DE_TU_CSV_AQUI'` con la URL que copiaste en el paso anterior.**

```typescript
// Pega tu URL aquí:
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?output=csv';
```

### ¡Listo!

¡Eso es todo! Guarda los cambios y tu aplicación ahora mostrará el contenido directamente desde tu hoja de cálculo.

**Para actualizar el logo o las imágenes en el futuro, simplemente edita la hoja de cálculo. Los cambios se reflejarán automáticamente en la aplicación la próxima vez que se cargue (puede tardar unos 5 minutos en actualizarse debido a la caché de Google).**
