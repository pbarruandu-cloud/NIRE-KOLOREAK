export type { SvgDrawing, DrawingCategory } from "./types";

// ── Animaliak ──
export { fishDrawing }       from "./fish";
export { dinosaurDrawing }   from "./dinosaur";
export { catDrawing }        from "./cat";
export { rabbitDrawing }     from "./rabbit";
export { elephantDrawing }   from "./elephant";
export { owlDrawing }        from "./owl";
export { tigerDrawing }      from "./tiger";
export { wolfDrawing }       from "./wolf";
export { trexDrawing }       from "./trex";

// ── Natura ──
export { sunDrawing }        from "./sun";
export { flowerDrawing }     from "./flower";
export { treeDrawing }       from "./tree";
export { butterflyDrawing }  from "./butterfly";
export { mushroomDrawing }   from "./mushroom";

// ── Ibilgailuak ──
export { carDrawing }        from "./car";
export { rocketDrawing }     from "./rocket";
export { airplaneDrawing }   from "./airplane";
export { boatDrawing }       from "./boat";
export { racingCarDrawing }  from "./racingCar";

// ── Fantasia ──
export { houseDrawing }      from "./house";
export { unicornDrawing }    from "./unicorn";
export { dragonDrawing }     from "./dragon";
export { castleDrawing }     from "./castle";
export { wizardDrawing }     from "./wizard";

// ── Superheroiak ──
export { superheroDrawing }  from "./superhero";
export { robotDrawing }      from "./robot";

// ── Abenturak ──
export { ninjaDrawing }      from "./ninja";
export { spaceshipDrawing }  from "./spaceship";

import { fishDrawing }       from "./fish";
import { dinosaurDrawing }   from "./dinosaur";
import { catDrawing }        from "./cat";
import { rabbitDrawing }     from "./rabbit";
import { elephantDrawing }   from "./elephant";
import { owlDrawing }        from "./owl";
import { tigerDrawing }      from "./tiger";
import { wolfDrawing }       from "./wolf";
import { trexDrawing }       from "./trex";
import { sunDrawing }        from "./sun";
import { flowerDrawing }     from "./flower";
import { treeDrawing }       from "./tree";
import { butterflyDrawing }  from "./butterfly";
import { mushroomDrawing }   from "./mushroom";
import { carDrawing }        from "./car";
import { rocketDrawing }     from "./rocket";
import { airplaneDrawing }   from "./airplane";
import { boatDrawing }       from "./boat";
import { racingCarDrawing }  from "./racingCar";
import { houseDrawing }      from "./house";
import { unicornDrawing }    from "./unicorn";
import { dragonDrawing }     from "./dragon";
import { castleDrawing }     from "./castle";
import { wizardDrawing }     from "./wizard";
import { superheroDrawing }  from "./superhero";
import { robotDrawing }      from "./robot";
import { ninjaDrawing }      from "./ninja";
import { spaceshipDrawing }  from "./spaceship";

/**
 * All available coloring drawings.
 * To add a drawing: create a file in this folder, set its category,
 * export + import it here, and add it to this array.
 */
export const allDrawings = [
  // Animaliak
  fishDrawing,
  catDrawing,
  elephantDrawing,
  rabbitDrawing,
  owlDrawing,
  dinosaurDrawing,
  tigerDrawing,
  wolfDrawing,
  trexDrawing,
  // Natura
  sunDrawing,
  flowerDrawing,
  treeDrawing,
  butterflyDrawing,
  mushroomDrawing,
  // Ibilgailuak
  carDrawing,
  racingCarDrawing,
  rocketDrawing,
  airplaneDrawing,
  boatDrawing,
  // Fantasia
  dragonDrawing,
  castleDrawing,
  unicornDrawing,
  wizardDrawing,
  houseDrawing,
  // Superheroiak
  superheroDrawing,
  robotDrawing,
  // Abenturak
  ninjaDrawing,
  spaceshipDrawing,
];
