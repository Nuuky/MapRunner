# MapRunner

<img src="https://github.com/user-attachments/assets/06fee654-e297-4821-b306-6ade155bba6f" alt="maprunner" style="max-width:1000px;display: block; margin: 0 auto"/>

This small game is entirely hand-coded using JavaScript and includes a built-in map editor for easy customization.

## Codesandbox
You can try a modifyed version live on [codesandbox](https://codesandbox.io/p/sandbox/inspiring-tamas-4nfgrs) ! 

## Controls

- **Jump:**     `W | ArrowUp | Space`
- **Left:**     `A | ArrowLeft`
- **Crouch:**   `S | ArrowDown | LShift`
- **Right:**    `D | ArrowRight`
- **Restart:**  `R`
- **Menu:**     `Escape`

## Tips
You can do a second jump after using a BouncingBox -- It's not a bug, it's a feature ;) ;)

It is possible to slide if you take some speed before crouching.

## Installation
This project has been around for a while, so I've created a Dockerfile to streamline the setup with Node:8.

Build the image:
```
docker build -t maprunner .
```

Start the container:
> I'm binding the maps.json file to keep new maps
```
docker run -it --rm --mount type=bind,source=$pwd/app/maps.json,target=/app/maps.json -p 3000:3000 maprunner  
```