// productsData.js - Official Football Store Catalog (Assignment 5)
// 100% Exact 1:1 Matching Studio Product Photography (Zero Mismatched or Duplicate Images)
// Exactly 54 Unique Football Products, each with its own dedicated studio photo

export const GST_RATE = 0.18; // 18% GST (9% CGST + 9% SGST)

export const VALID_COUPONS = {
  FOOTBALL20: {
    code: 'FOOTBALL20',
    discountPercent: 20,
    desc: '20% off football boots, balls & match kits'
  },
  STRIKER15: {
    code: 'STRIKER15',
    discountPercent: 15,
    desc: '15% off official football gear'
  },
  REACT20: {
    code: 'REACT20',
    discountPercent: 20,
    desc: '20% student & developer discount'
  },
  GOAL10: {
    code: 'GOAL10',
    discountPercent: 10,
    desc: '10% instant checkout discount'
  }
};

export const CATEGORIES = [
  'All',
  'Boots',
  'Match Balls',
  'Jerseys & Kits',
  'Goalkeeper',
  'Protection',
  'Training Gear',
  'Accessories'
];

export const PRODUCTS = [
  // ==========================================
  // BOOTS & FOOTWEAR (12 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-boot-01",
    name: "Apex Mercurial Pro FG Firm Ground Cleats (Cyan Blue)",
    price: 8999,
    category: "Boots",
    image: "/images/boot_mercurial.jpg",
    description: "Elite firm-ground football boots with responsive speed plate, metallic cyan micro-textured synthetic strike zone, and dynamic collar support for explosive acceleration."
  },
  {
    id: "fb-boot-02",
    name: "Adidas Predator Elite FG Football Boots (Demonskin)",
    price: 10499,
    category: "Boots",
    image: "/images/boot_predator.jpg",
    description: "Iconic matte black and bold red Demonskin rubber strike fins with white triple stripes for venomous swerve and pinpoint shooting precision."
  },
  {
    id: "fb-boot-03",
    name: "Puma Future 7 Ultimate FG/AG (Electric Orange)",
    price: 9499,
    category: "Boots",
    image: "/images/boot_puma.jpg",
    description: "FUZIONFIT360 dual mesh upper in vibrant electric orange and cyan blue with PWRTAPE adaptive support for 360-degree agility and lockdown."
  },
  {
    id: "fb-boot-04",
    name: "Striker HyperTurf Multi-Stud Football Turf Shoes (Neon Lime)",
    price: 3499,
    category: "Boots",
    image: "/images/boot_turf.jpg",
    description: "Neon lime synthetic leather turf shoes with low-profile conical multi-studs, engineered for artificial 5-a-side and 7-a-side turf pitches."
  },
  {
    id: "fb-boot-05",
    name: "Adidas Classic Leather Indoor Futsal Court Shoes (Gum Sole)",
    price: 5999,
    category: "Boots",
    image: "/images/boot_futsal.jpg",
    description: "Legendary full-grain black leather indoor boots with non-marking gum rubber flat outsole for supreme low-profile futsal court control."
  },
  {
    id: "fb-boot-06",
    name: "Nike Mercurial Superfly CR7 Gold Trophy Edition FG",
    price: 11999,
    category: "Boots",
    image: "/images/boot_gold.jpg",
    description: "Limited edition metallic gold and black firm-ground boots with Flyknit dynamic fit collar, chrome soleplate, and high-speed chevron studs."
  },
  {
    id: "fb-boot-07",
    name: "Nike Phantom GX Elite FG (Electric Purple & Hot Pink)",
    price: 11499,
    category: "Boots",
    image: "/images/boot_phantom_purple.jpg",
    description: "Precision engineered football cleats with revolutionary Gripknit strike zone in electric purple and hot pink, iridescent chrome soleplate, and conical agility studs."
  },
  {
    id: "fb-boot-08",
    name: "Adidas Copa Mundial Classic Leather FG Boots (Fold Tongue)",
    price: 7999,
    category: "Boots",
    image: "/images/boot_copa_leather.jpg",
    description: "Timeless full-grain black kangaroo leather football boots with iconic fold-over tongue, white triple side stripes, fine vamp stitching, and traditional molded round studs."
  },
  {
    id: "fb-boot-09",
    name: "Mizuno Morelia Neo IV Japan Edition (Pearl White & Ruby Red)",
    price: 12999,
    category: "Boots",
    image: "/images/boot_mizuno_white.jpg",
    description: "Handcrafted in Japan from the finest ultra-thin Scotchguard kangaroo leather, featuring pearl white finish, deep ruby red Runbird logos, and chrome-tipped conical studs."
  },
  {
    id: "fb-boot-10",
    name: "Nike Tiempo Legend 10 Elite FG (Emerald Green & Chrome)",
    price: 10999,
    category: "Boots",
    image: "/images/boot_tiempo_emerald.jpg",
    description: "Engineered FlyTouch Plus synthetic leather in striking deep emerald green with metallic chrome silver swoosh, micro-dot touch pods, and ultra-lightweight traction plate."
  },
  {
    id: "fb-boot-11",
    name: "Stealth Blackout Carbon Pro FG Prototype Football Boots",
    price: 9999,
    category: "Boots",
    image: "/images/boot_blackout_stealth.jpg",
    description: "Triple blackout prototype match boots in textured matte carbon composite, lightweight chevron sprint chassis, and zero-distraction stealth blackout aesthetics."
  },
  {
    id: "fb-boot-12",
    name: "Solar Speed Chrome Silver & Flame Red Matchday Cleats",
    price: 8799,
    category: "Boots",
    image: "/images/boot_speed_silver.jpg",
    description: "Reflective metallic chrome silver aerodynamic speed cleats with solar flame red side graphics, mirror-finish sprint plate, and bladed traction studs for rapid breakaways."
  },

  // ==========================================
  // MATCH BALLS (7 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-ball-01",
    name: "Apex Fusion Match FIFA Pro Official Match Ball",
    price: 2499,
    category: "Match Balls",
    image: "/images/ball_pro.jpg",
    description: "Official 12-panel thermally bonded match football certified for FIFA tournament play with micro-grooves for aerodynamic flight and zero water absorption."
  },
  {
    id: "fb-ball-02",
    name: "Aurum All-Weather Rubber Training Football (Size 5)",
    price: 749,
    category: "Match Balls",
    image: "/images/ball_training.jpg",
    description: "Durable textured rubber molded football with reinforced butyl bladder, built tough for gravel, grass, and Indian outdoor monsoon grounds."
  },
  {
    id: "fb-ball-03",
    name: "Official UEFA Champions League Finale Star Match Ball",
    price: 3499,
    category: "Match Balls",
    image: "/images/ball_ucl.jpg",
    description: "Official UEFA Champions League match ball with iconic thermally bonded star panels, textured polyurethane casing, and FIFA Quality Pro certification."
  },
  {
    id: "fb-ball-04",
    name: "Official Premier League Flight Match Ball (FIFA Quality Pro)",
    price: 3699,
    category: "Match Balls",
    image: "/images/ball_premier_league.jpg",
    description: "Official Premier League stadium match football featuring Aerowsculpt molded grooves, crimson geometric speed panels, and gold FIFA Quality Pro seal."
  },
  {
    id: "fb-ball-05",
    name: "Official Premier League Winter Hi-Vis Match Football",
    price: 3799,
    category: "Match Balls",
    image: "/images/ball_winter_yellow.jpg",
    description: "High-visibility fluorescent neon yellow and deep purple official winter match ball, designed for maximum tracking under stadium floodlights and rain."
  },
  {
    id: "fb-ball-06",
    name: "Vintage 1970s Classic 32-Panel Leather Football (Tango Edition)",
    price: 1899,
    category: "Match Balls",
    image: "/images/ball_classic_retro.jpg",
    description: "Timeless retro 32-panel black pentagon and white hexagon genuine leather football with hand-stitched seams and vintage French tournament markings."
  },
  {
    id: "fb-ball-07",
    name: "Official FIFA World Cup Pro Speedshell Tournament Match Ball",
    price: 3999,
    category: "Match Balls",
    image: "/images/ball_world_cup.jpg",
    description: "Official World Cup tournament ball with pearlescent iridescent Speedshell surface, vibrant holographic gradient speed lines, and gold World Cup crest."
  },

  // ==========================================
  // JERSEYS & MATCH KITS (13 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-kit-01",
    name: "Real Madrid CF Official Home White & Gold Match Jersey",
    price: 2499,
    category: "Jerseys & Kits",
    image: "/images/jersey_realmadrid.jpg",
    description: "Official royal white European powerhouse jersey featuring metallic gold shoulder stripes, club crest, Emirates sponsor, and Heat.RDY cooling fabric."
  },
  {
    id: "fb-kit-02",
    name: "FC Barcelona Official Home Blaugrana Match Jersey",
    price: 2499,
    category: "Jerseys & Kits",
    image: "/images/jersey_barcelona.jpg",
    description: "Iconic vertical striped jersey in deep navy blue and rich maroon garnet red, official Spotify sponsor, club crest, and DRI-FIT ADV knit."
  },
  {
    id: "fb-kit-03",
    name: "Argentina 3-Star World Champions Match Kit (Albiceleste)",
    price: 2699,
    category: "Jerseys & Kits",
    image: "/images/jersey_argentina.jpg",
    description: "Commemorative 3-gold-star sky blue and white vertical stripes jersey featuring the official AFA crest and FIFA World Champions gold chest shield."
  },
  {
    id: "fb-kit-04",
    name: "Brazil National Team Samba Canary Yellow Match Jersey (#10)",
    price: 2499,
    category: "Jerseys & Kits",
    image: "/images/jersey_yellow.jpg",
    description: "Vibrant canary yellow jersey with pine green collar and sleeve trim, five-star CBF crest, and iconic #10 styling in breathable micro-mesh."
  },
  {
    id: "fb-kit-05",
    name: "Athletech United Crimson Red Official Match Jersey",
    price: 2299,
    category: "Jerseys & Kits",
    image: "/images/jersey_red.jpg",
    description: "Official crimson red match jersey with white ribbed crew collar and sleeve cuffs, lion crest, and sweat-absorbing AEROREADY performance knit."
  },
  {
    id: "fb-kit-06",
    name: "Blue Tigers Authentic Home Royal Blue Match Kit",
    price: 1999,
    category: "Jerseys & Kits",
    image: "/images/jersey_blue.jpg",
    description: "National team royal blue dry-fit match jersey kit with breathable mesh flank panels, tailored athlete fit, and anti-odor moisture control."
  },
  {
    id: "fb-kit-07",
    name: "AeroStripe White & Gold European Edition Match Jersey",
    price: 1899,
    category: "Jerseys & Kits",
    image: "/images/jersey_white.jpg",
    description: "Premium white match kit with metallic gold accents, laser-cut ventilation eyelets, and lightweight aerodynamic fabric for top performance."
  },
  {
    id: "fb-kit-08",
    name: "Stealth Black & Metallic Gold Match Kit Jersey",
    price: 2399,
    category: "Jerseys & Kits",
    image: "/images/jersey_black_gold.jpg",
    description: "Sleek matte black football jersey featuring geometric weave texture, metallic gold sponsor detailing, and high-performance breathable mesh."
  },
  {
    id: "fb-kit-09",
    name: "Manchester City FC Official Sky Blue Match Jersey",
    price: 2599,
    category: "Jerseys & Kits",
    image: "/images/jersey_mancity.jpg",
    description: "Authentic Etihad sky blue home jersey with navy trim, club crest, and ultra-breathable sweat-wicking dry-cell fabric."
  },
  {
    id: "fb-kit-10",
    name: "Arsenal FC Official Home Scarlet Red & White Sleeves Match Jersey",
    price: 2599,
    category: "Jerseys & Kits",
    image: "/images/jersey_arsenal.jpg",
    description: "Official Arsenal FC home jersey with vibrant scarlet red body, clean pure white sleeves, gold trim accents, and official club cannon crest."
  },
  {
    id: "fb-kit-11",
    name: "Inter Milan FC Official Home Nerazzurri Black & Blue Match Jersey",
    price: 2499,
    category: "Jerseys & Kits",
    image: "/images/jersey_inter_milan.jpg",
    description: "Iconic Nerazzurri black and royal blue vertical stripes match jersey with golden Pirelli center sponsor, club crest, and athletic v-neck."
  },
  {
    id: "fb-kit-12",
    name: "Juventus FC Official Home Black & White Zebra Stripes Match Jersey",
    price: 2499,
    category: "Jerseys & Kits",
    image: "/images/jersey_juventus.jpg",
    description: "Iconic Turin black and white vertical zebra stripes jersey featuring Jeep center sponsor, three gold stars over club crest, and ribbed collar."
  },
  {
    id: "fb-kit-13",
    name: "Portugal National Team Official Home Crimson & Green Match Jersey",
    price: 2699,
    category: "Jerseys & Kits",
    image: "/images/jersey_portugal.jpg",
    description: "Official Portuguese national team kit in rich crimson red with dark forest green diagonal sash design, gold federation cross crest, and athletic sleeve cuffs."
  },

  // ==========================================
  // GOALKEEPER (4 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-gk-01",
    name: "Vortex Pro Grip Negative-Cut Goalkeeper Gloves",
    price: 3299,
    category: "Goalkeeper",
    image: "/images/gk_gloves.jpg",
    description: "4mm German Contact latex palm with negative-cut tailoring, punch-zone silicone ribs, and double-wrap wrist strap for superior catch security in wet or dry conditions."
  },
  {
    id: "fb-gk-02",
    name: "MegaGrip Latex Formula Goalkeeper Glove Spray Bottle (250ml)",
    price: 1299,
    category: "Goalkeeper",
    image: "/images/glove_spray.jpg",
    description: "Specialized matte black spray bottle formulated with MegaGrip latex polymers to revive tacky grip on match gloves in wet or dry match conditions."
  },
  {
    id: "fb-gk-03",
    name: "GK Pro Ergonomic Padded Goalkeeper Match Diving Pants",
    price: 1999,
    category: "Goalkeeper",
    image: "/images/gk_padded_pants.jpg",
    description: "Heavy-duty impact protection goalkeeper pants featuring dual-density EVA hip and knee padding, stirrup foot cuffs, and abrasion-resistant polyester."
  },
  {
    id: "fb-gk-04",
    name: "ProGK Fluorescent Neon Green Padded Goalkeeper Match Jersey",
    price: 2299,
    category: "Goalkeeper",
    image: "/images/gk_jersey_green.jpg",
    description: "Long-sleeve fluorescent neon green goalkeeper jersey featuring padded protective elbows, geometric tribal sleeve graphics, and athletic stretch knit."
  },

  // ==========================================
  // PROTECTION (3 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-prot-01",
    name: "AeroShield Pro Carbon Fiber Protective Shin Guards",
    price: 1499,
    category: "Protection",
    image: "/images/shin_guards.jpg",
    description: "Ultra-lightweight real carbon fiber protective shell with shock-absorbing EVA foam backing and anatomical left/right contour for elite match protection."
  },
  {
    id: "fb-prot-02",
    name: "ProShield Compression Football Calf Shin Sleeves (Pair)",
    price: 899,
    category: "Protection",
    image: "/images/calf_sleeves.jpg",
    description: "Pair of 20-30 mmHg graduated compression calf sleeves in sleek matte black with honeycomb ventilation weave, boosting circulation and reducing calf cramps."
  },
  {
    id: "fb-prot-03",
    name: "AeroLock Neoprene Criss-Cross Ankle Support Brace",
    price: 799,
    category: "Protection",
    image: "/images/ankle_brace.jpg",
    description: "High-grade breathable black neoprene ankle brace with adjustable criss-cross figure-eight elastic compression straps for medial and lateral ligament stability."
  },

  // ==========================================
  // TRAINING GEAR (6 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-train-01",
    name: "ProSpeed Neon Agility Saucer Cones (Stack of 40 on Stand)",
    price: 1199,
    category: "Training Gear",
    image: "/images/training_cones.jpg",
    description: "Stack of pliable fluorescent neon orange, yellow, and blue marker saucer cones on heavy-duty metal carry stand wire holder for footwork drills."
  },
  {
    id: "fb-train-02",
    name: "ProSpeed Football Agility & Speed Training Set",
    price: 2199,
    category: "Training Gear",
    image: "/images/agility_set.jpg",
    description: "Complete pre-season football kit: 6m speed ladder, 10 saucer cones, 4 adjustable mini hurdles, and heavy-duty carry strap for agility footwork."
  },
  {
    id: "fb-train-03",
    name: "Tactical Magnetic Football Coach Whiteboard with Pins & Whistle",
    price: 1499,
    category: "Training Gear",
    image: "/images/tactical_board.jpg",
    description: "Green pitch diagram whiteboard with red and blue magnetic player markers, dry-erase marker, clip, and referee whistle for team formation coaching."
  },
  {
    id: "fb-train-04",
    name: "PhysioPro High-Density Trigger-Point Foam Roller (45cm)",
    price: 899,
    category: "Training Gear",
    image: "/images/foam_roller.jpg",
    description: "Textured high-density black and blue cylindrical myofascial trigger-point grid foam roller to relieve hamstring and calf tightness post-match."
  },
  {
    id: "fb-train-05",
    name: "ProSpeed 56-inch Sprint Resistance Training Parachute",
    price: 999,
    category: "Training Gear",
    image: "/images/speed_parachute.jpg",
    description: "Heavy-duty 56-inch sprint chute with 360-degree rotating quick-release harness buckle, providing 25-35 lbs of progressive speed resistance."
  },
  {
    id: "fb-train-06",
    name: "Velocity Sport Portable Football Passing Rebounder Net",
    price: 3899,
    category: "Training Gear",
    image: "/images/training_rebounder.jpg",
    description: "Black powder-coated steel frame rebounder net with high-tension all-weather bungee cords and center yellow target bullseye for ground and volley passing drills."
  },

  // ==========================================
  // ACCESSORIES (9 Products - 100% Unique Images)
  // ==========================================
  {
    id: "fb-acc-01",
    name: "StrikerHex Anti-Slip Athletic Grip Socks (3-Pack White)",
    price: 799,
    category: "Accessories",
    image: "/images/grip_socks.jpg",
    description: "Professional silicone grip pads on sole eliminate foot slippage inside boots, preventing blisters and improving explosive directional cuts."
  },
  {
    id: "fb-acc-02",
    name: "Dual-Action High Pressure Ball Pump with Pressure Gauge",
    price: 599,
    category: "Accessories",
    image: "/images/ball_pump.jpg",
    description: "Rapid dual-stroke football inflator with built-in PSI/bar pressure dial, flexible extension hose, and 3 spare brass inflation needles."
  },
  {
    id: "fb-acc-03",
    name: "Velocity FC Ventilated Cleats & Gear Travel Bag",
    price: 1199,
    category: "Accessories",
    image: "/images/cleats_bag.jpg",
    description: "Water-resistant ballistic nylon boot bag with breathable mesh side ventilation, separate shin guard compartment, and padded carry handle."
  },
  {
    id: "fb-acc-04",
    name: "Titan Professional Boot Stud Wrench & 12 Aluminium Studs",
    price: 499,
    category: "Accessories",
    image: "/images/stud_wrench.jpg",
    description: "Sleek chrome triangular stud spanner key wrench complete with 12 replacement screw-in aluminium studs for soft ground football boots."
  },
  {
    id: "fb-acc-05",
    name: "Official Match Referee Kit (Yellow & Red Cards, Chrome Whistle)",
    price: 899,
    category: "Accessories",
    image: "/images/referee_kit.jpg",
    description: "Official football referee black leather wallet with fluorescent yellow/red cards, score sheet, and shiny chrome pealess whistle on lanyard."
  },
  {
    id: "fb-acc-06",
    name: "Fluorescent Neon Yellow Elastic Football Captain Armband",
    price: 299,
    category: "Accessories",
    image: "/images/captain_armband.jpg",
    description: "High-stretch elasticated captain armband with bold black 'C' print, anti-slip secure velcro closure, and high-visibility neon yellow finish."
  },
  {
    id: "fb-acc-07",
    name: "HydraPro 1-Litre Ergonomic Football Match Squeeze Bottle",
    price: 449,
    category: "Accessories",
    image: "/images/water_bottle.jpg",
    description: "Matte black BPA-free 1000ml sports squeeze bottle featuring grooved ergonomic finger grips, leakproof push-pull nozzle, and measurement markings."
  },
  {
    id: "fb-acc-08",
    name: "FreeKick Vanishing Referee Foam Spray (200ml) with Holster",
    price: 699,
    category: "Accessories",
    image: "/images/referee_spray.jpg",
    description: "Official match-grade aerosol vanishing spray foam for marking free-kick 10-yard wall lines, featuring quick clip-on waistband holder."
  },
  {
    id: "fb-acc-09",
    name: "ProMatch Spring-Loaded Football Corner Flags (Set of 4)",
    price: 2199,
    category: "Accessories",
    image: "/images/corner_flags.jpg",
    description: "Set of 4 regulation red and yellow checkered corner flags with durable white PVC poles and heavy-duty spring-loaded steel ground turf spikes."
  }
];
