# Packages Sort function
This project contains a function for one of robotic arms that will dispatch the packages to the correct stack according to their volume and mass.

JS module with function `sort(width, height, length, mass)` is in readu for use state by this location `src\main.js`

### Rules

Sorts the packages using the following criteria:

- A package is **bulky** if its volume (Width x Height x Length) is greater than or equal to 1,000,000 cm³ or when one of its dimensions is greater or equal to 150 cm.
- A package is **heavy** when its mass is greater or equal to 20 kg.

Function must dispatch the packages in the following stacks:

- **STANDARD**: standard packages (those that are not bulky or heavy) can be handled normally.
- **SPECIAL**: packages that are either heavy or bulky can't be handled automatically.
- **REJECTED**: packages that are **both** heavy and bulky are rejected. 

## Run program
`npm run exec {width} {height} {length} {mass}`

## Run tests
`npm test`

## Implementation details
* Project implemented with no packages on pure NodeJS focusing on MVP. This also means easy migration to any choosen technology in future
* Arguments with zero values handling requires requirements clarifications