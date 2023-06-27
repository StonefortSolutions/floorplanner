const fs = require("fs");

const furnitureNames = [
  "bathroomCabinet",
  "bathroomCabinetDrawer",
  "bathroomMirror",
  "bathroomSink",
  "bathroomSinkSquare",
  "bathtub",
  "bear",
  "bedBunk",
  "bedDouble",
  "bedSingle",
  "bench",
  "benchCushion",
  "benchCushionLow",
  "bookcaseClosed",
  "bookcaseClosedDoors",
  "bookcaseClosedWide",
  "bookcaseOpen",
  "bookcaseOpenLow",
  "books",
  "cabinetBed",
  "cabinetBedDrawer",
  "cabinetBedDrawerTable",
  "cabinetTelevision",
  "cabinetTelevisionDoors",
  "cardboardBoxClosed",
  "cardboardBoxOpen",
  "ceilingFan",
  "chair",
  "chairCushion",
  "chairDesk",
  "chairModernCushion",
  "chairModernFrameCushion",
  "chairRounded",
  "coatRack",
  "coatRackStanding",
  "computerKeyboard",
  "computerMouse",
  "computerScreen",
  "desk",
  "deskCorner",
  "doorway",
  "doorwayFront",
  "doorwayOpen",
  "dryer",
  "floorCorner",
  "floorCornerRound",
  "floorFull",
  "floorHalf",
  "hoodLarge",
  "hoodModern",
  "kitchenBar",
  "kitchenBarEnd",
  "kitchenBlender",
  "kitchenCabinet",
  "kitchenCabinetCornerInner",
  "kitchenCabinetCornerRound",
  "kitchenCabinetDrawer",
  "kitchenCabinetUpper",
  "kitchenCabinetUpperCorner",
  "kitchenCabinetUpperDouble",
  "kitchenCabinetUpperLow",
  "kitchenCoffeeMachine",
  "kitchenFridge",
  "kitchenFridgeBuiltIn",
  "kitchenFridgeLarge",
  "kitchenFridgeSmall",
  "kitchenMicrowave",
  "kitchenSink",
  "kitchenStove",
  "kitchenStoveElectric",
  "lampRoundFloor",
  "lampRoundTable",
  "lampSquareCeiling",
  "lampSquareFloor",
  "lampSquareTable",
  "lampWall",
  "laptop",
  "loungeChair",
  "loungeChairRelax",
  "loungeDesignChair",
  "loungeDesignSofa",
  "loungeDesignSofaCorner",
  "loungeSofa",
  "loungeSofaCorner",
  "loungeSofaLong",
  "loungeSofaOttoman",
  "paneling",
  "pillow",
  "pillowBlue",
  "pillowBlueLong",
  "pillowLong",
  "plantSmall1",
  "plantSmall2",
  "plantSmall3",
  "pottedPlant",
  "radio",
  "rugDoormat",
  "rugRectangle",
  "rugRound",
  "rugRounded",
  "rugSquare",
  "shower",
  "showerRound",
  "sideTable",
  "sideTableDrawers",
  "speaker",
  "speakerSmall",
  "stairs",
  "stairsCorner",
  "stairsOpen",
  "stairsOpenSingle",
  "stoolBar",
  "stoolBarSquare",
  "table",
  "tableCloth",
  "tableCoffee",
  "tableCoffeeGlass",
  "tableCoffeeGlassSquare",
  "tableCoffeeSquare",
  "tableCross",
  "tableCrossCloth",
  "tableGlass",
  "tableRound",
  "televisionAntenna",
  "televisionModern",
  "televisionVintage",
  "toaster",
  "toilet",
  "toiletSquare",
  "trashcan",
  "wall",
  "wallCorner",
  "wallCornerRond",
  "wallDoorway",
  "wallDoorwayWide",
  "wallHalf",
  "wallWindow",
  "wallWindowSlide",
  "washer",
  "washerDryerStacked",
];

const convertFurnitureStringsToObjects = (names) => {
  const furnitureObjects = [];

  names.forEach((name) => {
    const path = name;
    const formattedName = name.replace(/([a-z])([A-Z])/g, "$1 $2");
    const capitalizedWords = formattedName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const category = formattedName.split(" ")[0].toLowerCase();
    const previewImage = `/ItemPictures/${path}_SE.png`;
    const modelPath = `/furniture/${path}.glb`;

    const furnitureObject = {
      path: path,
      name: capitalizedWords,
      category: category,
      previewImage: previewImage,
      modelPath: modelPath,
    };

    furnitureObjects.push(furnitureObject);
  });

  return furnitureObjects;
};

const furnitureObjects = convertFurnitureStringsToObjects(furnitureNames);

const writePath = "./src/client/components/data/furnitureObjects.json";

fs.writeFile(writePath, JSON.stringify(furnitureObjects), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Wrote ${furnitureObjects.length} objects to ${writePath}`);
  }
});
