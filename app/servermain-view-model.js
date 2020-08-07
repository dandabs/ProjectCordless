const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

function ServerMainViewModel() {
  const viewModel = observableModule.fromObject({
    data: new ObservableArray([
        { heading: "Bulbasaur", content: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger." },
        { heading: "Ivysaur", content: "To support its weight, Ivysaur’s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it’s a sign that the bud will bloom into a large flower soon." },
        { heading: "Venusaur", content: "There is a large flower on Venusaur’s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower’s aroma soothes the emotions of people." },
        { heading: "Charmander", content: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely." },
        { heading: "Charmeleon", content: "Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color." },
        { heading: "Charizard", content: "Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself." },
        { heading: "Squirtle", content: "Squirtle’s shell is not merely used for protection. The shell’s rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds." },
        { heading: "Wartortle", content: "Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages. The scratches on its shell are evidence of this Pokémon’s toughness as a battler." },
        { heading: "Blastoise", content: "Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet." }
      ]),
    items: { name, desc, price, imageSrc} = [
        { name: "Pancakes!", desc: "Everybody* loves gluten.", price: "$5", imageSrc: "https://placem.at/things?w=500&txt=0&random=9" },
        { name: "Bowl of Crap", desc: "Probably something in here. But probably not.", price: "$1", imageSrc: "https://placem.at/things?w=500&txt=0&random=6" },
        { name: "Motorcycle", desc: "It'll be worth the argument with your spouse.", price: "$8899", imageSrc: "https://placem.at/things?w=500&txt=0&random=1" },
        { name: "Air Plant", desc: "It looked cool in the store.", price: "$9", imageSrc: "https://placem.at/things?w=500&txt=0&random=2" },
        { name: "Cuff Links", desc: "You'll need them once in the next ten years.", price: "$59", imageSrc: "https://placem.at/things?w=500&txt=0&random=4" },
        { name: "Skateboard", desc: "Too bad you are too old to use it.", price: "$129", imageSrc: "https://placem.at/things?w=500&txt=0&random=7" },
        { name: "Off-Brand Soda", desc: "Desperate times we live in.", price: "$2", imageSrc: "https://placem.at/things?w=500&txt=0&random=8" },
        { name: "Beer? Liquor?", desc: "Mmmmm drinky.", price: "$7", imageSrc: "https://placem.at/things?w=500&txt=0&random=10" },
        { name: "Pie!", desc: "Also good.", price: "$15", imageSrc: "https://placem.at/things?w=500&txt=0&random=11" }
    ]
  });

  return viewModel;
}

module.exports = ServerMainViewModel;
