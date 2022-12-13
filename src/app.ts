import { Fridge } from "./FridgeClass";

window.onload = function () {
  async function getFridgeInfo() {
    const response = await fetch("../dist/php/fridgeData.json");
    const data = await response.json();
    return data;
  }
  getFridgeInfo().then((data) => {
    const fridgeConfig = data[0];

    const fridge = new Fridge(fridgeConfig);
    fridge.createNotes();
    fridge.updateDb();
  });
};
