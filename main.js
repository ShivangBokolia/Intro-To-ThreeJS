import { basic_cube } from "./js/basic_cube";
import { controls_and_options } from "./js/controls_and_options";
import { movement } from "./js/movement";

const button1 = document.getElementById("opt_1");
const button2 = document.getElementById("opt_2");
const button3 = document.getElementById("opt_3");

button1.addEventListener("click", basic_cube);
button2.addEventListener("click", controls_and_options);
button3.addEventListener("click", movement);
