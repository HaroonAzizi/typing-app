// utils/textUtils.js

// Sample paragraphs to type
// Sample paragraphs to type
const paragraphs = [
  "apple banana cherry dog elephant fish grape house igloo jelly kite lemon mango notebook orange parrot queen rabbit snake tiger umbrella violin whale xylophone yellow zebra.",
  "blue cat door egg flower garden happy ice jump kangaroo lamp moon nest open pencil quiet rainbow sun tree under van window x-ray yogurt zoo.",
  "air ball cake dance easy frog gift hat idea joy kind leaf music nice ocean pink quick road smile train unique voice water xylophone young zebra.",
  "ant box cup drum echo fire gold hill island joy kite light mother north oak purple question river silver table unicorn visit windy xerox yummy zest.",
  "boat chair dream eager feather green hero insect jug knife ladder mountain number oven picture quiet rose sugar telephone universe vacation winter xylophone yesterday zookeeper.",
  "carpet delicious engine festival gentle honey iron jungle koala laptop marble necklace onion pancake quill radio sandwich trumpet uniform valley wonderful x-ray yellow zigzag.",
  "artist bakery castle dolphin elephant forest garden holiday insect journal kingdom lantern melody necklace octopus passport quiver rainbow sunshine treasure universe victory wizard xylophone yummy zebra.",
  "bridge circus dragon emperor fantasy glacier horizon iceberg journey kingdom lighthouse meadow notebook orchestra planet quest riddle sunset tornado umbrella voyage waterfall xylophone youthful zestful.",
  "astronaut bicycle chocolate dinosaur envelope festival galaxy harmony island joyful kindness landscape melody necklace orchestra paradise question romance symphony treasure universe volcano wonderland xylophone yesterday zebra.",
  "adventure butterfly chocolate discovery elephant friendship galaxy happiness imagination joyful kindness laughter mountain nature ocean paradise question rainbow sunshine telescope universe vacation waterfall xylophone youthful zephyr.",
  "acorn balloon champion delight energy freedom gratitude harmony interest jungle kindness laughter melody night owl peanut quality rainbow sparkle thunder uplift vibrant wonderful xylophone youthful zebra.",
  "alphabet blossom coconut dolphin echo fountain grateful horizon imagine joyful kindness laughter melody nectar optimism peaceful quiet retreat sparkle treasure unicorn vacation wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "adventure brilliant chocolate delightful exciting fantastic glowing holiday imagination joyful kindness laughter melody nectar optimism peaceful question rainbow sunshine treasure unique vibrant wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "beach coconut dragonfire emerald feather gemstone harmony imagination joyful kite lighthouse mountain necklace oasis peaceful quiet rainbow starlight treasure universe vacation waterfall xylophone youthful zestful.",
  "dandelion enchantment fantasy giggle happiness ice cream joyful kindness laughter melody night ocean paradise quest romance starlight treasure umbrella vacation wonderful xylophone youthful zephyr.",
  "aurora butterfly chocolate discovery echo firefly garden happiness island joyful kindness laughter melody nature optimism peaceful quest rainbow sunshine twinkle universe vacation wonderful xylophone youthful zest.",
  "adventure blissful carnival delightful enchantment fantasy glowing harmony imagination joyful kindness laughter melody night ocean paradise question rainbow sparkle treasure universe vacation wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "storybook adventure balloon circus delightful emerald fantastic glowing holiday inspiration joyful kindness laughter melody night ocean paradise quiver rainbow sparkle treasure universe vacation wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "bridge carousel dolphin echo firefly garden harmony ice cream joyful kite lighthouse mountain necklace oasis peaceful quiet rainbow starlight treasure umbrella vacation waterfall xylophone youthful zestful.",
  "dandelion enchantment fantasy giggle happiness ice cream joyful kindness laughter melody night ocean paradise quest romance starlight treasure umbrella vacation wonderful xylophone youthful zephyr.",
  "aurora butterfly chocolate discovery echo firefly garden happiness island joyful kindness laughter melody nature optimism peaceful quest rainbow sunshine twinkle universe vacation wonderful xylophone youthful zest.",
  "adventure blissful carnival delightful enchantment fantasy glowing harmony imagination joyful kindness laughter melody night ocean paradise question rainbow sparkle treasure universe vacation wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "storybook adventure balloon circus delightful emerald fantastic glowing holiday inspiration joyful kindness laughter melody night ocean paradise quiver rainbow sparkle treasure universe vacation wonderful xylophone youthful zest.",
  "butterfly cupcake daisy elephant fantasy giggle happiness ice cream journey kangaroo lemonade moonlight nectar optimism picnic quiver rainbow sunshine tulip umbrella vacation wonderful xylophone youthful zest.",
  "bridge carousel dolphin echo firefly garden harmony ice cream joyful kite lighthouse mountain necklace oasis peaceful quiet rainbow starlight treasure umbrella vacation waterfall xylophone youthful zestful.",
];

// Function to get a random paragraph
export const getRandomText = () => {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
};
