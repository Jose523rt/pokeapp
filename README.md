# PokeApp

Aplicación de Pokémon desarrollada con React Native

## Características
- En desarrollo

## Instalación
1. Utiliza el comando `git clone https://github.com/Jose523rt/pokeapp.git` en una carpeta para descargar el proyecto.
2. Entrar a la carpeta pokeapp.
3. Escribir el siguiente comando en la terminal: `npm install`.
4. Utilizar el comando `git pull origin main` para descargar los cambios antes de comenzar a programar.

## Subir Cambios
1. Usa el comando `git status` para comprobar los cambios.
2. Usa el comando `git add .` para agregar los cambios.
3. Usa el comando `git commit -m "DESCRIPCIÓN"` para hacer un commit y una descripción de las adiciones o cambios.
4. Usa el comando `git push origin main` para subir los cambios al repositorio.
### NOTA
La primera vez que se quiera subir un cambio al repositorio debe usarse el comando
`git push -u origin main`


## Reportes de Commits

### 27 de Marzo de 2026
Se creo el proyecto y se agregó a GitHub

### 12 de Abril 5:04
Se empezó SearchScreens.js, que permite al usuario buscar el pokemon que quiera.
Se creó PokeInfo.js y se stackeó con SearchScreen.js, así al clickear el pokemon se irá directamente a la pantalla de información de este.
Pendientes - Mostrar tipos de Pokemon en ambas pantallas (complicado), incluir botón de "Agregar al equipo" en PokeInfo, hacer el context para los integrantes del equipo, expandir los styesheets

- Se implementó la petición a la API en la pantalla BattlerScreen
Pendientes - Mostrar tipos de Pokemon en ambas pantallas (complicado), incluir botón de "Agregar al equipo" en PokeInfo, hacer el context para los integrantes del equipo, .expandir los styesheets.

- Se agregó el botón "Agregar al equipo" y es completamente funcional
### 12 de Abril 6:52
Se agregó el context file Team.

### 13 de Abril
- Se agrego la función de selección de equipo en la pantalla "BattlerScreen".
- Se agrego la lógica detrás del funcionamiento de la batalla.
- Se agregaron los modales para las situaciones de victoria y derrota.

Se terminaron TypeSearch y TypeTable, se creo BattleStack para habilitar la navegacion entre los stacks de la Battle Screen.
El proyecto esta listo para mandar al styler.

#### Funciones añadidas en BattlerScreen
- El enemigo ahora cambian al ser derrotados.
- El enemigo puede cambiarse al presionarlo.
- Se agregó un evento de empate al Battler.

#### Funciones añadidas en PokeInfo
- Ahora se muestra una alerta al tener lleno el equipo

#### Funciones en TeamScreen
- Se mejoró la creación de cards mediante el uso de la propiedad .map()
- Se implementaron botones para eliminar la pokemon del equipo en las cards (Aún no son funcioales)

  ### 14 de Abri
  - Se modificarion estilos en la pantalla BattlerScreen para centrar los contenidos
  - Se modifico la opacidad de un modal en la pantalla PokeInfo
  - Ahora las estadísticas son visibles en la pantalla de Battler
  - Se ocultó el botón de Eliminar pokemon del equipo
