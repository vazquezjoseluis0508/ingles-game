# 🗺️ Roadmap — Juego de inglés Senior 5

## Dónde estamos
Web local (HTML/CSS/JS sin framework), progreso en JSON (localStorage + `progress.json` opcional). 4 unidades, 19 mazos, 178 cartas. Modos: Aprender, Practicar, Repaso, Arcade, Simulacro. Gamificación: XP, racha, misiones, medallas.

## Principio de diseño
Dos ejes **independientes**: (1) **qué tan bien enseña** y (2) **plataforma/infra**. Primero mejoramos la experiencia local; el backend va cuando la experiencia esté sólida (no antes: sería motor de F1 en algo que aún se diseña).

---

## Fase A — Mejor experiencia de aprendizaje (local, sin backend)

### A1. Navegación de tópicos (fundacional)
Hoy es "todo una página". Pasar a **vistas/pantallas**: Home → Unidad → Mazo → Sesión. Un router mínimo (hash routing, sin librería). Esto ordena todo lo demás.

### A2. Nuevos métodos de ejercicio
Sumar tipos al motor de sesión (hoy: elegir + escribir):
- **Completar frase** (gap-fill): oración con hueco, se completa la palabra/frase.
- **Armar frase** (word bank): palabras desordenadas que se ordenan.
- **Unir significados** (match): columna EN ↔ columna ES.

### A3. Modo conversación
Diálogos guiados tipo examen oral: el juego da un turno, vos respondés (elegir o escribir), feedback. Base: los `speaking-papers` y frases. Más adelante, voz.

### A4. PWA (instalable en el celu, offline)
`manifest.json` + service worker. Se "instala" como app, anda sin internet. Independiente del backend.

---

## Fase B — Sistema robusto (backend + cuentas + sync)

### Objetivo
Que tu progreso te siga entre PC y celu, con cuenta propia.

### Stack recomendado: **Supabase**
- Postgres administrado + **Auth** (email/Google) + cliente JS. **Free tier** generoso (alcanza de sobra para uso personal).
- Mínimo código de backend (no hay que mantener un servidor propio).
- Alternativas: Firebase (similar, NoSQL) · backend propio Node+Postgres (más control, más laburo). Recomiendo Supabase por costo/esfuerzo.

### Cómo encaja con lo que ya hay
El módulo **`Store`** ya está aislado justo para esto. Se agrega un `SupabaseStore` que sincroniza el **mismo JSON de estado**. Estrategia **offline-first**: localStorage sigue siendo el cache rápido; al loguear hace *pull*, y los cambios hacen *push* con debounce.

### Modelo de datos (inicial, simple)
- `auth.users` (lo maneja Supabase).
- `progress` (`user_id` PK/FK, `data` jsonb, `updated_at`): una fila por usuario con el JSON de progreso. Simple y suficiente; se normaliza (tabla por carta) más adelante si hace falta analítica.

### Sync y conflictos
- Last-write-wins por `updated_at` al inicio (un solo usuario, bajo riesgo).
- Merge por carta (max box / max seen) como mejora futura si usás 2 equipos a la vez.

### Hosting
- Front: Netlify/Vercel/GitHub Pages (estático, gratis).
- Datos/Auth: Supabase (gratis).

---

## Secuencia propuesta
1. **A1** Navegación (fundacional) →
2. **A2** Métodos de ejercicio →
3. **A3** Conversación →
4. **A4** PWA →
5. **B** Backend Supabase (cuentas + sync).

> El backend se diseña ahora (este documento) y se implementa al final de la Fase A, cuando la experiencia esté sólida.

## Riesgos / decisiones abiertas
- Confirmar stack de backend (Supabase recomendado).
- Confirmar la secuencia (o reordenar).
- Costo: todo el plan entra en free tiers; el único gasto posible sería una API de voz neural (otra iteración).
