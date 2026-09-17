export interface Country {
  id: string;
  name: string;
  flag: string;
  continent: string;
  capital: string;
  language: string;
  population: string;
  famousFood: string;
  famousLandmark: string;
  funFact: string;
  mapId: string;
  quizQuestions: { question: string; options: string[]; answer: number }[];
}

export type ExplorationStatus = "not_started" | "in_progress" | "completed";

export interface Exploration {
  countryId: string;
  status: ExplorationStatus;
  progress: number;
  checklist: {
    journalWritten: boolean;
    tagsAdded: boolean;
    factsLearned: boolean;
    photoAdded: boolean;
    quizDone: boolean;
  };
}

export interface JournalEntry {
  id: string;
  countryId: string;
  title: string;
  content: string;
  tags: string[];
  wordCount: number;
  createdAt: string;
}

export const countries: Country[] = [
  // ===== AFRICA (54) =====
  {
    id: "algeria", name: "Algeria", flag: "🇩🇿", continent: "Africa", mapId: "DZ",
    capital: "Algiers", language: "Arabic & French", population: "45 million",
    famousFood: "Couscous", famousLandmark: "Casbah of Algiers",
    funFact: "Algeria is the largest country in Africa!",
    quizQuestions: [
      { question: "What is the capital city of Algeria?", options: ["Algiers", "Tirana", "Monrovia", "Zagreb"], answer: 0 },
      { question: "Which of these foods is famous in Algeria?", options: ["Lavash & Khorovats", "Romazava", "Injera & Doro Wat", "Couscous"], answer: 3 },
      { question: "Which famous landmark can you find in Algeria?", options: ["Taj Mahal", "Great Blue Hole", "Casbah of Algiers", "Christmas Island"], answer: 2 },
    ],
  },
  {
    id: "angola", name: "Angola", flag: "🇦🇴", continent: "Africa", mapId: "AO",
    capital: "Luanda", language: "Portuguese", population: "36 million",
    famousFood: "Muamba de Galinha", famousLandmark: "Kalandula Falls",
    funFact: "Angola has waterfalls almost as tall as Niagara Falls!",
    quizQuestions: [
      { question: "What is the capital city of Angola?", options: ["Luanda", "Kingstown", "Dhaka", "Sri Jayawardenepura Kotte"], answer: 0 },
      { question: "Which of these foods is famous in Angola?", options: ["Mountain Chicken (frog legs)", "Attiéké", "Garudhiya (fish soup)", "Muamba de Galinha"], answer: 3 },
      { question: "Which famous landmark can you find in Angola?", options: ["Niagara Falls", "Kalandula Falls", "Mount Yasur Volcano", "Taj Mahal"], answer: 1 },
    ],
  },
  {
    id: "benin", name: "Benin", flag: "🇧🇯", continent: "Africa", mapId: "BJ",
    capital: "Porto-Novo", language: "French", population: "13 million",
    famousFood: "Akassa", famousLandmark: "Royal Palaces of Abomey",
    funFact: "Benin is the birthplace of the Vodun (Voodoo) religion!",
    quizQuestions: [
      { question: "What is the capital city of Benin?", options: ["Sofia", "Porto-Novo", "Majuro", "Dili"], answer: 1 },
      { question: "Which of these foods is famous in Benin?", options: ["Doubles", "Paella & Tapas", "Pizza & Pasta", "Akassa"], answer: 3 },
      { question: "Which famous landmark can you find in Benin?", options: ["To Sua Ocean Trench", "Pyramids of Meroë", "Royal Palaces of Abomey", "Sultan Qaboos Grand Mosque"], answer: 2 },
    ],
  },
  {
    id: "botswana", name: "Botswana", flag: "🇧🇼", continent: "Africa", mapId: "BW",
    capital: "Gaborone", language: "English & Setswana", population: "2.6 million",
    famousFood: "Seswaa", famousLandmark: "Okavango Delta",
    funFact: "Botswana has one of the largest inland river deltas in the world!",
    quizQuestions: [
      { question: "What is the capital city of Botswana?", options: ["Nicosia", "Gaborone", "Ulaanbaatar", "Port Moresby"], answer: 1 },
      { question: "Which of these foods is famous in Botswana?", options: ["Hainanese Chicken Rice", "Coconut Fish", "Kelaguen", "Seswaa"], answer: 3 },
      { question: "Which famous landmark can you find in Botswana?", options: ["Okavango Delta", "Belgrade Fortress", "Amphitheatre of El Jem", "Lake Malawi"], answer: 0 },
    ],
  },
  {
    id: "burkina-faso", name: "Burkina Faso", flag: "🇧🇫", continent: "Africa", mapId: "BF",
    capital: "Ouagadougou", language: "French", population: "22 million",
    famousFood: "Riz Gras", famousLandmark: "Ruins of Loropéni",
    funFact: "The name Burkina Faso means 'Land of Honest People'!",
    quizQuestions: [
      { question: "What is the capital city of Burkina Faso?", options: ["Ouagadougou", "Baku", "N'Djamena", "Nairobi"], answer: 0 },
      { question: "Which of these foods is famous in Burkina Faso?", options: ["Daraba", "Qurutob", "Roti", "Riz Gras"], answer: 3 },
      { question: "Which famous landmark can you find in Burkina Faso?", options: ["Volcanoes National Park", "Rila Monastery", "Ruins of Loropéni", "Sultan Omar Ali Saifuddien Mosque"], answer: 2 },
    ],
  },
  {
    id: "burundi", name: "Burundi", flag: "🇧🇮", continent: "Africa", mapId: "BI",
    capital: "Gitega", language: "Kirundi & French", population: "13 million",
    famousFood: "Boko Boko", famousLandmark: "Source of the Nile",
    funFact: "Burundi is one of the smallest countries in Africa!",
    quizQuestions: [
      { question: "What is the capital city of Burundi?", options: ["Gitega", "Sri Jayawardenepura Kotte", "Washington, D.C.", "Phnom Penh"], answer: 0 },
      { question: "Which of these foods is famous in Burundi?", options: ["Langouste à la Vanille", "Phở & Bánh Mì", "Papa", "Boko Boko"], answer: 3 },
      { question: "Which famous landmark can you find in Burundi?", options: ["Zuma Rock", "Source of the Nile", "Ziggurat of Ur", "Mount Karthala"], answer: 1 },
    ],
  },
  {
    id: "cabo-verde", name: "Cabo Verde", flag: "🇨🇻", continent: "Africa", mapId: "CV",
    capital: "Praia", language: "Portuguese", population: "600 thousand",
    famousFood: "Cachupa", famousLandmark: "Pico do Fogo Volcano",
    funFact: "Cabo Verde is a group of 10 volcanic islands in the Atlantic Ocean!",
    quizQuestions: [
      { question: "What is the capital city of Cabo Verde?", options: ["Praia", "Kuwait City", "Castries", "Budapest"], answer: 0 },
      { question: "Which of these foods is famous in Cabo Verde?", options: ["Brunost (brown cheese)", "Sancocho", "Waffles & Chocolate", "Cachupa"], answer: 3 },
      { question: "Which famous landmark can you find in Cabo Verde?", options: ["Persepolis", "Pico do Fogo Volcano", "Bayterek Tower", "Casbah of Algiers"], answer: 1 },
    ],
  },
  {
    id: "cameroon", name: "Cameroon", flag: "🇨🇲", continent: "Africa", mapId: "CM",
    capital: "Yaoundé", language: "French & English", population: "28 million",
    famousFood: "Ndolé", famousLandmark: "Mount Cameroon",
    funFact: "Cameroon is called 'Africa in miniature' because it has every type of landscape!",
    quizQuestions: [
      { question: "What is the capital city of Cameroon?", options: ["Freetown", "Canberra", "Yaoundé", "Tehran"], answer: 2 },
      { question: "Which of these foods is famous in Cameroon?", options: ["Calulu", "Bobotie & Biltong", "Pizza & Pasta", "Ndolé"], answer: 3 },
      { question: "Which famous landmark can you find in Cameroon?", options: ["Mount Cameroon", "Dome of the Rock", "Lake Ohrid", "Bay of Kotor"], answer: 0 },
    ],
  },
  {
    id: "central-african-republic", name: "Central African Republic", flag: "🇨🇫", continent: "Africa", mapId: "CF",
    capital: "Bangui", language: "French & Sango", population: "5 million",
    famousFood: "Makara", famousLandmark: "Dzanga-Sangha Reserve",
    funFact: "You can see forest elephants and gorillas in the wild here!",
    quizQuestions: [
      { question: "What is the capital city of Central African Republic?", options: ["Suva", "Bangui", "Vilnius", "Brussels"], answer: 1 },
      { question: "Which of these foods is famous in Central African Republic?", options: ["Canjeero", "Pizza & Pasta", "Ema Datshi", "Makara"], answer: 3 },
      { question: "Which famous landmark can you find in Central African Republic?", options: ["Dzanga-Sangha Reserve", "Grand Palace", "Big Ben & Buckingham Palace", "Al-Masjid al-Haram (Grand Mosque)"], answer: 0 },
    ],
  },
  {
    id: "chad", name: "Chad", flag: "🇹🇩", continent: "Africa", mapId: "TD",
    capital: "N'Djamena", language: "French & Arabic", population: "18 million",
    famousFood: "Daraba", famousLandmark: "Ennedi Plateau",
    funFact: "Chad has amazing rock formations in the desert that look like castles!",
    quizQuestions: [
      { question: "What is the capital city of Chad?", options: ["Nassau", "Tirana", "N'Djamena", "Minsk"], answer: 2 },
      { question: "Which of these foods is famous in Chad?", options: ["Canjeero", "Kimchi & Bibimbap", "Bazin", "Daraba"], answer: 3 },
      { question: "Which famous landmark can you find in Chad?", options: ["Bahrain Fort", "Ennedi Plateau", "Bijagós Archipelago", "Buada Lagoon"], answer: 1 },
    ],
  },
  {
    id: "comoros", name: "Comoros", flag: "🇰🇲", continent: "Africa", mapId: "KM",
    capital: "Moroni", language: "Comorian, French & Arabic", population: "900 thousand",
    famousFood: "Langouste à la Vanille", famousLandmark: "Mount Karthala",
    funFact: "Comoros is known as the 'Perfume Islands' because of its vanilla and ylang-ylang flowers!",
    quizQuestions: [
      { question: "What is the capital city of Comoros?", options: ["Moroni", "Copenhagen", "Apia", "Kingston"], answer: 0 },
      { question: "Which of these foods is famous in Comoros?", options: ["La Bandera", "Poulet Moambé", "Dholl Puri", "Langouste à la Vanille"], answer: 3 },
      { question: "Which famous landmark can you find in Comoros?", options: ["Geirangerfjord", "Mount Karthala", "Cartagena Old City", "Gyeongbokgung Palace"], answer: 1 },
    ],
  },
  {
    id: "congo", name: "Republic of the Congo", flag: "🇨🇬", continent: "Africa", mapId: "CG",
    capital: "Brazzaville", language: "French", population: "6 million",
    famousFood: "Poulet Moambé", famousLandmark: "Basilique Sainte-Anne",
    funFact: "Brazzaville and Kinshasa are the two closest capital cities in the world, just across a river!",
    quizQuestions: [
      { question: "What is the capital city of Republic of the Congo?", options: ["Dakar", "Athens", "Brazzaville", "Riga"], answer: 2 },
      { question: "Which of these foods is famous in Republic of the Congo?", options: ["Oka (raw fish salad)", "Griot (fried pork)", "Masgouf (grilled fish)", "Poulet Moambé"], answer: 3 },
      { question: "Which famous landmark can you find in Republic of the Congo?", options: ["Kokoda Track", "Basilique Sainte-Anne", "Central Suriname Nature Reserve", "Mount Nimba"], answer: 1 },
    ],
  },
  {
    id: "dr-congo", name: "Democratic Republic of the Congo", flag: "🇨🇩", continent: "Africa", mapId: "CD",
    capital: "Kinshasa", language: "French", population: "102 million",
    famousFood: "Fufu & Pondu", famousLandmark: "Virunga National Park",
    funFact: "DR Congo is home to the rare mountain gorillas!",
    quizQuestions: [
      { question: "What is the capital city of Democratic Republic of the Congo?", options: ["Kingston", "Kinshasa", "Moroni", "Kabul"], answer: 1 },
      { question: "Which of these foods is famous in Democratic Republic of the Congo?", options: ["Banitsa", "Käsknöpfle (cheese noodles)", "Pepperpot", "Fufu & Pondu"], answer: 3 },
      { question: "Which famous landmark can you find in Democratic Republic of the Congo?", options: ["Virunga National Park", "Basilique Sainte-Anne", "Agadez Mosque", "Bay of Kotor"], answer: 0 },
    ],
  },
  {
    id: "cote-d-ivoire", name: "Côte d'Ivoire", flag: "🇨🇮", continent: "Africa", mapId: "CI",
    capital: "Yamoussoukro", language: "French", population: "28 million",
    famousFood: "Attiéké", famousLandmark: "Basilica of Our Lady of Peace",
    funFact: "Côte d'Ivoire produces more cocoa (chocolate) than any other country!",
    quizQuestions: [
      { question: "What is the capital city of Côte d'Ivoire?", options: ["N'Djamena", "Dhaka", "Yamoussoukro", "Majuro"], answer: 2 },
      { question: "Which of these foods is famous in Côte d'Ivoire?", options: ["Mountain Chicken (frog legs)", "Kabsa", "Njeguški Steak", "Attiéké"], answer: 3 },
      { question: "Which famous landmark can you find in Côte d'Ivoire?", options: ["Basilica of Our Lady of Peace", "Juche Tower", "Harrison's Cave", "Leptis Magna"], answer: 0 },
    ],
  },
  {
    id: "djibouti", name: "Djibouti", flag: "🇩🇯", continent: "Africa", mapId: "DJ",
    capital: "Djibouti City", language: "French & Arabic", population: "1 million",
    famousFood: "Skoudehkaris", famousLandmark: "Lake Assal",
    funFact: "Lake Assal in Djibouti is the saltiest lake in Africa!",
    quizQuestions: [
      { question: "What is the capital city of Djibouti?", options: ["Djibouti City", "Damascus", "Dushanbe", "Khartoum"], answer: 0 },
      { question: "Which of these foods is famous in Djibouti?", options: ["Poi", "Couscous", "Jollof Rice & Suya", "Skoudehkaris"], answer: 3 },
      { question: "Which famous landmark can you find in Djibouti?", options: ["Lake Assal", "Hagia Sophia", "Vallée de Mai", "Grand Palace"], answer: 0 },
    ],
  },
  {
    id: "egypt", name: "Egypt", flag: "🇪🇬", continent: "Africa", mapId: "EG",
    capital: "Cairo", language: "Arabic", population: "104 million",
    famousFood: "Koshari & Falafel", famousLandmark: "Pyramids of Giza",
    funFact: "The ancient Egyptians invented toothpaste!",
    quizQuestions: [
      { question: "What famous structures are in Egypt?", options: ["Eiffel Tower", "Pyramids", "Colosseum", "Big Ben"], answer: 1 },
      { question: "What is the capital of Egypt?", options: ["Alexandria", "Cairo", "Luxor", "Aswan"], answer: 1 },
      { question: "What river flows through Egypt?", options: ["Amazon", "Mississippi", "Nile", "Thames"], answer: 2 },
    ],
  },
  {
    id: "equatorial-guinea", name: "Equatorial Guinea", flag: "🇬🇶", continent: "Africa", mapId: "GQ",
    capital: "Malabo", language: "Spanish & French", population: "1.7 million",
    famousFood: "Succotash", famousLandmark: "Monte Alen National Park",
    funFact: "Equatorial Guinea is the only country in Africa where Spanish is an official language!",
    quizQuestions: [
      { question: "What is the capital city of Equatorial Guinea?", options: ["Malabo", "Port-au-Prince", "Santiago", "Andorra la Vella"], answer: 0 },
      { question: "Which of these foods is famous in Equatorial Guinea?", options: ["Lavash & Khorovats", "Bryndzové Halušky", "Conch Fritters", "Succotash"], answer: 3 },
      { question: "Which famous landmark can you find in Equatorial Guinea?", options: ["Saint Basil's Cathedral", "Monte Alen National Park", "The Little Mermaid Statue", "Cliffs of Moher"], answer: 1 },
    ],
  },
  {
    id: "eritrea", name: "Eritrea", flag: "🇪🇷", continent: "Africa", mapId: "ER",
    capital: "Asmara", language: "Tigrinya & Arabic", population: "3.6 million",
    famousFood: "Injera with Zigni", famousLandmark: "Fiat Tagliero Building",
    funFact: "Asmara's buildings look like a futuristic city from the 1930s!",
    quizQuestions: [
      { question: "What is the capital city of Eritrea?", options: ["N'Djamena", "Valletta", "Asmara", "Athens"], answer: 2 },
      { question: "Which of these foods is famous in Eritrea?", options: ["Cou-Cou & Flying Fish", "Buuz (dumplings)", "Asado & Empanadas", "Injera with Zigni"], answer: 3 },
      { question: "Which famous landmark can you find in Eritrea?", options: ["Fiat Tagliero Building", "Eiffel Tower", "Harrison's Cave", "Blue Lagoon"], answer: 0 },
    ],
  },
  {
    id: "eswatini", name: "Eswatini", flag: "🇸🇿", continent: "Africa", mapId: "SZ",
    capital: "Mbabane", language: "Swazi & English", population: "1.2 million",
    famousFood: "Sishwala", famousLandmark: "Sibebe Rock",
    funFact: "Eswatini (formerly Swaziland) is one of the smallest countries in Africa!",
    quizQuestions: [
      { question: "What is the capital city of Eswatini?", options: ["Harare", "Mbabane", "Brussels", "Ngerulmud"], answer: 1 },
      { question: "Which of these foods is famous in Eswatini?", options: ["Caldo de Mancarra", "Musakhan & Knafeh", "Ceviche & Lomo Saltado", "Sishwala"], answer: 3 },
      { question: "Which famous landmark can you find in Eswatini?", options: ["Sibebe Rock", "Juche Tower", "Harrison's Cave", "Grand Anse Beach"], answer: 0 },
    ],
  },
  {
    id: "ethiopia", name: "Ethiopia", flag: "🇪🇹", continent: "Africa", mapId: "ET",
    capital: "Addis Ababa", language: "Amharic", population: "126 million",
    famousFood: "Injera & Doro Wat", famousLandmark: "Rock-Hewn Churches of Lalibela",
    funFact: "Ethiopia has its own calendar — they are about 7 years behind ours!",
    quizQuestions: [
      { question: "What is the capital city of Ethiopia?", options: ["San Marino", "Jerusalem (East)", "Addis Ababa", "Bamako"], answer: 2 },
      { question: "Which of these foods is famous in Ethiopia?", options: ["Laap", "Tacos & Tamales", "Barbagiuan", "Injera & Doro Wat"], answer: 3 },
      { question: "Which famous landmark can you find in Ethiopia?", options: ["Door to Hell (Darvaza Crater)", "Ice Hotel", "Rock-Hewn Churches of Lalibela", "Riga Central Market"], answer: 2 },
    ],
  },
  {
    id: "gabon", name: "Gabon", flag: "🇬🇦", continent: "Africa", mapId: "GA",
    capital: "Libreville", language: "French", population: "2.4 million",
    famousFood: "Nyembwe Chicken", famousLandmark: "Lopé National Park",
    funFact: "About 80% of Gabon is covered by rainforest!",
    quizQuestions: [
      { question: "What is the capital city of Gabon?", options: ["Libreville", "Prague", "Santo Domingo", "Gaborone"], answer: 0 },
      { question: "Which of these foods is famous in Gabon?", options: ["Laplap", "Djerma Stew", "Palusami", "Nyembwe Chicken"], answer: 3 },
      { question: "Which famous landmark can you find in Gabon?", options: ["Casbah of Algiers", "Lopé National Park", "The Pitons", "Agadez Mosque"], answer: 1 },
    ],
  },
  {
    id: "gambia", name: "Gambia", flag: "🇬🇲", continent: "Africa", mapId: "GM",
    capital: "Banjul", language: "English", population: "2.5 million",
    famousFood: "Domoda", famousLandmark: "Kunta Kinteh Island",
    funFact: "Gambia is the smallest country on mainland Africa!",
    quizQuestions: [
      { question: "What is the capital city of Gambia?", options: ["Bridgetown", "Baku", "Banjul", "Bangkok"], answer: 2 },
      { question: "Which of these foods is famous in Gambia?", options: ["Wiener Schnitzel", "Fufu & Pondu", "Kelaguen", "Domoda"], answer: 3 },
      { question: "Which famous landmark can you find in Gambia?", options: ["Table Mountain", "Persepolis", "Kunta Kinteh Island", "Riga Central Market"], answer: 2 },
    ],
  },
  {
    id: "ghana", name: "Ghana", flag: "🇬🇭", continent: "Africa", mapId: "GH",
    capital: "Accra", language: "English & Akan", population: "33 million",
    famousFood: "Jollof Rice", famousLandmark: "Cape Coast Castle",
    funFact: "Ghana was the first African country to gain independence!",
    quizQuestions: [
      { question: "What is the capital of Ghana?", options: ["Lagos", "Accra", "Nairobi", "Cairo"], answer: 1 },
      { question: "What famous dish is Ghana known for?", options: ["Sushi", "Jollof Rice", "Pizza", "Tacos"], answer: 1 },
      { question: "What continent is Ghana in?", options: ["Asia", "Europe", "Africa", "South America"], answer: 2 },
    ],
  },
  {
    id: "guinea", name: "Guinea", flag: "🇬🇳", continent: "Africa", mapId: "GN",
    capital: "Conakry", language: "French", population: "14 million",
    famousFood: "Poulet Yassa", famousLandmark: "Mount Nimba",
    funFact: "Guinea has some of the world's largest reserves of bauxite, used to make aluminum!",
    quizQuestions: [
      { question: "What is the capital city of Guinea?", options: ["Guatemala City", "Brussels", "Conakry", "Podgorica"], answer: 2 },
      { question: "Which of these foods is famous in Guinea?", options: ["Injera with Zigni", "Poutine & Maple Syrup", "Pepián", "Poulet Yassa"], answer: 3 },
      { question: "Which famous landmark can you find in Guinea?", options: ["Cape Coast Castle", "Vaduz Castle", "Mount Nimba", "Zuma Rock"], answer: 2 },
    ],
  },
  {
    id: "guinea-bissau", name: "Guinea-Bissau", flag: "🇬🇼", continent: "Africa", mapId: "GW",
    capital: "Bissau", language: "Portuguese", population: "2 million",
    famousFood: "Caldo de Mancarra", famousLandmark: "Bijagós Archipelago",
    funFact: "Guinea-Bissau has beautiful islands where hippos swim in the ocean!",
    quizQuestions: [
      { question: "What is the capital city of Guinea-Bissau?", options: ["Sofia", "Bissau", "Abuja", "Victoria"], answer: 1 },
      { question: "Which of these foods is famous in Guinea-Bissau?", options: ["Hummus & Falafel", "Gyros & Moussaka", "Succotash", "Caldo de Mancarra"], answer: 3 },
      { question: "Which famous landmark can you find in Guinea-Bissau?", options: ["Bijagós Archipelago", "Kokoda Track", "Grand Place", "Great Zimbabwe Ruins"], answer: 0 },
    ],
  },
  {
    id: "kenya", name: "Kenya", flag: "🇰🇪", continent: "Africa", mapId: "KE",
    capital: "Nairobi", language: "Swahili & English", population: "54 million",
    famousFood: "Ugali & Nyama Choma", famousLandmark: "Maasai Mara",
    funFact: "Kenya is home to the Great Wildebeest Migration — millions of animals move together!",
    quizQuestions: [
      { question: "What is the capital of Kenya?", options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"], answer: 1 },
      { question: "What famous wildlife reserve is in Kenya?", options: ["Yellowstone", "Maasai Mara", "Serengeti", "Kruger"], answer: 1 },
      { question: "What language is widely spoken in Kenya?", options: ["French", "Swahili", "Portuguese", "Arabic"], answer: 1 },
    ],
  },
  {
    id: "lesotho", name: "Lesotho", flag: "🇱🇸", continent: "Africa", mapId: "LS",
    capital: "Maseru", language: "Sesotho & English", population: "2.3 million",
    famousFood: "Papa", famousLandmark: "Maletsunyane Falls",
    funFact: "Lesotho is the only country in the world entirely above 1,000 meters!",
    quizQuestions: [
      { question: "What is the capital city of Lesotho?", options: ["Maseru", "Kingstown", "Doha", "Brazzaville"], answer: 0 },
      { question: "Which of these foods is famous in Lesotho?", options: ["Ceviche & Lomo Saltado", "Judd mat Gaardebounen", "Makara", "Papa"], answer: 3 },
      { question: "Which famous landmark can you find in Lesotho?", options: ["Statue of Liberty", "Maletsunyane Falls", "Berat Castle", "Pyramids of Meroë"], answer: 1 },
    ],
  },
  {
    id: "liberia", name: "Liberia", flag: "🇱🇷", continent: "Africa", mapId: "LR",
    capital: "Monrovia", language: "English", population: "5.3 million",
    famousFood: "Jollof Rice", famousLandmark: "Providence Island",
    funFact: "Liberia was founded by freed American slaves!",
    quizQuestions: [
      { question: "What is the capital city of Liberia?", options: ["Lima", "New Delhi", "Monrovia", "Amsterdam"], answer: 2 },
      { question: "Which of these foods is famous in Liberia?", options: ["Rice and Beans", "Ćevapi", "Brik", "Jollof Rice"], answer: 3 },
      { question: "Which famous landmark can you find in Liberia?", options: ["Spiš Castle", "Bock Casemates", "Providence Island", "Ruins of Loropéni"], answer: 2 },
    ],
  },
  {
    id: "libya", name: "Libya", flag: "🇱🇾", continent: "Africa", mapId: "LY",
    capital: "Tripoli", language: "Arabic", population: "7 million",
    famousFood: "Bazin", famousLandmark: "Leptis Magna",
    funFact: "Libya has ancient Roman ruins right on the coast of the Mediterranean Sea!",
    quizQuestions: [
      { question: "What is the capital city of Libya?", options: ["Santo Domingo", "Tripoli", "Lusaka", "Ashgabat"], answer: 1 },
      { question: "Which of these foods is famous in Libya?", options: ["Bobotie & Biltong", "Stewed Saltfish", "Fondue & Chocolate", "Bazin"], answer: 3 },
      { question: "Which famous landmark can you find in Libya?", options: ["Leptis Magna", "Taj Mahal", "Old City of Sana'a", "Sydney Opera House"], answer: 0 },
    ],
  },
  {
    id: "madagascar", name: "Madagascar", flag: "🇲🇬", continent: "Africa", mapId: "MG",
    capital: "Antananarivo", language: "Malagasy & French", population: "29 million",
    famousFood: "Romazava", famousLandmark: "Avenue of the Baobabs",
    funFact: "Most animals in Madagascar are found nowhere else on Earth, including lemurs!",
    quizQuestions: [
      { question: "What is the capital city of Madagascar?", options: ["Amman", "Port-au-Prince", "Antananarivo", "Georgetown"], answer: 2 },
      { question: "Which of these foods is famous in Madagascar?", options: ["Cou-Cou & Flying Fish", "Riz Gras", "Halloumi Cheese", "Romazava"], answer: 3 },
      { question: "Which famous landmark can you find in Madagascar?", options: ["Brandenburg Gate", "Cliffs of Moher", "Avenue of the Baobabs", "Garden of the Sleeping Giant"], answer: 2 },
    ],
  },
  {
    id: "malawi", name: "Malawi", flag: "🇲🇼", continent: "Africa", mapId: "MW",
    capital: "Lilongwe", language: "English & Chichewa", population: "20 million",
    famousFood: "Nsima", famousLandmark: "Lake Malawi",
    funFact: "Lake Malawi has more species of fish than any other lake in the world!",
    quizQuestions: [
      { question: "What is the capital city of Malawi?", options: ["Lilongwe", "Phnom Penh", "Vatican City", "Managua"], answer: 0 },
      { question: "Which of these foods is famous in Malawi?", options: ["Brochettes", "Palusami", "Daraba", "Nsima"], answer: 3 },
      { question: "Which famous landmark can you find in Malawi?", options: ["Spiš Castle", "Lake Malawi", "Garden of the Sleeping Giant", "Boiling Lake"], answer: 1 },
    ],
  },
  {
    id: "mali", name: "Mali", flag: "🇲🇱", continent: "Africa", mapId: "ML",
    capital: "Bamako", language: "French", population: "22 million",
    famousFood: "Tiguadege Na", famousLandmark: "Great Mosque of Djenné",
    funFact: "The Great Mosque of Djenné is the largest mud-brick building in the world!",
    quizQuestions: [
      { question: "What is the capital city of Mali?", options: ["Libreville", "Conakry", "Bamako", "Yaoundé"], answer: 2 },
      { question: "Which of these foods is famous in Mali?", options: ["Waffles & Chocolate", "Shuwa", "Gallo Pinto", "Tiguadege Na"], answer: 3 },
      { question: "Which famous landmark can you find in Mali?", options: ["Petra", "Eiffel Tower", "Great Mosque of Djenné", "Basilique Sainte-Anne"], answer: 2 },
    ],
  },
  {
    id: "mauritania", name: "Mauritania", flag: "🇲🇷", continent: "Africa", mapId: "MR",
    capital: "Nouakchott", language: "Arabic", population: "4.8 million",
    famousFood: "Thieboudienne", famousLandmark: "Richat Structure (Eye of the Sahara)",
    funFact: "Mauritania has a giant circle in the desert called the 'Eye of the Sahara' that can be seen from space!",
    quizQuestions: [
      { question: "What is the capital city of Mauritania?", options: ["Vatican City", "Nouakchott", "Conakry", "Bucharest"], answer: 1 },
      { question: "Which of these foods is famous in Mauritania?", options: ["Karelian Pies", "Saltah", "Chivito", "Thieboudienne"], answer: 3 },
      { question: "Which famous landmark can you find in Mauritania?", options: ["Richat Structure (Eye of the Sahara)", "Colonial Zone of Santo Domingo", "Tatev Monastery", "Boiling Lake"], answer: 0 },
    ],
  },
  {
    id: "mauritius", name: "Mauritius", flag: "🇲🇺", continent: "Africa", mapId: "MU",
    capital: "Port Louis", language: "English & French", population: "1.3 million",
    famousFood: "Dholl Puri", famousLandmark: "Le Morne Brabant",
    funFact: "The dodo bird lived only in Mauritius before it went extinct!",
    quizQuestions: [
      { question: "What is the capital city of Mauritius?", options: ["Lomé", "Port Louis", "Nouakchott", "Niamey"], answer: 1 },
      { question: "Which of these foods is famous in Mauritius?", options: ["Tagine & Couscous", "Laplap", "Smørrebrød", "Dholl Puri"], answer: 3 },
      { question: "Which famous landmark can you find in Mauritius?", options: ["Laas Geel Cave Paintings", "Angkor Wat", "Le Morne Brabant", "Dzanga-Sangha Reserve"], answer: 2 },
    ],
  },
  {
    id: "morocco", name: "Morocco", flag: "🇲🇦", continent: "Africa", mapId: "MA",
    capital: "Rabat", language: "Arabic & French", population: "37 million",
    famousFood: "Tagine & Couscous", famousLandmark: "Hassan II Mosque",
    funFact: "Morocco has a city painted entirely blue — it's called Chefchaouen!",
    quizQuestions: [
      { question: "What is the capital of Morocco?", options: ["Marrakech", "Casablanca", "Rabat", "Fes"], answer: 2 },
      { question: "What blue city is in Morocco?", options: ["Santorini", "Chefchaouen", "Jodhpur", "Sidi Bou Said"], answer: 1 },
      { question: "What continent is Morocco in?", options: ["Asia", "Europe", "Africa", "South America"], answer: 2 },
    ],
  },
  {
    id: "mozambique", name: "Mozambique", flag: "🇲🇿", continent: "Africa", mapId: "MZ",
    capital: "Maputo", language: "Portuguese", population: "33 million",
    famousFood: "Piri Piri Chicken", famousLandmark: "Bazaruto Archipelago",
    funFact: "Mozambique's flag has a book and a rifle on it — the only flag with a modern weapon!",
    quizQuestions: [
      { question: "What is the capital city of Mozambique?", options: ["Maputo", "New Delhi", "London", "Apia"], answer: 0 },
      { question: "Which of these foods is famous in Mozambique?", options: ["Poulet Yassa", "Biryani & Nihari", "Chelo Kebab", "Piri Piri Chicken"], answer: 3 },
      { question: "Which famous landmark can you find in Mozambique?", options: ["Kalandula Falls", "Masaya Volcano", "Bazaruto Archipelago", "Milford Sound"], answer: 2 },
    ],
  },
  {
    id: "namibia", name: "Namibia", flag: "🇳🇦", continent: "Africa", mapId: "NA",
    capital: "Windhoek", language: "English", population: "2.6 million",
    famousFood: "Kapana", famousLandmark: "Sossusvlei Sand Dunes",
    funFact: "Namibia has some of the tallest sand dunes in the world, over 300 meters high!",
    quizQuestions: [
      { question: "What is the capital city of Namibia?", options: ["Windhoek", "Andorra la Vella", "Abu Dhabi", "Victoria"], answer: 0 },
      { question: "Which of these foods is famous in Namibia?", options: ["Ambuyat", "Coconut Fish", "Ful Medames", "Kapana"], answer: 3 },
      { question: "Which famous landmark can you find in Namibia?", options: ["Nan Madol Ruins", "Sossusvlei Sand Dunes", "Ha Long Bay", "Bay of Kotor"], answer: 1 },
    ],
  },
  {
    id: "niger", name: "Niger", flag: "🇳🇪", continent: "Africa", mapId: "NE",
    capital: "Niamey", language: "French", population: "26 million",
    famousFood: "Djerma Stew", famousLandmark: "Agadez Mosque",
    funFact: "Niger has dinosaur fossils in the Sahara Desert!",
    quizQuestions: [
      { question: "What is the capital city of Niger?", options: ["Nouakchott", "Niamey", "Managua", "Kuala Lumpur"], answer: 1 },
      { question: "Which of these foods is famous in Niger?", options: ["Judd mat Gaardebounen", "Stroopwafel", "Saltah", "Djerma Stew"], answer: 3 },
      { question: "Which famous landmark can you find in Niger?", options: ["Borobudur Temple", "Mount Nimba", "Agadez Mosque", "The Little Mermaid Statue"], answer: 2 },
    ],
  },
  {
    id: "nigeria", name: "Nigeria", flag: "🇳🇬", continent: "Africa", mapId: "NG",
    capital: "Abuja", language: "English & Hausa", population: "220 million",
    famousFood: "Jollof Rice & Suya", famousLandmark: "Zuma Rock",
    funFact: "Nigeria is called the 'Giant of Africa' because it has the most people!",
    quizQuestions: [
      { question: "What is the capital of Nigeria?", options: ["Lagos", "Abuja", "Kano", "Ibadan"], answer: 1 },
      { question: "What is Nigeria's nickname?", options: ["Pearl of Africa", "Giant of Africa", "Heart of Africa", "Star of Africa"], answer: 1 },
      { question: "What continent is Nigeria in?", options: ["Asia", "Africa", "Europe", "South America"], answer: 1 },
    ],
  },
  {
    id: "rwanda", name: "Rwanda", flag: "🇷🇼", continent: "Africa", mapId: "RW",
    capital: "Kigali", language: "Kinyarwanda, French & English", population: "14 million",
    famousFood: "Brochettes", famousLandmark: "Volcanoes National Park",
    funFact: "Rwanda is called the 'Land of a Thousand Hills' because of its beautiful rolling hills!",
    quizQuestions: [
      { question: "What is the capital city of Rwanda?", options: ["Brussels", "Kigali", "Dublin", "Kinshasa"], answer: 1 },
      { question: "Which of these foods is famous in Rwanda?", options: ["Kebabs & Baklava", "Jerk Chicken & Ackee", "Coconut Crab", "Brochettes"], answer: 3 },
      { question: "Which famous landmark can you find in Rwanda?", options: ["Great Blue Hole", "Ziggurat of Ur", "Volcanoes National Park", "Band-e-Amir Lakes"], answer: 2 },
    ],
  },
  {
    id: "sao-tome-and-principe", name: "São Tomé and Príncipe", flag: "🇸🇹", continent: "Africa", mapId: "ST",
    capital: "São Tomé", language: "Portuguese", population: "230 thousand",
    famousFood: "Calulu", famousLandmark: "Pico Cão Grande",
    funFact: "São Tomé and Príncipe is the smallest country in Africa!",
    quizQuestions: [
      { question: "What is the capital city of São Tomé and Príncipe?", options: ["São Tomé", "Jerusalem (East)", "Luanda", "Vatican City"], answer: 0 },
      { question: "Which of these foods is famous in São Tomé and Príncipe?", options: ["Caldo de Mancarra", "La Bandera", "Tacos & Tamales", "Calulu"], answer: 3 },
      { question: "Which famous landmark can you find in São Tomé and Príncipe?", options: ["Borobudur Temple", "Pico Cão Grande", "Citadelle Laferrière", "Colosseum"], answer: 1 },
    ],
  },
  {
    id: "senegal", name: "Senegal", flag: "🇸🇳", continent: "Africa", mapId: "SN",
    capital: "Dakar", language: "French & Wolof", population: "17 million",
    famousFood: "Thieboudienne", famousLandmark: "African Renaissance Monument",
    funFact: "Senegal has a pink lake called Lake Retba!",
    quizQuestions: [
      { question: "What is the capital city of Senegal?", options: ["Dakar", "Kinshasa", "Sana'a", "New Delhi"], answer: 0 },
      { question: "Which of these foods is famous in Senegal?", options: ["Daraba", "Trdelník", "Khachapuri (cheese bread)", "Thieboudienne"], answer: 3 },
      { question: "Which famous landmark can you find in Senegal?", options: ["Colosseum", "Monte Alen National Park", "African Renaissance Monument", "Rock-Hewn Churches of Lalibela"], answer: 2 },
    ],
  },
  {
    id: "seychelles", name: "Seychelles", flag: "🇸🇨", continent: "Africa", mapId: "SC",
    capital: "Victoria", language: "Seychellois Creole, English & French", population: "100 thousand",
    famousFood: "Octopus Curry", famousLandmark: "Vallée de Mai",
    funFact: "Seychelles has the world's largest seed — the coco de mer!",
    quizQuestions: [
      { question: "What is the capital city of Seychelles?", options: ["St. John's", "Victoria", "Yaoundé", "Panama City"], answer: 1 },
      { question: "Which of these foods is famous in Seychelles?", options: ["Gallo Pinto", "Akassa", "Mumu (earth oven feast)", "Octopus Curry"], answer: 3 },
      { question: "Which famous landmark can you find in Seychelles?", options: ["Vallée de Mai", "Old Havana", "Brandenburg Gate", "Salar de Uyuni"], answer: 0 },
    ],
  },
  {
    id: "sierra-leone", name: "Sierra Leone", flag: "🇸🇱", continent: "Africa", mapId: "SL",
    capital: "Freetown", language: "English & Krio", population: "8.6 million",
    famousFood: "Cassava Leaf Stew", famousLandmark: "Cotton Tree",
    funFact: "Sierra Leone's capital Freetown was founded as a home for freed slaves!",
    quizQuestions: [
      { question: "What is the capital city of Sierra Leone?", options: ["Dublin", "Freetown", "Kingston", "Pretoria"], answer: 1 },
      { question: "Which of these foods is famous in Sierra Leone?", options: ["Laap", "Chelo Kebab", "Piri Piri Chicken", "Cassava Leaf Stew"], answer: 3 },
      { question: "Which famous landmark can you find in Sierra Leone?", options: ["Nan Madol Ruins", "Pitch Lake", "Cotton Tree", "Casbah of Algiers"], answer: 2 },
    ],
  },
  {
    id: "somalia", name: "Somalia", flag: "🇸🇴", continent: "Africa", mapId: "SO",
    capital: "Mogadishu", language: "Somali & Arabic", population: "17 million",
    famousFood: "Canjeero", famousLandmark: "Laas Geel Cave Paintings",
    funFact: "Somalia has the longest coastline in mainland Africa!",
    quizQuestions: [
      { question: "What is the capital city of Somalia?", options: ["Apia", "Mogadishu", "Damascus", "Pretoria"], answer: 1 },
      { question: "Which of these foods is famous in Somalia?", options: ["Tagine & Couscous", "Palusami", "La Bandera", "Canjeero"], answer: 3 },
      { question: "Which famous landmark can you find in Somalia?", options: ["Laas Geel Cave Paintings", "Burj Khalifa", "Berat Castle", "Lake Assal"], answer: 0 },
    ],
  },
  {
    id: "south-africa", name: "South Africa", flag: "🇿🇦", continent: "Africa", mapId: "ZA",
    capital: "Pretoria", language: "11 official languages!", population: "60 million",
    famousFood: "Bobotie & Biltong", famousLandmark: "Table Mountain",
    funFact: "South Africa has 11 official languages — more than almost any country!",
    quizQuestions: [
      { question: "What famous mountain is in Cape Town?", options: ["Mount Fuji", "Table Mountain", "Mount Everest", "Kilimanjaro"], answer: 1 },
      { question: "How many official languages does South Africa have?", options: ["2", "5", "11", "20"], answer: 2 },
      { question: "What continent is South Africa in?", options: ["Asia", "Europe", "Africa", "Australia"], answer: 2 },
    ],
  },
  {
    id: "south-sudan", name: "South Sudan", flag: "🇸🇸", continent: "Africa", mapId: "SS",
    capital: "Juba", language: "English", population: "11 million",
    famousFood: "Kisra", famousLandmark: "Sudd Wetland",
    funFact: "South Sudan is the youngest country in the world — it was born in 2011!",
    quizQuestions: [
      { question: "What is the capital city of South Sudan?", options: ["Libreville", "Yaren", "Juba", "Panama City"], answer: 2 },
      { question: "Which of these foods is famous in South Sudan?", options: ["Byrek", "Domoda", "Smørrebrød", "Kisra"], answer: 3 },
      { question: "Which famous landmark can you find in South Sudan?", options: ["Colosseum", "Sudd Wetland", "Royal Palaces of Abomey", "Al-Masjid al-Haram (Grand Mosque)"], answer: 1 },
    ],
  },
  {
    id: "sudan", name: "Sudan", flag: "🇸🇩", continent: "Africa", mapId: "SD",
    capital: "Khartoum", language: "Arabic & English", population: "46 million",
    famousFood: "Ful Medames", famousLandmark: "Pyramids of Meroë",
    funFact: "Sudan has more pyramids than Egypt!",
    quizQuestions: [
      { question: "What is the capital city of Sudan?", options: ["Athens", "Khartoum", "Canberra", "Bissau"], answer: 1 },
      { question: "Which of these foods is famous in Sudan?", options: ["Bobotie & Biltong", "Irish Stew", "Oil Down", "Ful Medames"], answer: 3 },
      { question: "Which famous landmark can you find in Sudan?", options: ["Pyramids of Meroë", "Great Zimbabwe Ruins", "Christ the Redeemer", "Mount Cameroon"], answer: 0 },
    ],
  },
  {
    id: "tanzania", name: "Tanzania", flag: "🇹🇿", continent: "Africa", mapId: "TZ",
    capital: "Dodoma", language: "Swahili & English", population: "65 million",
    famousFood: "Ugali & Mishkaki", famousLandmark: "Mount Kilimanjaro",
    funFact: "Mount Kilimanjaro is the tallest mountain in Africa — you can climb it!",
    quizQuestions: [
      { question: "What is the capital city of Tanzania?", options: ["Astana", "Brussels", "Dodoma", "Tbilisi"], answer: 2 },
      { question: "Which of these foods is famous in Tanzania?", options: ["Jerk Chicken & Ackee", "Barbagiuan", "Nyembwe Chicken", "Ugali & Mishkaki"], answer: 3 },
      { question: "Which famous landmark can you find in Tanzania?", options: ["Mount Kilimanjaro", "Maletsunyane Falls", "Brimstone Hill Fortress", "Kuang Si Waterfalls"], answer: 0 },
    ],
  },
  {
    id: "togo", name: "Togo", flag: "🇹🇬", continent: "Africa", mapId: "TG",
    capital: "Lomé", language: "French", population: "8.8 million",
    famousFood: "Fufu & Peanut Soup", famousLandmark: "Koutammakou",
    funFact: "Togo has amazing tower-shaped mud houses called Tata Somba!",
    quizQuestions: [
      { question: "What is the capital city of Togo?", options: ["Mogadishu", "Lomé", "Helsinki", "Juba"], answer: 1 },
      { question: "Which of these foods is famous in Togo?", options: ["Piri Piri Chicken", "Pastel de Nata", "Kabuli Pulao", "Fufu & Peanut Soup"], answer: 3 },
      { question: "Which famous landmark can you find in Togo?", options: ["Koutammakou", "Narikala Fortress", "Garden of the Sleeping Giant", "Sudd Wetland"], answer: 0 },
    ],
  },
  {
    id: "tunisia", name: "Tunisia", flag: "🇹🇳", continent: "Africa", mapId: "TN",
    capital: "Tunis", language: "Arabic & French", population: "12 million",
    famousFood: "Brik", famousLandmark: "Amphitheatre of El Jem",
    funFact: "Parts of Star Wars were filmed in Tunisia!",
    quizQuestions: [
      { question: "What is the capital city of Tunisia?", options: ["Porto-Novo", "Athens", "Tunis", "Bucharest"], answer: 2 },
      { question: "Which of these foods is famous in Tunisia?", options: ["Poutine & Maple Syrup", "Pavlova", "Waffles & Chocolate", "Brik"], answer: 3 },
      { question: "Which famous landmark can you find in Tunisia?", options: ["Santa Claus Village", "Amphitheatre of El Jem", "Orheiul Vechi Monastery", "Arenal Volcano"], answer: 1 },
    ],
  },
  {
    id: "uganda", name: "Uganda", flag: "🇺🇬", continent: "Africa", mapId: "UG",
    capital: "Kampala", language: "English & Swahili", population: "48 million",
    famousFood: "Rolex (rolled eggs in chapati)", famousLandmark: "Bwindi Impenetrable Forest",
    funFact: "Uganda is called the 'Pearl of Africa' because of its stunning beauty!",
    quizQuestions: [
      { question: "What is the capital city of Uganda?", options: ["Kampala", "Roseau", "Addis Ababa", "Riga"], answer: 0 },
      { question: "Which of these foods is famous in Uganda?", options: ["Saltah", "Tiguadege Na", "Ropa Vieja", "Rolex (rolled eggs in chapati)"], answer: 3 },
      { question: "Which famous landmark can you find in Uganda?", options: ["Nelson's Dockyard", "Bwindi Impenetrable Forest", "Spiš Castle", "Fiat Tagliero Building"], answer: 1 },
    ],
  },
  {
    id: "zambia", name: "Zambia", flag: "🇿🇲", continent: "Africa", mapId: "ZM",
    capital: "Lusaka", language: "English", population: "20 million",
    famousFood: "Nshima", famousLandmark: "Victoria Falls",
    funFact: "Victoria Falls is one of the largest waterfalls in the world — locals call it 'The Smoke That Thunders'!",
    quizQuestions: [
      { question: "What is the capital city of Zambia?", options: ["Tokyo", "Antananarivo", "Lusaka", "Kingston"], answer: 2 },
      { question: "Which of these foods is famous in Zambia?", options: ["Poutine & Maple Syrup", "Doubles", "Kisra", "Nshima"], answer: 3 },
      { question: "Which famous landmark can you find in Zambia?", options: ["Casbah of Algiers", "Victoria Falls", "Belém Tower", "Tiger's Nest Monastery"], answer: 1 },
    ],
  },
  {
    id: "zimbabwe", name: "Zimbabwe", flag: "🇿🇼", continent: "Africa", mapId: "ZW",
    capital: "Harare", language: "English, Shona & Ndebele", population: "16 million",
    famousFood: "Sadza", famousLandmark: "Great Zimbabwe Ruins",
    funFact: "Zimbabwe is named after the Great Zimbabwe — ancient stone ruins built over 900 years ago!",
    quizQuestions: [
      { question: "What is the capital city of Zimbabwe?", options: ["Gaborone", "Harare", "Guatemala City", "Freetown"], answer: 1 },
      { question: "Which of these foods is famous in Zimbabwe?", options: ["Vegemite & Meat Pies", "Domoda", "Ful Medames", "Sadza"], answer: 3 },
      { question: "Which famous landmark can you find in Zimbabwe?", options: ["Great Zimbabwe Ruins", "Burj Khalifa", "Agadez Mosque", "Band-e-Amir Lakes"], answer: 0 },
    ],
  },

  // ===== ASIA (48) =====
  {
    id: "afghanistan", name: "Afghanistan", flag: "🇦🇫", continent: "Asia", mapId: "AF",
    capital: "Kabul", language: "Pashto & Dari", population: "41 million",
    famousFood: "Kabuli Pulao", famousLandmark: "Band-e-Amir Lakes",
    funFact: "Afghanistan has stunning blue lakes hidden in the mountains!",
    quizQuestions: [
      { question: "What is the capital city of Afghanistan?", options: ["Port Louis", "Khartoum", "Kabul", "Thimphu"], answer: 2 },
      { question: "Which of these foods is famous in Afghanistan?", options: ["Bratwurst & Pretzels", "Succotash", "Caldo de Mancarra", "Kabuli Pulao"], answer: 3 },
      { question: "Which famous landmark can you find in Afghanistan?", options: ["Band-e-Amir Lakes", "Boiling Lake", "Kalandula Falls", "Persepolis"], answer: 0 },
    ],
  },
  {
    id: "armenia", name: "Armenia", flag: "🇦🇲", continent: "Asia", mapId: "AM",
    capital: "Yerevan", language: "Armenian", population: "3 million",
    famousFood: "Lavash & Khorovats", famousLandmark: "Tatev Monastery",
    funFact: "Armenia has the world's longest reversible cable car ride!",
    quizQuestions: [
      { question: "What is the capital city of Armenia?", options: ["Yerevan", "Roseau", "Warsaw", "Gaborone"], answer: 0 },
      { question: "Which of these foods is famous in Armenia?", options: ["Cassava Leaf Stew", "Mohinga", "Shuwa", "Lavash & Khorovats"], answer: 3 },
      { question: "Which famous landmark can you find in Armenia?", options: ["Jellyfish Lake", "Tatev Monastery", "Cotton Tree", "Anne Frank House"], answer: 1 },
    ],
  },
  {
    id: "azerbaijan", name: "Azerbaijan", flag: "🇦🇿", continent: "Asia", mapId: "AZ",
    capital: "Baku", language: "Azerbaijani", population: "10 million",
    famousFood: "Plov", famousLandmark: "Flame Towers",
    funFact: "Azerbaijan is called the 'Land of Fire' because of natural gas flames that burn from the ground!",
    quizQuestions: [
      { question: "What is the capital city of Azerbaijan?", options: ["Minsk", "Islamabad", "Baku", "Belmopan"], answer: 2 },
      { question: "Which of these foods is famous in Azerbaijan?", options: ["Canjeero", "Ful Medames", "Jollof Rice & Suya", "Plov"], answer: 3 },
      { question: "Which famous landmark can you find in Azerbaijan?", options: ["Tallinn Old Town", "Flame Towers", "Sigiriya Rock Fortress", "Harrison's Cave"], answer: 1 },
    ],
  },
  {
    id: "bahrain", name: "Bahrain", flag: "🇧🇭", continent: "Asia", mapId: "BH",
    capital: "Manama", language: "Arabic", population: "1.5 million",
    famousFood: "Machboos", famousLandmark: "Bahrain Fort",
    funFact: "Bahrain is an island nation made up of over 30 islands!",
    quizQuestions: [
      { question: "What is the capital city of Bahrain?", options: ["Manama", "Caracas", "Monrovia", "Niamey"], answer: 0 },
      { question: "Which of these foods is famous in Bahrain?", options: ["Romazava", "Kabuli Pulao", "Sarmale", "Machboos"], answer: 3 },
      { question: "Which famous landmark can you find in Bahrain?", options: ["Chichén Itzá", "Bahrain Fort", "Old Havana", "Geirangerfjord"], answer: 1 },
    ],
  },
  {
    id: "bangladesh", name: "Bangladesh", flag: "🇧🇩", continent: "Asia", mapId: "BD",
    capital: "Dhaka", language: "Bengali", population: "170 million",
    famousFood: "Hilsa Fish Curry", famousLandmark: "Sundarbans Mangrove Forest",
    funFact: "Bangladesh has the world's largest mangrove forest, home to Bengal tigers!",
    quizQuestions: [
      { question: "What is the capital city of Bangladesh?", options: ["San Marino", "Sarajevo", "Dhaka", "Antananarivo"], answer: 2 },
      { question: "Which of these foods is famous in Bangladesh?", options: ["Brik", "Fungie & Pepperpot", "Sancocho", "Hilsa Fish Curry"], answer: 3 },
      { question: "Which famous landmark can you find in Bangladesh?", options: ["Sundarbans Mangrove Forest", "Kalandula Falls", "Kaieteur Falls", "Source of the Nile"], answer: 0 },
    ],
  },
  {
    id: "bhutan", name: "Bhutan", flag: "🇧🇹", continent: "Asia", mapId: "BT",
    capital: "Thimphu", language: "Dzongkha", population: "780 thousand",
    famousFood: "Ema Datshi", famousLandmark: "Tiger's Nest Monastery",
    funFact: "Bhutan measures Gross National Happiness instead of just money!",
    quizQuestions: [
      { question: "What is the capital city of Bhutan?", options: ["Copenhagen", "Thimphu", "Oslo", "San Salvador"], answer: 1 },
      { question: "Which of these foods is famous in Bhutan?", options: ["Nyembwe Chicken", "Poutine & Maple Syrup", "Trdelník", "Ema Datshi"], answer: 3 },
      { question: "Which famous landmark can you find in Bhutan?", options: ["Tiger's Nest Monastery", "Lopé National Park", "Great Blue Hole", "Petronas Twin Towers"], answer: 0 },
    ],
  },
  {
    id: "brunei", name: "Brunei", flag: "🇧🇳", continent: "Asia", mapId: "BN",
    capital: "Bandar Seri Begawan", language: "Malay", population: "450 thousand",
    famousFood: "Ambuyat", famousLandmark: "Sultan Omar Ali Saifuddien Mosque",
    funFact: "Brunei's sultan lives in the world's largest residential palace!",
    quizQuestions: [
      { question: "What is the capital city of Brunei?", options: ["Ljubljana", "Gaborone", "Bandar Seri Begawan", "Funafuti"], answer: 2 },
      { question: "Which of these foods is famous in Brunei?", options: ["Fufu & Peanut Soup", "Griot (fried pork)", "Conch Fritters", "Ambuyat"], answer: 3 },
      { question: "Which famous landmark can you find in Brunei?", options: ["Kuwait Towers", "Kalandula Falls", "Sultan Omar Ali Saifuddien Mosque", "Itaipu Dam"], answer: 2 },
    ],
  },
  {
    id: "cambodia", name: "Cambodia", flag: "🇰🇭", continent: "Asia", mapId: "KH",
    capital: "Phnom Penh", language: "Khmer", population: "17 million",
    famousFood: "Fish Amok", famousLandmark: "Angkor Wat",
    funFact: "Angkor Wat is the largest religious building in the entire world!",
    quizQuestions: [
      { question: "What is the capital city of Cambodia?", options: ["Phnom Penh", "Warsaw", "Reykjavik", "Minsk"], answer: 0 },
      { question: "Which of these foods is famous in Cambodia?", options: ["Banitsa", "Kabuli Pulao", "Pepperpot", "Fish Amok"], answer: 3 },
      { question: "Which famous landmark can you find in Cambodia?", options: ["Great Mosque of Djenné", "Angkor Wat", "Lake Assal", "Christ the Redeemer"], answer: 1 },
    ],
  },
  {
    id: "china", name: "China", flag: "🇨🇳", continent: "Asia", mapId: "CN",
    capital: "Beijing", language: "Mandarin Chinese", population: "1.4 billion",
    famousFood: "Dumplings & Noodles", famousLandmark: "Great Wall of China",
    funFact: "The Great Wall of China is over 13,000 miles long!",
    quizQuestions: [
      { question: "What is the capital of China?", options: ["Shanghai", "Beijing", "Hong Kong", "Guangzhou"], answer: 1 },
      { question: "What famous wall is in China?", options: ["Berlin Wall", "Great Wall", "Hadrian's Wall", "Western Wall"], answer: 1 },
      { question: "What language is most spoken in China?", options: ["Japanese", "Korean", "Mandarin", "Thai"], answer: 2 },
    ],
  },
  {
    id: "cyprus", name: "Cyprus", flag: "🇨🇾", continent: "Asia", mapId: "CY",
    capital: "Nicosia", language: "Greek & Turkish", population: "1.2 million",
    famousFood: "Halloumi Cheese", famousLandmark: "Paphos Archaeological Park",
    funFact: "Cyprus is the third largest island in the Mediterranean Sea!",
    quizQuestions: [
      { question: "What is the capital city of Cyprus?", options: ["Roseau", "Nicosia", "Bangkok", "San José"], answer: 1 },
      { question: "Which of these foods is famous in Cyprus?", options: ["Kokoda (raw fish salad)", "Mămăligă (cornmeal porridge)", "Bobotie & Biltong", "Halloumi Cheese"], answer: 3 },
      { question: "Which famous landmark can you find in Cyprus?", options: ["Paphos Archaeological Park", "Riga Central Market", "Iskanderkul Lake", "Victoria Falls"], answer: 0 },
    ],
  },
  {
    id: "georgia", name: "Georgia", flag: "🇬🇪", continent: "Asia", mapId: "GE",
    capital: "Tbilisi", language: "Georgian", population: "3.7 million",
    famousFood: "Khachapuri (cheese bread)", famousLandmark: "Narikala Fortress",
    funFact: "Georgia is one of the oldest wine-making countries in the world — over 8,000 years!",
    quizQuestions: [
      { question: "What is the capital city of Georgia?", options: ["Kuala Lumpur", "Kinshasa", "Tbilisi", "Prague"], answer: 2 },
      { question: "Which of these foods is famous in Georgia?", options: ["Injera with Zigni", "Biryani & Nihari", "Ugali & Mishkaki", "Khachapuri (cheese bread)"], answer: 3 },
      { question: "Which famous landmark can you find in Georgia?", options: ["Nan Madol Ruins", "Brandenburg Gate", "Narikala Fortress", "Bijagós Archipelago"], answer: 2 },
    ],
  },
  {
    id: "india", name: "India", flag: "🇮🇳", continent: "Asia", mapId: "IN",
    capital: "New Delhi", language: "Hindi & English", population: "1.4 billion",
    famousFood: "Curry & Biryani", famousLandmark: "Taj Mahal",
    funFact: "India has the most languages spoken in any single country — over 780!",
    quizQuestions: [
      { question: "What famous building is in India?", options: ["Eiffel Tower", "Taj Mahal", "Colosseum", "Big Ben"], answer: 1 },
      { question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], answer: 1 },
      { question: "What food is India famous for?", options: ["Sushi", "Curry", "Pasta", "Hamburgers"], answer: 1 },
    ],
  },
  {
    id: "indonesia", name: "Indonesia", flag: "🇮🇩", continent: "Asia", mapId: "ID",
    capital: "Jakarta", language: "Indonesian", population: "275 million",
    famousFood: "Nasi Goreng", famousLandmark: "Borobudur Temple",
    funFact: "Indonesia has over 17,000 islands — the most of any country!",
    quizQuestions: [
      { question: "What is the capital city of Indonesia?", options: ["Kingstown", "Windhoek", "Jakarta", "San José"], answer: 2 },
      { question: "Which of these foods is famous in Indonesia?", options: ["Green Fig & Saltfish", "Dal Bhat", "Hummus & Falafel", "Nasi Goreng"], answer: 3 },
      { question: "Which famous landmark can you find in Indonesia?", options: ["Shwedagon Pagoda", "Swimming Pigs Beach", "Borobudur Temple", "Citadelle Laferrière"], answer: 2 },
    ],
  },
  {
    id: "iran", name: "Iran", flag: "🇮🇷", continent: "Asia", mapId: "IR",
    capital: "Tehran", language: "Persian (Farsi)", population: "87 million",
    famousFood: "Chelo Kebab", famousLandmark: "Persepolis",
    funFact: "Iran invented ice cream over 2,000 years ago!",
    quizQuestions: [
      { question: "What is the capital city of Iran?", options: ["Tehran", "Harare", "Vienna", "Kigali"], answer: 0 },
      { question: "Which of these foods is famous in Iran?", options: ["Smørrebrød", "Hummus & Falafel", "Khachapuri (cheese bread)", "Chelo Kebab"], answer: 3 },
      { question: "Which famous landmark can you find in Iran?", options: ["Sundarbans Mangrove Forest", "Persepolis", "Ice Hotel", "Trakai Island Castle"], answer: 1 },
    ],
  },
  {
    id: "iraq", name: "Iraq", flag: "🇮🇶", continent: "Asia", mapId: "IQ",
    capital: "Baghdad", language: "Arabic & Kurdish", population: "43 million",
    famousFood: "Masgouf (grilled fish)", famousLandmark: "Ziggurat of Ur",
    funFact: "Iraq is home to one of the oldest civilizations in history — ancient Mesopotamia!",
    quizQuestions: [
      { question: "What is the capital city of Iraq?", options: ["Castries", "Kuwait City", "Baghdad", "Amman"], answer: 2 },
      { question: "Which of these foods is famous in Iraq?", options: ["Kokoda (raw fish salad)", "Calulu", "Mountain Chicken (frog legs)", "Masgouf (grilled fish)"], answer: 3 },
      { question: "Which famous landmark can you find in Iraq?", options: ["Colonial Zone of Santo Domingo", "Dzanga-Sangha Reserve", "Ziggurat of Ur", "Hassan II Mosque"], answer: 2 },
    ],
  },
  {
    id: "japan", name: "Japan", flag: "🇯🇵", continent: "Asia", mapId: "JP",
    capital: "Tokyo", language: "Japanese", population: "125 million",
    famousFood: "Sushi & Ramen", famousLandmark: "Mount Fuji",
    funFact: "Japan has more than 6,800 islands!",
    quizQuestions: [
      { question: "What is the capital of Japan?", options: ["Osaka", "Tokyo", "Kyoto", "Nagoya"], answer: 1 },
      { question: "What famous mountain is in Japan?", options: ["Mount Everest", "Mount Fuji", "Mount Kilimanjaro", "Mount Blanc"], answer: 1 },
      { question: "What food is Japan famous for?", options: ["Tacos", "Pizza", "Sushi", "Hamburgers"], answer: 2 },
    ],
  },
  {
    id: "jordan", name: "Jordan", flag: "🇯🇴", continent: "Asia", mapId: "JO",
    capital: "Amman", language: "Arabic", population: "11 million",
    famousFood: "Mansaf", famousLandmark: "Petra",
    funFact: "The ancient city of Petra was carved right into pink rock cliffs!",
    quizQuestions: [
      { question: "What is the capital city of Jordan?", options: ["Budapest", "Bissau", "Amman", "Ashgabat"], answer: 2 },
      { question: "Which of these foods is famous in Jordan?", options: ["Skoudehkaris", "Waffles & Chocolate", "Seswaa", "Mansaf"], answer: 3 },
      { question: "Which famous landmark can you find in Jordan?", options: ["Kaieteur Falls", "Megalithic Temples", "Petra", "Tiger's Nest Monastery"], answer: 2 },
    ],
  },
  {
    id: "kazakhstan", name: "Kazakhstan", flag: "🇰🇿", continent: "Asia", mapId: "KZ",
    capital: "Astana", language: "Kazakh & Russian", population: "19 million",
    famousFood: "Beshbarmak", famousLandmark: "Bayterek Tower",
    funFact: "Kazakhstan is the largest landlocked country in the world!",
    quizQuestions: [
      { question: "What is the capital city of Kazakhstan?", options: ["Astana", "Thimphu", "Ouagadougou", "Hanoi"], answer: 0 },
      { question: "Which of these foods is famous in Kazakhstan?", options: ["Injera & Doro Wat", "Hainanese Chicken Rice", "Brik", "Beshbarmak"], answer: 3 },
      { question: "Which famous landmark can you find in Kazakhstan?", options: ["Great Blue Hole", "Bayterek Tower", "Stari Most (Old Bridge)", "Central Suriname Nature Reserve"], answer: 1 },
    ],
  },
  {
    id: "kuwait", name: "Kuwait", flag: "🇰🇼", continent: "Asia", mapId: "KW",
    capital: "Kuwait City", language: "Arabic", population: "4.3 million",
    famousFood: "Machboos", famousLandmark: "Kuwait Towers",
    funFact: "Kuwait has some of the hottest temperatures ever recorded on Earth!",
    quizQuestions: [
      { question: "What is the capital city of Kuwait?", options: ["Singapore", "Phnom Penh", "Kuwait City", "Lilongwe"], answer: 2 },
      { question: "Which of these foods is famous in Kuwait?", options: ["Hilsa Fish Curry", "Rice and Beans", "Seswaa", "Machboos"], answer: 3 },
      { question: "Which famous landmark can you find in Kuwait?", options: ["Monte Alen National Park", "Kunta Kinteh Island", "Kuwait Towers", "Three Towers of San Marino"], answer: 2 },
    ],
  },
  {
    id: "kyrgyzstan", name: "Kyrgyzstan", flag: "🇰🇬", continent: "Asia", mapId: "KG",
    capital: "Bishkek", language: "Kyrgyz & Russian", population: "7 million",
    famousFood: "Beshbarmak", famousLandmark: "Issyk-Kul Lake",
    funFact: "Kyrgyzstan has a giant mountain lake that never freezes, even in winter!",
    quizQuestions: [
      { question: "What is the capital city of Kyrgyzstan?", options: ["Lilongwe", "Bishkek", "Paris", "Bridgetown"], answer: 1 },
      { question: "Which of these foods is famous in Kyrgyzstan?", options: ["Plov", "Oil Down", "Draniki (potato pancakes)", "Beshbarmak"], answer: 3 },
      { question: "Which famous landmark can you find in Kyrgyzstan?", options: ["Issyk-Kul Lake", "Pyramids of Meroë", "Avenue of the Baobabs", "Parthenon"], answer: 0 },
    ],
  },
  {
    id: "laos", name: "Laos", flag: "🇱🇦", continent: "Asia", mapId: "LA",
    capital: "Vientiane", language: "Lao", population: "7.5 million",
    famousFood: "Laap", famousLandmark: "Kuang Si Waterfalls",
    funFact: "Laos has turquoise blue waterfalls that look like something from a fairy tale!",
    quizQuestions: [
      { question: "What is the capital city of Laos?", options: ["Wellington", "Vientiane", "Cairo", "Panama City"], answer: 1 },
      { question: "Which of these foods is famous in Laos?", options: ["Beshbarmak", "Poulet Yassa", "Mohinga", "Laap"], answer: 3 },
      { question: "Which famous landmark can you find in Laos?", options: ["Basilica of Our Lady of Peace", "Virunga National Park", "Kuang Si Waterfalls", "Iguazu Falls"], answer: 2 },
    ],
  },
  {
    id: "lebanon", name: "Lebanon", flag: "🇱🇧", continent: "Asia", mapId: "LB",
    capital: "Beirut", language: "Arabic", population: "5.5 million",
    famousFood: "Hummus & Falafel", famousLandmark: "Baalbek Temples",
    funFact: "Lebanon has ancient cedar trees on its flag — some are over 1,000 years old!",
    quizQuestions: [
      { question: "What is the capital city of Lebanon?", options: ["Beirut", "Juba", "Honiara", "Thimphu"], answer: 0 },
      { question: "Which of these foods is famous in Lebanon?", options: ["Ndolé", "Sadza", "Laplap", "Hummus & Falafel"], answer: 3 },
      { question: "Which famous landmark can you find in Lebanon?", options: ["Mount Nimba", "Baalbek Temples", "Buada Lagoon", "Sibebe Rock"], answer: 1 },
    ],
  },
  {
    id: "malaysia", name: "Malaysia", flag: "🇲🇾", continent: "Asia", mapId: "MY",
    capital: "Kuala Lumpur", language: "Malay", population: "33 million",
    famousFood: "Nasi Lemak", famousLandmark: "Petronas Twin Towers",
    funFact: "Malaysia has the oldest tropical rainforest in the world — 130 million years old!",
    quizQuestions: [
      { question: "What is the capital city of Malaysia?", options: ["Kuala Lumpur", "Helsinki", "Rome", "Banjul"], answer: 0 },
      { question: "Which of these foods is famous in Malaysia?", options: ["Fish & Chips", "Ema Datshi", "Nasi Goreng", "Nasi Lemak"], answer: 3 },
      { question: "Which famous landmark can you find in Malaysia?", options: ["Monte Alen National Park", "Bioluminescent Beaches", "Petronas Twin Towers", "Brimstone Hill Fortress"], answer: 2 },
    ],
  },
  {
    id: "maldives", name: "Maldives", flag: "🇲🇻", continent: "Asia", mapId: "MV",
    capital: "Malé", language: "Dhivehi", population: "520 thousand",
    famousFood: "Garudhiya (fish soup)", famousLandmark: "Bioluminescent Beaches",
    funFact: "Maldives is the flattest country on Earth — its highest point is only about 2 meters!",
    quizQuestions: [
      { question: "What is the capital city of Maldives?", options: ["Malé", "Damascus", "Belgrade", "Ankara"], answer: 0 },
      { question: "Which of these foods is famous in Maldives?", options: ["Skoudehkaris", "Romazava", "Ambuyat", "Garudhiya (fish soup)"], answer: 3 },
      { question: "Which famous landmark can you find in Maldives?", options: ["Volcanoes National Park", "Bioluminescent Beaches", "Colonial Zone of Santo Domingo", "Dubrovnik Old Town"], answer: 1 },
    ],
  },
  {
    id: "mongolia", name: "Mongolia", flag: "🇲🇳", continent: "Asia", mapId: "MN",
    capital: "Ulaanbaatar", language: "Mongolian", population: "3.4 million",
    famousFood: "Buuz (dumplings)", famousLandmark: "Genghis Khan Statue",
    funFact: "Mongolia has more horses than people!",
    quizQuestions: [
      { question: "What is the capital city of Mongolia?", options: ["Ashgabat", "Ulaanbaatar", "Buenos Aires", "Zagreb"], answer: 1 },
      { question: "Which of these foods is famous in Mongolia?", options: ["Borscht & Blini", "Pizza & Pasta", "Sancocho", "Buuz (dumplings)"], answer: 3 },
      { question: "Which famous landmark can you find in Mongolia?", options: ["Arenal Volcano", "Lake Malawi", "Genghis Khan Statue", "Chichén Itzá"], answer: 2 },
    ],
  },
  {
    id: "myanmar", name: "Myanmar", flag: "🇲🇲", continent: "Asia", mapId: "MM",
    capital: "Naypyidaw", language: "Burmese", population: "55 million",
    famousFood: "Mohinga", famousLandmark: "Shwedagon Pagoda",
    funFact: "Myanmar has a golden pagoda covered in real gold and diamonds!",
    quizQuestions: [
      { question: "What is the capital city of Myanmar?", options: ["Luanda", "Naypyidaw", "Moroni", "Quito"], answer: 1 },
      { question: "Which of these foods is famous in Myanmar?", options: ["Coconut Fish", "Brunost (brown cheese)", "Sishwala", "Mohinga"], answer: 3 },
      { question: "Which famous landmark can you find in Myanmar?", options: ["Shwedagon Pagoda", "Maletsunyane Falls", "Galápagos Islands", "Belém Tower"], answer: 0 },
    ],
  },
  {
    id: "nepal", name: "Nepal", flag: "🇳🇵", continent: "Asia", mapId: "NP",
    capital: "Kathmandu", language: "Nepali", population: "30 million",
    famousFood: "Dal Bhat", famousLandmark: "Mount Everest",
    funFact: "Nepal is home to Mount Everest, the tallest mountain in the world!",
    quizQuestions: [
      { question: "What is the capital city of Nepal?", options: ["Kathmandu", "Apia", "Zagreb", "Ankara"], answer: 0 },
      { question: "Which of these foods is famous in Nepal?", options: ["Green Fig & Saltfish", "Laplap", "Pulaka", "Dal Bhat"], answer: 3 },
      { question: "Which famous landmark can you find in Nepal?", options: ["Victoria Falls", "Itaipu Dam", "Mount Everest", "Ha'amonga 'a Maui Trilithon"], answer: 2 },
    ],
  },
  {
    id: "north-korea", name: "North Korea", flag: "🇰🇵", continent: "Asia", mapId: "KP",
    capital: "Pyongyang", language: "Korean", population: "26 million",
    famousFood: "Naengmyeon (cold noodles)", famousLandmark: "Juche Tower",
    funFact: "North Korea has its own calendar that starts from the year its founder was born!",
    quizQuestions: [
      { question: "What is the capital city of North Korea?", options: ["Pyongyang", "St. John's", "Monaco", "Bridgetown"], answer: 0 },
      { question: "Which of these foods is famous in North Korea?", options: ["Jollof Rice", "Caldo de Mancarra", "Dholl Puri", "Naengmyeon (cold noodles)"], answer: 3 },
      { question: "Which famous landmark can you find in North Korea?", options: ["Brandenburg Gate", "Juche Tower", "Statue of Liberty", "Shwedagon Pagoda"], answer: 1 },
    ],
  },
  {
    id: "oman", name: "Oman", flag: "🇴🇲", continent: "Asia", mapId: "OM",
    capital: "Muscat", language: "Arabic", population: "5.2 million",
    famousFood: "Shuwa", famousLandmark: "Sultan Qaboos Grand Mosque",
    funFact: "Oman has beautiful hidden water pools in the desert called wadis!",
    quizQuestions: [
      { question: "What is the capital city of Oman?", options: ["Muscat", "Baghdad", "Kuwait City", "Vilnius"], answer: 0 },
      { question: "Which of these foods is famous in Oman?", options: ["Kebabs & Baklava", "Pupusas", "Dal Bhat", "Shuwa"], answer: 3 },
      { question: "Which famous landmark can you find in Oman?", options: ["Christmas Island", "Statue of Liberty", "Sultan Qaboos Grand Mosque", "Christ the Redeemer"], answer: 2 },
    ],
  },
  {
    id: "pakistan", name: "Pakistan", flag: "🇵🇰", continent: "Asia", mapId: "PK",
    capital: "Islamabad", language: "Urdu & English", population: "230 million",
    famousFood: "Biryani & Nihari", famousLandmark: "Badshahi Mosque",
    funFact: "Pakistan has the second-highest mountain in the world — K2!",
    quizQuestions: [
      { question: "What is the capital city of Pakistan?", options: ["Kyiv", "Islamabad", "Budapest", "Kingstown"], answer: 1 },
      { question: "Which of these foods is famous in Pakistan?", options: ["Qurutob", "Roti", "Cepelinai (potato dumplings)", "Biryani & Nihari"], answer: 3 },
      { question: "Which famous landmark can you find in Pakistan?", options: ["Badshahi Mosque", "Shwedagon Pagoda", "Bran Castle (Dracula's Castle)", "Petra"], answer: 0 },
    ],
  },
  {
    id: "palestine", name: "Palestine", flag: "🇵🇸", continent: "Asia", mapId: "PS",
    capital: "Jerusalem (East)", language: "Arabic", population: "5.4 million",
    famousFood: "Musakhan & Knafeh", famousLandmark: "Dome of the Rock",
    funFact: "Palestine has one of the oldest cities in the world — Jericho, over 10,000 years old!",
    quizQuestions: [
      { question: "What is the capital city of Palestine?", options: ["Victoria", "Jerusalem (East)", "Manila", "Damascus"], answer: 1 },
      { question: "Which of these foods is famous in Palestine?", options: ["Biryani & Nihari", "Bandeja Paisa", "Peka", "Musakhan & Knafeh"], answer: 3 },
      { question: "Which famous landmark can you find in Palestine?", options: ["Kalandula Falls", "Bayterek Tower", "Dome of the Rock", "Angel Falls"], answer: 2 },
    ],
  },
  {
    id: "philippines", name: "Philippines", flag: "🇵🇭", continent: "Asia", mapId: "PH",
    capital: "Manila", language: "Filipino & English", population: "115 million",
    famousFood: "Adobo", famousLandmark: "Chocolate Hills",
    funFact: "The Philippines has over 7,000 islands!",
    quizQuestions: [
      { question: "What is the capital city of Philippines?", options: ["Manila", "Manama", "Asunción", "Malabo"], answer: 0 },
      { question: "Which of these foods is famous in Philippines?", options: ["Sopa Paraguaya", "Gyros & Moussaka", "Fungie & Pepperpot", "Adobo"], answer: 3 },
      { question: "Which famous landmark can you find in Philippines?", options: ["Bikini Atoll", "Chocolate Hills", "Volcanoes National Park", "Mount Nimba"], answer: 1 },
    ],
  },
  {
    id: "qatar", name: "Qatar", flag: "🇶🇦", continent: "Asia", mapId: "QA",
    capital: "Doha", language: "Arabic", population: "2.9 million",
    famousFood: "Machboos", famousLandmark: "Museum of Islamic Art",
    funFact: "Qatar hosted the FIFA World Cup in 2022!",
    quizQuestions: [
      { question: "What is the capital city of Qatar?", options: ["Doha", "Singapore", "Majuro", "Vatican City"], answer: 0 },
      { question: "Which of these foods is famous in Qatar?", options: ["Pepián", "Poulet Yassa", "Kelaguen", "Machboos"], answer: 3 },
      { question: "Which famous landmark can you find in Qatar?", options: ["Sossusvlei Sand Dunes", "Museum of Islamic Art", "Leptis Magna", "Sudd Wetland"], answer: 1 },
    ],
  },
  {
    id: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", continent: "Asia", mapId: "SA",
    capital: "Riyadh", language: "Arabic", population: "36 million",
    famousFood: "Kabsa", famousLandmark: "Al-Masjid al-Haram (Grand Mosque)",
    funFact: "Saudi Arabia has a desert called the Empty Quarter — it's the largest sand desert in the world!",
    quizQuestions: [
      { question: "What is the capital city of Saudi Arabia?", options: ["Ulaanbaatar", "Nuku'alofa", "Riyadh", "Damascus"], answer: 2 },
      { question: "Which of these foods is famous in Saudi Arabia?", options: ["Shawarma & Kibbeh", "Green Fig & Saltfish", "Cepelinai (potato dumplings)", "Kabsa"], answer: 3 },
      { question: "Which famous landmark can you find in Saudi Arabia?", options: ["Casbah of Algiers", "Al-Masjid al-Haram (Grand Mosque)", "Bran Castle (Dracula's Castle)", "Itaipu Dam"], answer: 1 },
    ],
  },
  {
    id: "singapore", name: "Singapore", flag: "🇸🇬", continent: "Asia", mapId: "SG",
    capital: "Singapore", language: "English, Malay, Mandarin & Tamil", population: "5.9 million",
    famousFood: "Hainanese Chicken Rice", famousLandmark: "Marina Bay Sands",
    funFact: "Singapore is both a city and a country at the same time!",
    quizQuestions: [
      { question: "What is the capital city of Singapore?", options: ["Castries", "Singapore", "Dhaka", "San Salvador"], answer: 1 },
      { question: "Which of these foods is famous in Singapore?", options: ["Sopa Paraguaya", "Injera with Zigni", "Fufu & Pondu", "Hainanese Chicken Rice"], answer: 3 },
      { question: "Which famous landmark can you find in Singapore?", options: ["Marina Bay Sands", "Matterhorn", "Narikala Fortress", "Christmas Island"], answer: 0 },
    ],
  },
  {
    id: "south-korea", name: "South Korea", flag: "🇰🇷", continent: "Asia", mapId: "KR",
    capital: "Seoul", language: "Korean", population: "52 million",
    famousFood: "Kimchi & Bibimbap", famousLandmark: "Gyeongbokgung Palace",
    funFact: "South Korea has the fastest internet in the world!",
    quizQuestions: [
      { question: "What is the capital of South Korea?", options: ["Busan", "Seoul", "Incheon", "Daegu"], answer: 1 },
      { question: "What fermented food is Korea famous for?", options: ["Sauerkraut", "Kimchi", "Yogurt", "Pickles"], answer: 1 },
      { question: "What continent is South Korea in?", options: ["Europe", "Africa", "Asia", "South America"], answer: 2 },
    ],
  },
  {
    id: "sri-lanka", name: "Sri Lanka", flag: "🇱🇰", continent: "Asia", mapId: "LK",
    capital: "Sri Jayawardenepura Kotte", language: "Sinhala & Tamil", population: "22 million",
    famousFood: "Rice & Curry", famousLandmark: "Sigiriya Rock Fortress",
    funFact: "Sri Lanka is shaped like a teardrop and is called the 'Pearl of the Indian Ocean'!",
    quizQuestions: [
      { question: "What is the capital city of Sri Lanka?", options: ["Sri Jayawardenepura Kotte", "Valletta", "Castries", "Riyadh"], answer: 0 },
      { question: "Which of these foods is famous in Sri Lanka?", options: ["Ikan Saboko", "Ema Datshi", "Empanadas & Pastel de Choclo", "Rice & Curry"], answer: 3 },
      { question: "Which famous landmark can you find in Sri Lanka?", options: ["Sigiriya Rock Fortress", "Marovo Lagoon", "Ennedi Plateau", "Joya de Cerén"], answer: 0 },
    ],
  },
  {
    id: "syria", name: "Syria", flag: "🇸🇾", continent: "Asia", mapId: "SY",
    capital: "Damascus", language: "Arabic", population: "22 million",
    famousFood: "Shawarma & Kibbeh", famousLandmark: "Krak des Chevaliers",
    funFact: "Damascus is one of the oldest continuously lived-in cities in the world!",
    quizQuestions: [
      { question: "What is the capital city of Syria?", options: ["Malé", "Skopje", "Damascus", "Thimphu"], answer: 2 },
      { question: "Which of these foods is famous in Syria?", options: ["Ugali & Mishkaki", "Chivito", "Pupusas", "Shawarma & Kibbeh"], answer: 3 },
      { question: "Which famous landmark can you find in Syria?", options: ["Stari Most (Old Bridge)", "Krak des Chevaliers", "Three Towers of San Marino", "Hungarian Parliament Building"], answer: 1 },
    ],
  },
  {
    id: "tajikistan", name: "Tajikistan", flag: "🇹🇯", continent: "Asia", mapId: "TJ",
    capital: "Dushanbe", language: "Tajik", population: "10 million",
    famousFood: "Qurutob", famousLandmark: "Iskanderkul Lake",
    funFact: "Over 90% of Tajikistan is covered by mountains!",
    quizQuestions: [
      { question: "What is the capital city of Tajikistan?", options: ["Dushanbe", "Riga", "Rabat", "Maputo"], answer: 0 },
      { question: "Which of these foods is famous in Tajikistan?", options: ["Djerma Stew", "Nsima", "Langouste à la Vanille", "Qurutob"], answer: 3 },
      { question: "Which famous landmark can you find in Tajikistan?", options: ["Mount Nimba", "Iskanderkul Lake", "Sibebe Rock", "Garden of the Sleeping Giant"], answer: 1 },
    ],
  },
  {
    id: "thailand", name: "Thailand", flag: "🇹🇭", continent: "Asia", mapId: "TH",
    capital: "Bangkok", language: "Thai", population: "72 million",
    famousFood: "Pad Thai & Tom Yum", famousLandmark: "Grand Palace",
    funFact: "Thailand is called 'The Land of Smiles' because people are so friendly!",
    quizQuestions: [
      { question: "What is the capital of Thailand?", options: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"], answer: 1 },
      { question: "What is Thailand's nickname?", options: ["Land of Fire", "Land of Smiles", "Land of Ice", "Land of Gold"], answer: 1 },
      { question: "What noodle dish is Thailand famous for?", options: ["Ramen", "Pad Thai", "Spaghetti", "Lo Mein"], answer: 1 },
    ],
  },
  {
    id: "timor-leste", name: "Timor-Leste", flag: "🇹🇱", continent: "Asia", mapId: "TL",
    capital: "Dili", language: "Tetum & Portuguese", population: "1.3 million",
    famousFood: "Ikan Saboko", famousLandmark: "Cristo Rei of Dili",
    funFact: "Timor-Leste is one of the youngest countries in Asia — it became independent in 2002!",
    quizQuestions: [
      { question: "What is the capital city of Timor-Leste?", options: ["Guatemala City", "Dili", "Brazzaville", "Dakar"], answer: 1 },
      { question: "Which of these foods is famous in Timor-Leste?", options: ["Green Fig & Saltfish", "Daraba", "Fish Amok", "Ikan Saboko"], answer: 3 },
      { question: "Which famous landmark can you find in Timor-Leste?", options: ["Cristo Rei of Dili", "Galápagos Islands", "The Little Mermaid Statue", "Boiling Lake"], answer: 0 },
    ],
  },
  {
    id: "turkey", name: "Turkey", flag: "🇹🇷", continent: "Asia", mapId: "TR",
    capital: "Ankara", language: "Turkish", population: "85 million",
    famousFood: "Kebabs & Baklava", famousLandmark: "Hagia Sophia",
    funFact: "Turkey is on two continents at once — Europe and Asia!",
    quizQuestions: [
      { question: "What is the capital city of Turkey?", options: ["Bratislava", "Majuro", "Ankara", "Freetown"], answer: 2 },
      { question: "Which of these foods is famous in Turkey?", options: ["Ema Datshi", "Kimchi & Bibimbap", "Njeguški Steak", "Kebabs & Baklava"], answer: 3 },
      { question: "Which famous landmark can you find in Turkey?", options: ["Hagia Sophia", "Petra", "Providence Island", "Machu Picchu"], answer: 0 },
    ],
  },
  {
    id: "turkmenistan", name: "Turkmenistan", flag: "🇹🇲", continent: "Asia", mapId: "TM",
    capital: "Ashgabat", language: "Turkmen", population: "6.3 million",
    famousFood: "Plov", famousLandmark: "Door to Hell (Darvaza Crater)",
    funFact: "Turkmenistan has a giant flaming crater called the 'Door to Hell' that has been burning for over 50 years!",
    quizQuestions: [
      { question: "What is the capital city of Turkmenistan?", options: ["Ashgabat", "Niamey", "Sri Jayawardenepura Kotte", "Port Moresby"], answer: 0 },
      { question: "Which of these foods is famous in Turkmenistan?", options: ["Pastizzi", "Paella & Tapas", "Waffles & Chocolate", "Plov"], answer: 3 },
      { question: "Which famous landmark can you find in Turkmenistan?", options: ["Dome of the Rock", "Door to Hell (Darvaza Crater)", "Orheiul Vechi Monastery", "Virunga National Park"], answer: 1 },
    ],
  },
  {
    id: "united-arab-emirates", name: "United Arab Emirates", flag: "🇦🇪", continent: "Asia", mapId: "AE",
    capital: "Abu Dhabi", language: "Arabic", population: "10 million",
    famousFood: "Al Harees", famousLandmark: "Burj Khalifa",
    funFact: "The Burj Khalifa in Dubai is the tallest building in the world!",
    quizQuestions: [
      { question: "What is the capital city of United Arab Emirates?", options: ["Skopje", "Bridgetown", "Abu Dhabi", "Lusaka"], answer: 2 },
      { question: "Which of these foods is famous in United Arab Emirates?", options: ["Wiener Schnitzel", "Nasi Lemak", "Tiguadege Na", "Al Harees"], answer: 3 },
      { question: "Which famous landmark can you find in United Arab Emirates?", options: ["Galápagos Islands", "Burj Khalifa", "Geirangerfjord", "Spiš Castle"], answer: 1 },
    ],
  },
  {
    id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿", continent: "Asia", mapId: "UZ",
    capital: "Tashkent", language: "Uzbek", population: "35 million",
    famousFood: "Plov", famousLandmark: "Registan Square",
    funFact: "Uzbekistan has beautiful blue-tiled buildings that are over 600 years old!",
    quizQuestions: [
      { question: "What is the capital city of Uzbekistan?", options: ["Kampala", "Tashkent", "Amsterdam", "Dodoma"], answer: 1 },
      { question: "Which of these foods is famous in Uzbekistan?", options: ["Sopa Paraguaya", "Pupusas", "Karelian Pies", "Plov"], answer: 3 },
      { question: "Which famous landmark can you find in Uzbekistan?", options: ["Registan Square", "Swimming Pigs Beach", "Kuang Si Waterfalls", "Belém Tower"], answer: 0 },
    ],
  },
  {
    id: "vietnam", name: "Vietnam", flag: "🇻🇳", continent: "Asia", mapId: "VN",
    capital: "Hanoi", language: "Vietnamese", population: "99 million",
    famousFood: "Phở & Bánh Mì", famousLandmark: "Ha Long Bay",
    funFact: "Ha Long Bay has thousands of limestone islands that rise out of emerald green water!",
    quizQuestions: [
      { question: "What is the capital city of Vietnam?", options: ["Madrid", "Stockholm", "Hanoi", "Maseru"], answer: 2 },
      { question: "Which of these foods is famous in Vietnam?", options: ["Escudella", "Koshari & Falafel", "Coconut Crab", "Phở & Bánh Mì"], answer: 3 },
      { question: "Which famous landmark can you find in Vietnam?", options: ["Richat Structure (Eye of the Sahara)", "Bikini Atoll", "Ha Long Bay", "Mount Karthala"], answer: 2 },
    ],
  },
  {
    id: "yemen", name: "Yemen", flag: "🇾🇪", continent: "Asia", mapId: "YE",
    capital: "Sana'a", language: "Arabic", population: "34 million",
    famousFood: "Saltah", famousLandmark: "Old City of Sana'a",
    funFact: "Yemen has Socotra Island, where trees look like they're from another planet!",
    quizQuestions: [
      { question: "What is the capital city of Yemen?", options: ["Dushanbe", "Sana'a", "Port of Spain", "Rome"], answer: 1 },
      { question: "Which of these foods is famous in Yemen?", options: ["Nasi Goreng", "Brunost (brown cheese)", "Kapana", "Saltah"], answer: 3 },
      { question: "Which famous landmark can you find in Yemen?", options: ["Old City of Sana'a", "Trakai Island Castle", "Virunga National Park", "Petra"], answer: 0 },
    ],
  },

  // ===== EUROPE (44) =====
  {
    id: "albania", name: "Albania", flag: "🇦🇱", continent: "Europe", mapId: "AL",
    capital: "Tirana", language: "Albanian", population: "2.8 million",
    famousFood: "Byrek", famousLandmark: "Berat Castle",
    funFact: "Albania has over 750,000 bunkers built during the Cold War — they're everywhere!",
    quizQuestions: [
      { question: "What is the capital city of Albania?", options: ["Bangui", "Sofia", "Tirana", "Bogotá"], answer: 2 },
      { question: "Which of these foods is famous in Albania?", options: ["Kisra", "Dumplings & Noodles", "Fish Amok", "Byrek"], answer: 3 },
      { question: "Which famous landmark can you find in Albania?", options: ["St. Peter's Basilica", "Al-Masjid al-Haram (Grand Mosque)", "Berat Castle", "Machu Picchu"], answer: 2 },
    ],
  },
  {
    id: "andorra", name: "Andorra", flag: "🇦🇩", continent: "Europe", mapId: "AD",
    capital: "Andorra la Vella", language: "Catalan", population: "80 thousand",
    famousFood: "Escudella", famousLandmark: "Grandvalira Ski Resort",
    funFact: "Andorra is a tiny country in the mountains between France and Spain!",
    quizQuestions: [
      { question: "What is the capital city of Andorra?", options: ["Andorra la Vella", "Funafuti", "Port Louis", "Athens"], answer: 0 },
      { question: "Which of these foods is famous in Andorra?", options: ["Bratwurst & Pretzels", "Nasi Lemak", "Paella & Tapas", "Escudella"], answer: 3 },
      { question: "Which famous landmark can you find in Andorra?", options: ["Petronas Twin Towers", "Grandvalira Ski Resort", "Leptis Magna", "Al-Masjid al-Haram (Grand Mosque)"], answer: 1 },
    ],
  },
  {
    id: "austria", name: "Austria", flag: "🇦🇹", continent: "Europe", mapId: "AT",
    capital: "Vienna", language: "German", population: "9 million",
    famousFood: "Wiener Schnitzel", famousLandmark: "Schönbrunn Palace",
    funFact: "Famous composer Mozart was born in Austria!",
    quizQuestions: [
      { question: "What is the capital city of Austria?", options: ["Algiers", "Bridgetown", "Vienna", "Doha"], answer: 2 },
      { question: "Which of these foods is famous in Austria?", options: ["Curry & Biryani", "Mountain Chicken (frog legs)", "Caldo de Mancarra", "Wiener Schnitzel"], answer: 3 },
      { question: "Which famous landmark can you find in Austria?", options: ["Table Mountain", "Grand Anse Beach", "Schönbrunn Palace", "Prague Castle"], answer: 2 },
    ],
  },
  {
    id: "belarus", name: "Belarus", flag: "🇧🇾", continent: "Europe", mapId: "BY",
    capital: "Minsk", language: "Belarusian & Russian", population: "9.4 million",
    famousFood: "Draniki (potato pancakes)", famousLandmark: "Mir Castle",
    funFact: "Belarus has one of the last ancient forests in Europe — the Białowieża Forest!",
    quizQuestions: [
      { question: "What is the capital city of Belarus?", options: ["Algiers", "Minsk", "Yaoundé", "Dushanbe"], answer: 1 },
      { question: "Which of these foods is famous in Belarus?", options: ["Ambuyat", "Skoudehkaris", "Phở & Bánh Mì", "Draniki (potato pancakes)"], answer: 3 },
      { question: "Which famous landmark can you find in Belarus?", options: ["Mir Castle", "Great Wall of China", "Funafuti Conservation Area", "Vaduz Castle"], answer: 0 },
    ],
  },
  {
    id: "belgium", name: "Belgium", flag: "🇧🇪", continent: "Europe", mapId: "BE",
    capital: "Brussels", language: "Dutch, French & German", population: "11.5 million",
    famousFood: "Waffles & Chocolate", famousLandmark: "Grand Place",
    funFact: "Belgium is the chocolate capital of the world — they make 220,000 tons per year!",
    quizQuestions: [
      { question: "What is the capital city of Belgium?", options: ["Windhoek", "Addis Ababa", "Brussels", "Yerevan"], answer: 2 },
      { question: "Which of these foods is famous in Belgium?", options: ["Injera with Zigni", "Kokoda (raw fish salad)", "Qurutob", "Waffles & Chocolate"], answer: 3 },
      { question: "Which famous landmark can you find in Belgium?", options: ["Sigiriya Rock Fortress", "Belém Tower", "Grand Place", "Orheiul Vechi Monastery"], answer: 2 },
    ],
  },
  {
    id: "bosnia-and-herzegovina", name: "Bosnia and Herzegovina", flag: "🇧🇦", continent: "Europe", mapId: "BA",
    capital: "Sarajevo", language: "Bosnian, Croatian & Serbian", population: "3.3 million",
    famousFood: "Ćevapi", famousLandmark: "Stari Most (Old Bridge)",
    funFact: "Sarajevo was one of the first cities in Europe to have electric trams!",
    quizQuestions: [
      { question: "What is the capital city of Bosnia and Herzegovina?", options: ["Sarajevo", "Beirut", "Sofia", "Prague"], answer: 0 },
      { question: "Which of these foods is famous in Bosnia and Herzegovina?", options: ["Fish & Chips", "Escudella", "Banitsa", "Ćevapi"], answer: 3 },
      { question: "Which famous landmark can you find in Bosnia and Herzegovina?", options: ["Easter Island (Rapa Nui)", "Stari Most (Old Bridge)", "Bazaruto Archipelago", "Buada Lagoon"], answer: 1 },
    ],
  },
  {
    id: "bulgaria", name: "Bulgaria", flag: "🇧🇬", continent: "Europe", mapId: "BG",
    capital: "Sofia", language: "Bulgarian", population: "6.5 million",
    famousFood: "Banitsa", famousLandmark: "Rila Monastery",
    funFact: "In Bulgaria, nodding your head means 'no' and shaking it means 'yes'!",
    quizQuestions: [
      { question: "What is the capital city of Bulgaria?", options: ["Andorra la Vella", "Kabul", "Sofia", "Skopje"], answer: 2 },
      { question: "Which of these foods is famous in Bulgaria?", options: ["Boko Boko", "Judd mat Gaardebounen", "Kebabs & Baklava", "Banitsa"], answer: 3 },
      { question: "Which famous landmark can you find in Bulgaria?", options: ["Le Morne Brabant", "La Soufrière Volcano", "Rila Monastery", "Tiger's Nest Monastery"], answer: 2 },
    ],
  },
  {
    id: "croatia", name: "Croatia", flag: "🇭🇷", continent: "Europe", mapId: "HR",
    capital: "Zagreb", language: "Croatian", population: "3.9 million",
    famousFood: "Peka", famousLandmark: "Dubrovnik Old Town",
    funFact: "Parts of Game of Thrones were filmed in Croatia's beautiful old cities!",
    quizQuestions: [
      { question: "What is the capital city of Croatia?", options: ["Bishkek", "Zagreb", "Brasília", "Bangui"], answer: 1 },
      { question: "Which of these foods is famous in Croatia?", options: ["Banitsa", "Mountain Chicken (frog legs)", "Adobo", "Peka"], answer: 3 },
      { question: "Which famous landmark can you find in Croatia?", options: ["Dubrovnik Old Town", "Volcanoes National Park", "Bock Casemates", "Lake Malawi"], answer: 0 },
    ],
  },
  {
    id: "czech-republic", name: "Czech Republic", flag: "🇨🇿", continent: "Europe", mapId: "CZ",
    capital: "Prague", language: "Czech", population: "10.5 million",
    famousFood: "Trdelník", famousLandmark: "Prague Castle",
    funFact: "Prague Castle is the largest ancient castle complex in the world!",
    quizQuestions: [
      { question: "What is the capital city of Czech Republic?", options: ["Libreville", "Maseru", "Prague", "Funafuti"], answer: 2 },
      { question: "Which of these foods is famous in Czech Republic?", options: ["Pavlova", "Brunost (brown cheese)", "Ćevapi", "Trdelník"], answer: 3 },
      { question: "Which famous landmark can you find in Czech Republic?", options: ["Pico Cão Grande", "Mount Yasur Volcano", "Prague Castle", "Garden of the Sleeping Giant"], answer: 2 },
    ],
  },
  {
    id: "denmark", name: "Denmark", flag: "🇩🇰", continent: "Europe", mapId: "DK",
    capital: "Copenhagen", language: "Danish", population: "5.9 million",
    famousFood: "Smørrebrød", famousLandmark: "The Little Mermaid Statue",
    funFact: "LEGO was invented in Denmark — the name means 'play well' in Danish!",
    quizQuestions: [
      { question: "What is the capital city of Denmark?", options: ["Nouakchott", "Copenhagen", "Bishkek", "Roseau"], answer: 1 },
      { question: "Which of these foods is famous in Denmark?", options: ["Brochettes", "Chelo Kebab", "Qurutob", "Smørrebrød"], answer: 3 },
      { question: "Which famous landmark can you find in Denmark?", options: ["The Little Mermaid Statue", "Machu Picchu", "Saint Basil's Cathedral", "Itaipu Dam"], answer: 0 },
    ],
  },
  {
    id: "estonia", name: "Estonia", flag: "🇪🇪", continent: "Europe", mapId: "EE",
    capital: "Tallinn", language: "Estonian", population: "1.3 million",
    famousFood: "Black Bread", famousLandmark: "Tallinn Old Town",
    funFact: "Estonia is one of the most digital countries — you can even vote online!",
    quizQuestions: [
      { question: "What is the capital city of Estonia?", options: ["Gaborone", "Abuja", "Tallinn", "Canberra"], answer: 2 },
      { question: "Which of these foods is famous in Estonia?", options: ["Daraba", "Hummus & Falafel", "Banitsa", "Black Bread"], answer: 3 },
      { question: "Which famous landmark can you find in Estonia?", options: ["Mount Cameroon", "Cape Coast Castle", "Tallinn Old Town", "Cliffs of Moher"], answer: 2 },
    ],
  },
  {
    id: "finland", name: "Finland", flag: "🇫🇮", continent: "Europe", mapId: "FI",
    capital: "Helsinki", language: "Finnish & Swedish", population: "5.5 million",
    famousFood: "Karelian Pies", famousLandmark: "Santa Claus Village",
    funFact: "Finland has a Santa Claus Village where you can visit Santa any time of year!",
    quizQuestions: [
      { question: "What is the capital city of Finland?", options: ["Helsinki", "Porto-Novo", "St. George's", "Vientiane"], answer: 0 },
      { question: "Which of these foods is famous in Finland?", options: ["Gyros & Moussaka", "Bobotie & Biltong", "Sishwala", "Karelian Pies"], answer: 3 },
      { question: "Which famous landmark can you find in Finland?", options: ["Sultan Omar Ali Saifuddien Mosque", "Santa Claus Village", "Bazaruto Archipelago", "Chocolate Hills"], answer: 1 },
    ],
  },
  {
    id: "france", name: "France", flag: "🇫🇷", continent: "Europe", mapId: "FR",
    capital: "Paris", language: "French", population: "67 million",
    famousFood: "Croissants & Crêpes", famousLandmark: "Eiffel Tower",
    funFact: "France is the most visited country in the world!",
    quizQuestions: [
      { question: "What is the capital of France?", options: ["Lyon", "Paris", "Marseille", "Nice"], answer: 1 },
      { question: "What famous tower is in Paris?", options: ["Leaning Tower", "Eiffel Tower", "CN Tower", "Tokyo Tower"], answer: 1 },
      { question: "What pastry is France famous for?", options: ["Donuts", "Croissants", "Pretzels", "Muffins"], answer: 1 },
    ],
  },
  {
    id: "germany", name: "Germany", flag: "🇩🇪", continent: "Europe", mapId: "DE",
    capital: "Berlin", language: "German", population: "84 million",
    famousFood: "Bratwurst & Pretzels", famousLandmark: "Brandenburg Gate",
    funFact: "Germany has over 1,500 types of sausages!",
    quizQuestions: [
      { question: "What is the capital city of Germany?", options: ["Roseau", "Berlin", "Tarawa", "Tashkent"], answer: 1 },
      { question: "Which of these foods is famous in Germany?", options: ["Mumu (earth oven feast)", "Tavče Gravče", "Ikan Saboko", "Bratwurst & Pretzels"], answer: 3 },
      { question: "Which famous landmark can you find in Germany?", options: ["Brandenburg Gate", "Bay of Kotor", "Joya de Cerén", "Prague Castle"], answer: 0 },
    ],
  },
  {
    id: "greece", name: "Greece", flag: "🇬🇷", continent: "Europe", mapId: "GR",
    capital: "Athens", language: "Greek", population: "10 million",
    famousFood: "Gyros & Moussaka", famousLandmark: "Parthenon",
    funFact: "The Olympic Games were invented in ancient Greece!",
    quizQuestions: [
      { question: "What famous temple is in Athens?", options: ["Colosseum", "Parthenon", "Taj Mahal", "Big Ben"], answer: 1 },
      { question: "What event did Greece invent?", options: ["World Cup", "Olympics", "Super Bowl", "Tour de France"], answer: 1 },
      { question: "What food is Greece known for?", options: ["Sushi", "Gyros", "Tacos", "Curry"], answer: 1 },
    ],
  },
  {
    id: "hungary", name: "Hungary", flag: "🇭🇺", continent: "Europe", mapId: "HU",
    capital: "Budapest", language: "Hungarian", population: "9.7 million",
    famousFood: "Goulash", famousLandmark: "Hungarian Parliament Building",
    funFact: "The Rubik's Cube was invented by a Hungarian professor!",
    quizQuestions: [
      { question: "What is the capital city of Hungary?", options: ["Budapest", "Malabo", "Port-au-Prince", "Amman"], answer: 0 },
      { question: "Which of these foods is famous in Hungary?", options: ["Waffles & Chocolate", "Pulaka", "Green Fig & Saltfish", "Goulash"], answer: 3 },
      { question: "Which famous landmark can you find in Hungary?", options: ["Iguazu Falls", "Hungarian Parliament Building", "Sagrada Familia", "Copán Ruins"], answer: 1 },
    ],
  },
  {
    id: "iceland", name: "Iceland", flag: "🇮🇸", continent: "Europe", mapId: "IS",
    capital: "Reykjavik", language: "Icelandic", population: "380 thousand",
    famousFood: "Skyr", famousLandmark: "Blue Lagoon",
    funFact: "Iceland has volcanoes, glaciers, geysers, and Northern Lights — all on one island!",
    quizQuestions: [
      { question: "What is the capital city of Iceland?", options: ["Reykjavik", "Kuwait City", "Sana'a", "Monaco"], answer: 0 },
      { question: "Which of these foods is famous in Iceland?", options: ["Doubles", "Sancocho", "Injera with Zigni", "Skyr"], answer: 3 },
      { question: "Which famous landmark can you find in Iceland?", options: ["Pitch Lake", "Sudd Wetland", "Blue Lagoon", "Lake Ohrid"], answer: 2 },
    ],
  },
  {
    id: "ireland", name: "Ireland", flag: "🇮🇪", continent: "Europe", mapId: "IE",
    capital: "Dublin", language: "Irish & English", population: "5 million",
    famousFood: "Irish Stew", famousLandmark: "Cliffs of Moher",
    funFact: "Ireland's nickname is the 'Emerald Isle' because it's so green!",
    quizQuestions: [
      { question: "What is the capital city of Ireland?", options: ["Vienna", "Dublin", "Moscow", "Brasília"], answer: 1 },
      { question: "Which of these foods is famous in Ireland?", options: ["Sushi & Ramen", "Rolex (rolled eggs in chapati)", "Ikan Saboko", "Irish Stew"], answer: 3 },
      { question: "Which famous landmark can you find in Ireland?", options: ["Cliffs of Moher", "Registan Square", "Volcanoes National Park", "Tallinn Old Town"], answer: 0 },
    ],
  },
  {
    id: "italy", name: "Italy", flag: "🇮🇹", continent: "Europe", mapId: "IT",
    capital: "Rome", language: "Italian", population: "59 million",
    famousFood: "Pizza & Pasta", famousLandmark: "Colosseum",
    funFact: "Italy has more UNESCO World Heritage Sites than any other country!",
    quizQuestions: [
      { question: "What is the capital of Italy?", options: ["Milan", "Rome", "Venice", "Florence"], answer: 1 },
      { question: "What ancient arena is in Rome?", options: ["Parthenon", "Colosseum", "Stonehenge", "Acropolis"], answer: 1 },
      { question: "What food is Italy famous for?", options: ["Sushi", "Tacos", "Pizza", "Curry"], answer: 2 },
    ],
  },
  {
    id: "kosovo", name: "Kosovo", flag: "🇽🇰", continent: "Europe", mapId: "XK",
    capital: "Pristina", language: "Albanian, Serbian", population: "1.8 million",
    famousFood: "Flia (layered crepe-like pastry)", famousLandmark: "Decani Monastery",
    funFact: "Kosovo is one of the youngest countries in the world — it declared independence in 2008!",
    quizQuestions: [
      { question: "What is the capital city of Kosovo?", options: ["Pristina", "Tirana", "Skopje", "Belgrade"], answer: 0 },
      { question: "Which of these foods is famous in Kosovo?", options: ["Sushi", "Flia", "Tacos", "Pad Thai"], answer: 1 },
      { question: "Which famous landmark can you find in Kosovo?", options: ["Eiffel Tower", "Big Ben", "Decani Monastery", "Colosseum"], answer: 2 },
    ],
  },
  {
    id: "latvia", name: "Latvia", flag: "🇱🇻", continent: "Europe", mapId: "LV",
    capital: "Riga", language: "Latvian", population: "1.8 million",
    famousFood: "Rupjmaize (dark rye bread)", famousLandmark: "Riga Central Market",
    funFact: "Latvia has one of the widest waterfalls in Europe — Ventas Rumba!",
    quizQuestions: [
      { question: "What is the capital city of Latvia?", options: ["San Marino", "Riga", "Moscow", "Naypyidaw"], answer: 1 },
      { question: "Which of these foods is famous in Latvia?", options: ["Shuwa", "Sushi & Ramen", "Cou-Cou & Flying Fish", "Rupjmaize (dark rye bread)"], answer: 3 },
      { question: "Which famous landmark can you find in Latvia?", options: ["Riga Central Market", "Tatev Monastery", "Victoria Falls", "Nelson's Dockyard"], answer: 0 },
    ],
  },
  {
    id: "liechtenstein", name: "Liechtenstein", flag: "🇱🇮", continent: "Europe", mapId: "LI",
    capital: "Vaduz", language: "German", population: "39 thousand",
    famousFood: "Käsknöpfle (cheese noodles)", famousLandmark: "Vaduz Castle",
    funFact: "Liechtenstein is so small you can walk across the entire country in a few hours!",
    quizQuestions: [
      { question: "What is the capital city of Liechtenstein?", options: ["Vaduz", "Madrid", "Bamako", "Ashgabat"], answer: 0 },
      { question: "Which of these foods is famous in Liechtenstein?", options: ["Fish Amok", "Nasi Lemak", "Kapana", "Käsknöpfle (cheese noodles)"], answer: 3 },
      { question: "Which famous landmark can you find in Liechtenstein?", options: ["Koutammakou", "Cristo Rei of Dili", "Vaduz Castle", "Belém Tower"], answer: 2 },
    ],
  },
  {
    id: "lithuania", name: "Lithuania", flag: "🇱🇹", continent: "Europe", mapId: "LT",
    capital: "Vilnius", language: "Lithuanian", population: "2.8 million",
    famousFood: "Cepelinai (potato dumplings)", famousLandmark: "Trakai Island Castle",
    funFact: "Lithuania has a castle on an island in the middle of a lake!",
    quizQuestions: [
      { question: "What is the capital city of Lithuania?", options: ["Vilnius", "Moscow", "Paramaribo", "Yamoussoukro"], answer: 0 },
      { question: "Which of these foods is famous in Lithuania?", options: ["Pepián", "Karelian Pies", "Kabuli Pulao", "Cepelinai (potato dumplings)"], answer: 3 },
      { question: "Which famous landmark can you find in Lithuania?", options: ["Dubrovnik Old Town", "Trakai Island Castle", "Belgrade Fortress", "Chichén Itzá"], answer: 1 },
    ],
  },
  {
    id: "luxembourg", name: "Luxembourg", flag: "🇱🇺", continent: "Europe", mapId: "LU",
    capital: "Luxembourg City", language: "Luxembourgish, French & German", population: "650 thousand",
    famousFood: "Judd mat Gaardebounen", famousLandmark: "Bock Casemates",
    funFact: "Luxembourg is one of the smallest countries in Europe but one of the richest!",
    quizQuestions: [
      { question: "What is the capital city of Luxembourg?", options: ["Rome", "Luxembourg City", "Riyadh", "Libreville"], answer: 1 },
      { question: "Which of these foods is famous in Luxembourg?", options: ["Ceviche & Lomo Saltado", "Asado & Empanadas", "Ropa Vieja", "Judd mat Gaardebounen"], answer: 3 },
      { question: "Which famous landmark can you find in Luxembourg?", options: ["Riga Central Market", "Great Wall of China", "Bock Casemates", "Chichén Itzá"], answer: 2 },
    ],
  },
  {
    id: "malta", name: "Malta", flag: "🇲🇹", continent: "Europe", mapId: "MT",
    capital: "Valletta", language: "Maltese & English", population: "520 thousand",
    famousFood: "Pastizzi", famousLandmark: "Megalithic Temples",
    funFact: "Malta has some of the oldest free-standing buildings in the world — older than the pyramids!",
    quizQuestions: [
      { question: "What is the capital city of Malta?", options: ["St. John's", "Valletta", "Moscow", "Ashgabat"], answer: 1 },
      { question: "Which of these foods is famous in Malta?", options: ["Chivito", "Bratwurst & Pretzels", "Sishwala", "Pastizzi"], answer: 3 },
      { question: "Which famous landmark can you find in Malta?", options: ["Megalithic Temples", "Basilique Sainte-Anne", "Geirangerfjord", "Iskanderkul Lake"], answer: 0 },
    ],
  },
  {
    id: "moldova", name: "Moldova", flag: "🇲🇩", continent: "Europe", mapId: "MD",
    capital: "Chișinău", language: "Romanian", population: "2.6 million",
    famousFood: "Mămăligă (cornmeal porridge)", famousLandmark: "Orheiul Vechi Monastery",
    funFact: "Moldova has an underground wine city with streets named after grape varieties!",
    quizQuestions: [
      { question: "What is the capital city of Moldova?", options: ["Luanda", "Chișinău", "Georgetown", "Rome"], answer: 1 },
      { question: "Which of these foods is famous in Moldova?", options: ["Ropa Vieja", "Croissants & Crêpes", "Conch Fritters", "Mămăligă (cornmeal porridge)"], answer: 3 },
      { question: "Which famous landmark can you find in Moldova?", options: ["Orheiul Vechi Monastery", "Bahrain Fort", "Panama Canal", "Mount Nimba"], answer: 0 },
    ],
  },
  {
    id: "monaco", name: "Monaco", flag: "🇲🇨", continent: "Europe", mapId: "MC",
    capital: "Monaco", language: "French", population: "40 thousand",
    famousFood: "Barbagiuan", famousLandmark: "Monte Carlo Casino",
    funFact: "Monaco is the second smallest country in the world — smaller than Central Park in New York!",
    quizQuestions: [
      { question: "What is the capital city of Monaco?", options: ["Muscat", "Yerevan", "Monaco", "Kinshasa"], answer: 2 },
      { question: "Which of these foods is famous in Monaco?", options: ["Sadza", "Ambuyat", "Palusami", "Barbagiuan"], answer: 3 },
      { question: "Which famous landmark can you find in Monaco?", options: ["Monte Alen National Park", "Monte Carlo Casino", "Paphos Archaeological Park", "Blue Lagoon"], answer: 1 },
    ],
  },
  {
    id: "montenegro", name: "Montenegro", flag: "🇲🇪", continent: "Europe", mapId: "ME",
    capital: "Podgorica", language: "Montenegrin", population: "620 thousand",
    famousFood: "Njeguški Steak", famousLandmark: "Bay of Kotor",
    funFact: "Montenegro means 'Black Mountain' and has beautiful coastline along the Adriatic Sea!",
    quizQuestions: [
      { question: "What is the capital city of Montenegro?", options: ["Podgorica", "Warsaw", "Prague", "Windhoek"], answer: 0 },
      { question: "Which of these foods is famous in Montenegro?", options: ["Kimchi & Bibimbap", "Shuwa", "Nsima", "Njeguški Steak"], answer: 3 },
      { question: "Which famous landmark can you find in Montenegro?", options: ["Krak des Chevaliers", "Bay of Kotor", "Sultan Omar Ali Saifuddien Mosque", "Tallinn Old Town"], answer: 1 },
    ],
  },
  {
    id: "netherlands", name: "Netherlands", flag: "🇳🇱", continent: "Europe", mapId: "NL",
    capital: "Amsterdam", language: "Dutch", population: "17.5 million",
    famousFood: "Stroopwafel", famousLandmark: "Anne Frank House",
    funFact: "About one-third of the Netherlands is below sea level!",
    quizQuestions: [
      { question: "What is the capital city of Netherlands?", options: ["Ljubljana", "Port Louis", "Amsterdam", "Tarawa"], answer: 2 },
      { question: "Which of these foods is famous in Netherlands?", options: ["Fondue & Chocolate", "Stroopwafel", "Injera with Zigni", "Daraba"], answer: 1 },
      { question: "Which famous landmark can you find in Netherlands?", options: ["Ice Hotel", "Anne Frank House", "Angel Falls", "Mount Kilimanjaro"], answer: 1 },
    ],
  },
  {
    id: "north-macedonia", name: "North Macedonia", flag: "🇲🇰", continent: "Europe", mapId: "MK",
    capital: "Skopje", language: "Macedonian", population: "2 million",
    famousFood: "Tavče Gravče", famousLandmark: "Lake Ohrid",
    funFact: "Lake Ohrid is one of the oldest and deepest lakes in Europe!",
    quizQuestions: [
      { question: "What is the capital city of North Macedonia?", options: ["Georgetown", "Skopje", "Canberra", "Astana"], answer: 1 },
      { question: "Which of these foods is famous in North Macedonia?", options: ["Peka", "Tavče Gravče", "Octopus Curry", "Curry & Biryani"], answer: 1 },
      { question: "Which famous landmark can you find in North Macedonia?", options: ["Lake Ohrid", "Swimming Pigs Beach", "Gyeongbokgung Palace", "Colosseum"], answer: 0 },
    ],
  },
  {
    id: "norway", name: "Norway", flag: "🇳🇴", continent: "Europe", mapId: "NO",
    capital: "Oslo", language: "Norwegian", population: "5.4 million",
    famousFood: "Brunost (brown cheese)", famousLandmark: "Geirangerfjord",
    funFact: "Norway has fjords — deep blue waterways carved by glaciers between huge cliffs!",
    quizQuestions: [
      { question: "What is the capital city of Norway?", options: ["Luxembourg City", "Port Vila", "Oslo", "Lima"], answer: 2 },
      { question: "Which of these foods is famous in Norway?", options: ["Brunost (brown cheese)", "Papa", "Hummus & Falafel", "Kebabs & Baklava"], answer: 0 },
      { question: "Which famous landmark can you find in Norway?", options: ["Geirangerfjord", "Maasai Mara", "Belgrade Fortress", "Dome of the Rock"], answer: 0 },
    ],
  },
  {
    id: "poland", name: "Poland", flag: "🇵🇱", continent: "Europe", mapId: "PL",
    capital: "Warsaw", language: "Polish", population: "38 million",
    famousFood: "Pierogi", famousLandmark: "Wawel Castle",
    funFact: "Poland has a chapel made entirely of rock salt deep underground!",
    quizQuestions: [
      { question: "What is the capital city of Poland?", options: ["Warsaw", "Tehran", "Moscow", "Quito"], answer: 0 },
      { question: "Which of these foods is famous in Poland?", options: ["Pierogi", "Oka (raw fish salad)", "Jollof Rice & Suya", "Ambuyat"], answer: 0 },
      { question: "Which famous landmark can you find in Poland?", options: ["Bahrain Fort", "Wawel Castle", "Lake Ohrid", "Pico Cão Grande"], answer: 1 },
    ],
  },
  {
    id: "portugal", name: "Portugal", flag: "🇵🇹", continent: "Europe", mapId: "PT",
    capital: "Lisbon", language: "Portuguese", population: "10 million",
    famousFood: "Pastel de Nata", famousLandmark: "Belém Tower",
    funFact: "Portuguese explorers were the first Europeans to sail around Africa to reach Asia!",
    quizQuestions: [
      { question: "What is the capital city of Portugal?", options: ["Malabo", "Vienna", "Lisbon", "Nassau"], answer: 2 },
      { question: "Which of these foods is famous in Portugal?", options: ["Cassava Leaf Stew", "Pastel de Nata", "Barbagiuan", "Bandeja Paisa"], answer: 1 },
      { question: "Which famous landmark can you find in Portugal?", options: ["Sudd Wetland", "Belém Tower", "Casapueblo", "Bwindi Impenetrable Forest"], answer: 1 },
    ],
  },
  {
    id: "romania", name: "Romania", flag: "🇷🇴", continent: "Europe", mapId: "RO",
    capital: "Bucharest", language: "Romanian", population: "19 million",
    famousFood: "Sarmale", famousLandmark: "Bran Castle (Dracula's Castle)",
    funFact: "Romania has a castle that inspired the story of Count Dracula!",
    quizQuestions: [
      { question: "What is the capital city of Romania?", options: ["Bucharest", "Nouakchott", "Stockholm", "Porto-Novo"], answer: 0 },
      { question: "Which of these foods is famous in Romania?", options: ["Brik", "Pupusas", "Sarmale", "Kapana"], answer: 2 },
      { question: "Which famous landmark can you find in Romania?", options: ["Harrison's Cave", "Bran Castle (Dracula's Castle)", "Marina Bay Sands", "Lake Bled"], answer: 1 },
    ],
  },
  {
    id: "russia", name: "Russia", flag: "🇷🇺", continent: "Europe", mapId: "RU",
    capital: "Moscow", language: "Russian", population: "144 million",
    famousFood: "Borscht & Blini", famousLandmark: "Saint Basil's Cathedral",
    funFact: "Russia is the largest country in the world — it spans 11 time zones!",
    quizQuestions: [
      { question: "What is the capital city of Russia?", options: ["Damascus", "Gaborone", "Moscow", "São Tomé"], answer: 2 },
      { question: "Which of these foods is famous in Russia?", options: ["Pad Thai & Tom Yum", "Borscht & Blini", "Fungie & Pepperpot", "Vegemite & Meat Pies"], answer: 1 },
      { question: "Which famous landmark can you find in Russia?", options: ["Saint Basil's Cathedral", "Grand Palace", "African Renaissance Monument", "Sultan Omar Ali Saifuddien Mosque"], answer: 0 },
    ],
  },
  {
    id: "san-marino", name: "San Marino", flag: "🇸🇲", continent: "Europe", mapId: "SM",
    capital: "San Marino", language: "Italian", population: "34 thousand",
    famousFood: "Torta Tre Monti", famousLandmark: "Three Towers of San Marino",
    funFact: "San Marino claims to be the oldest republic in the world, founded in the year 301!",
    quizQuestions: [
      { question: "What is the capital city of San Marino?", options: ["Port Louis", "San Marino", "Dushanbe", "Manama"], answer: 1 },
      { question: "Which of these foods is famous in San Marino?", options: ["Plov", "Goulash", "Torta Tre Monti", "Fungie & Pepperpot"], answer: 2 },
      { question: "Which famous landmark can you find in San Marino?", options: ["Three Towers of San Marino", "Sagrada Familia", "Amphitheatre of El Jem", "Juche Tower"], answer: 0 },
    ],
  },
  {
    id: "serbia", name: "Serbia", flag: "🇷🇸", continent: "Europe", mapId: "RS",
    capital: "Belgrade", language: "Serbian", population: "6.6 million",
    famousFood: "Ćevapi", famousLandmark: "Belgrade Fortress",
    funFact: "The famous inventor Nikola Tesla was born in what is now Serbia!",
    quizQuestions: [
      { question: "What is the capital city of Serbia?", options: ["Conakry", "Budapest", "Belgrade", "Sucre"], answer: 2 },
      { question: "Which of these foods is famous in Serbia?", options: ["Ćevapi", "Curry & Biryani", "Escudella", "Kelaguen"], answer: 0 },
      { question: "Which famous landmark can you find in Serbia?", options: ["Basilique Sainte-Anne", "Belgrade Fortress", "Mount Nimba", "Buada Lagoon"], answer: 1 },
    ],
  },
  {
    id: "slovakia", name: "Slovakia", flag: "🇸🇰", continent: "Europe", mapId: "SK",
    capital: "Bratislava", language: "Slovak", population: "5.4 million",
    famousFood: "Bryndzové Halušky", famousLandmark: "Spiš Castle",
    funFact: "Slovakia has more castles per person than almost any country in the world!",
    quizQuestions: [
      { question: "What is the capital city of Slovakia?", options: ["Bratislava", "Kathmandu", "Bogotá", "Baghdad"], answer: 0 },
      { question: "Which of these foods is famous in Slovakia?", options: ["Jerk Chicken & Ackee", "Karelian Pies", "Bryndzové Halušky", "Makara"], answer: 2 },
      { question: "Which famous landmark can you find in Slovakia?", options: ["Cristo Rei of Dili", "Spiš Castle", "Providence Island", "To Sua Ocean Trench"], answer: 1 },
    ],
  },
  {
    id: "slovenia", name: "Slovenia", flag: "🇸🇮", continent: "Europe", mapId: "SI",
    capital: "Ljubljana", language: "Slovenian", population: "2.1 million",
    famousFood: "Potica", famousLandmark: "Lake Bled",
    funFact: "Slovenia has a fairy-tale lake with a tiny island and a church in the middle!",
    quizQuestions: [
      { question: "What is the capital city of Slovenia?", options: ["Belmopan", "Bandar Seri Begawan", "Ljubljana", "Tehran"], answer: 2 },
      { question: "Which of these foods is famous in Slovenia?", options: ["Croissants & Crêpes", "Potica", "Nasi Goreng", "Kebabs & Baklava"], answer: 1 },
      { question: "Which famous landmark can you find in Slovenia?", options: ["Mount Yasur Volcano", "Mount Kilimanjaro", "Lake Bled", "Grand Place"], answer: 2 },
    ],
  },
  {
    id: "spain", name: "Spain", flag: "🇪🇸", continent: "Europe", mapId: "ES",
    capital: "Madrid", language: "Spanish", population: "47 million",
    famousFood: "Paella & Tapas", famousLandmark: "Sagrada Familia",
    funFact: "Spain has a tomato-throwing festival called La Tomatina!",
    quizQuestions: [
      { question: "What is the capital city of Spain?", options: ["Beirut", "Madrid", "Lusaka", "Malé"], answer: 1 },
      { question: "Which of these foods is famous in Spain?", options: ["Vegemite & Meat Pies", "Musakhan & Knafeh", "Paella & Tapas", "Nshima"], answer: 2 },
      { question: "Which famous landmark can you find in Spain?", options: ["Sagrada Familia", "Royal Palaces of Abomey", "Bay of Kotor", "Table Mountain"], answer: 0 },
    ],
  },
  {
    id: "sweden", name: "Sweden", flag: "🇸🇪", continent: "Europe", mapId: "SE",
    capital: "Stockholm", language: "Swedish", population: "10.5 million",
    famousFood: "Swedish Meatballs", famousLandmark: "Ice Hotel",
    funFact: "Sweden has a hotel made entirely of ice that is rebuilt every winter!",
    quizQuestions: [
      { question: "What is the capital city of Sweden?", options: ["Praia", "Yerevan", "Stockholm", "Manama"], answer: 2 },
      { question: "Which of these foods is famous in Sweden?", options: ["Swedish Meatballs", "Laap", "Akassa", "Shuwa"], answer: 0 },
      { question: "Which famous landmark can you find in Sweden?", options: ["Registan Square", "Ha'amonga 'a Maui Trilithon", "Ice Hotel", "Bran Castle (Dracula's Castle)"], answer: 2 },
    ],
  },
  {
    id: "switzerland", name: "Switzerland", flag: "🇨🇭", continent: "Europe", mapId: "CH",
    capital: "Bern", language: "German, French, Italian & Romansh", population: "8.8 million",
    famousFood: "Fondue & Chocolate", famousLandmark: "Matterhorn",
    funFact: "Switzerland has four official languages!",
    quizQuestions: [
      { question: "What is the capital city of Switzerland?", options: ["Bern", "Doha", "Nouakchott", "Luanda"], answer: 0 },
      { question: "Which of these foods is famous in Switzerland?", options: ["Draniki (potato pancakes)", "Pulaka", "Fondue & Chocolate", "Bryndzové Halušky"], answer: 2 },
      { question: "Which famous landmark can you find in Switzerland?", options: ["Bay of Kotor", "Matterhorn", "Niagara Falls", "Tikal"], answer: 1 },
    ],
  },
  {
    id: "ukraine", name: "Ukraine", flag: "🇺🇦", continent: "Europe", mapId: "UA",
    capital: "Kyiv", language: "Ukrainian", population: "44 million",
    famousFood: "Borscht & Varenyky", famousLandmark: "Saint Sophia's Cathedral",
    funFact: "Ukraine has a tunnel of love — a beautiful green railway tunnel covered in trees!",
    quizQuestions: [
      { question: "What is the capital city of Ukraine?", options: ["Port Vila", "Roseau", "Kyiv", "Asmara"], answer: 2 },
      { question: "Which of these foods is famous in Ukraine?", options: ["Tavče Gravče", "Borscht & Varenyky", "Hummus & Falafel", "Pepperpot"], answer: 1 },
      { question: "Which famous landmark can you find in Ukraine?", options: ["Schönbrunn Palace", "African Renaissance Monument", "Saint Sophia's Cathedral", "Grand Palace"], answer: 2 },
    ],
  },
  {
    id: "united-kingdom", name: "United Kingdom", flag: "🇬🇧", continent: "Europe", mapId: "GB",
    capital: "London", language: "English", population: "67 million",
    famousFood: "Fish & Chips", famousLandmark: "Big Ben & Buckingham Palace",
    funFact: "The UK includes England, Scotland, Wales, and Northern Ireland!",
    quizQuestions: [
      { question: "What is the capital city of United Kingdom?", options: ["London", "Bangui", "Ljubljana", "Panama City"], answer: 0 },
      { question: "Which of these foods is famous in United Kingdom?", options: ["Khachapuri (cheese bread)", "Cassava Leaf Stew", "Fish & Chips", "Ćevapi"], answer: 2 },
      { question: "Which famous landmark can you find in United Kingdom?", options: ["Mir Castle", "Big Ben & Buckingham Palace", "Great Mosque of Djenné", "Petra"], answer: 1 },
    ],
  },
  {
    id: "vatican-city", name: "Vatican City", flag: "🇻🇦", continent: "Europe", mapId: "VA",
    capital: "Vatican City", language: "Italian & Latin", population: "800",
    famousFood: "Italian Cuisine", famousLandmark: "St. Peter's Basilica",
    funFact: "Vatican City is the smallest country in the world — it fits inside the city of Rome!",
    quizQuestions: [
      { question: "What is the capital city of Vatican City?", options: ["Dili", "Baku", "Vatican City", "Reykjavik"], answer: 2 },
      { question: "Which of these foods is famous in Vatican City?", options: ["Taro & Coconut Crab", "Italian Cuisine", "Injera with Zigni", "Bandeja Paisa"], answer: 1 },
      { question: "Which famous landmark can you find in Vatican City?", options: ["Lake Malawi", "Bikini Atoll", "St. Peter's Basilica", "Spiš Castle"], answer: 2 },
    ],
  },

  // ===== NORTH AMERICA (23) =====
  {
    id: "antigua-and-barbuda", name: "Antigua and Barbuda", flag: "🇦🇬", continent: "North America", mapId: "AG",
    capital: "St. John's", language: "English", population: "100 thousand",
    famousFood: "Fungie & Pepperpot", famousLandmark: "Nelson's Dockyard",
    funFact: "Antigua has 365 beaches — one for every day of the year!",
    quizQuestions: [
      { question: "What is the capital city of Antigua and Barbuda?", options: ["Brussels", "St. John's", "Beijing", "N'Djamena"], answer: 1 },
      { question: "Which of these foods is famous in Antigua and Barbuda?", options: ["Khachapuri (cheese bread)", "Green Fig & Saltfish", "Fungie & Pepperpot", "Baleadas"], answer: 2 },
      { question: "Which famous landmark can you find in Antigua and Barbuda?", options: ["Nelson's Dockyard", "Bran Castle (Dracula's Castle)", "Sultan Qaboos Grand Mosque", "Cartagena Old City"], answer: 0 },
    ],
  },
  {
    id: "bahamas", name: "Bahamas", flag: "🇧🇸", continent: "North America", mapId: "BS",
    capital: "Nassau", language: "English", population: "400 thousand",
    famousFood: "Conch Fritters", famousLandmark: "Swimming Pigs Beach",
    funFact: "The Bahamas has an island where pigs swim in the ocean!",
    quizQuestions: [
      { question: "What is the capital city of Bahamas?", options: ["Yerevan", "Basseterre", "Nassau", "Dhaka"], answer: 2 },
      { question: "Which of these foods is famous in Bahamas?", options: ["Conch Fritters", "Waffles & Chocolate", "Ugali & Mishkaki", "Seswaa"], answer: 0 },
      { question: "Which famous landmark can you find in Bahamas?", options: ["Issyk-Kul Lake", "Richat Structure (Eye of the Sahara)", "Swimming Pigs Beach", "Cotton Tree"], answer: 2 },
    ],
  },
  {
    id: "barbados", name: "Barbados", flag: "🇧🇧", continent: "North America", mapId: "BB",
    capital: "Bridgetown", language: "English", population: "290 thousand",
    famousFood: "Cou-Cou & Flying Fish", famousLandmark: "Harrison's Cave",
    funFact: "Barbados is the birthplace of pop star Rihanna!",
    quizQuestions: [
      { question: "What is the capital city of Barbados?", options: ["Bridgetown", "Brussels", "Nairobi", "Tashkent"], answer: 0 },
      { question: "Which of these foods is famous in Barbados?", options: ["Cassava Leaf Stew", "Chelo Kebab", "Cou-Cou & Flying Fish", "Piri Piri Chicken"], answer: 2 },
      { question: "Which famous landmark can you find in Barbados?", options: ["Koutammakou", "Harrison's Cave", "Blue Lagoon", "Sossusvlei Sand Dunes"], answer: 1 },
    ],
  },
  {
    id: "belize", name: "Belize", flag: "🇧🇿", continent: "North America", mapId: "BZ",
    capital: "Belmopan", language: "English", population: "410 thousand",
    famousFood: "Rice and Beans", famousLandmark: "Great Blue Hole",
    funFact: "Belize has a giant underwater sinkhole called the Great Blue Hole!",
    quizQuestions: [
      { question: "What is the capital city of Belize?", options: ["Doha", "Tarawa", "Belmopan", "St. John's"], answer: 2 },
      { question: "Which of these foods is famous in Belize?", options: ["Banitsa", "Rice and Beans", "Fufu & Pondu", "Pastizzi"], answer: 1 },
      { question: "Which famous landmark can you find in Belize?", options: ["Tallinn Old Town", "Marina Bay Sands", "Great Blue Hole", "Lake Assal"], answer: 2 },
    ],
  },
  {
    id: "canada", name: "Canada", flag: "🇨🇦", continent: "North America", mapId: "CA",
    capital: "Ottawa", language: "English & French", population: "39 million",
    famousFood: "Poutine & Maple Syrup", famousLandmark: "Niagara Falls",
    funFact: "Canada has more lakes than all other countries combined!",
    quizQuestions: [
      { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
      { question: "What sweet syrup is Canada famous for?", options: ["Honey", "Maple Syrup", "Agave", "Chocolate"], answer: 1 },
      { question: "What famous waterfall is shared with the USA?", options: ["Victoria Falls", "Niagara Falls", "Angel Falls", "Iguazu Falls"], answer: 1 },
    ],
  },
  {
    id: "costa-rica", name: "Costa Rica", flag: "🇨🇷", continent: "North America", mapId: "CR",
    capital: "San José", language: "Spanish", population: "5.2 million",
    famousFood: "Gallo Pinto", famousLandmark: "Arenal Volcano",
    funFact: "Costa Rica has no army — they got rid of it to spend more on schools and nature!",
    quizQuestions: [
      { question: "What is the capital city of Costa Rica?", options: ["Mexico City", "Jakarta", "San José", "Doha"], answer: 2 },
      { question: "Which of these foods is famous in Costa Rica?", options: ["Gallo Pinto", "Swedish Meatballs", "Dal Bhat", "Black Bread"], answer: 0 },
      { question: "Which famous landmark can you find in Costa Rica?", options: ["Virunga National Park", "Grand Palace", "Arenal Volcano", "Lake Malawi"], answer: 2 },
    ],
  },
  {
    id: "cuba", name: "Cuba", flag: "🇨🇺", continent: "North America", mapId: "CU",
    capital: "Havana", language: "Spanish", population: "11 million",
    famousFood: "Ropa Vieja", famousLandmark: "Old Havana",
    funFact: "Cuba has colorful vintage cars from the 1950s driving around everywhere!",
    quizQuestions: [
      { question: "What is the capital city of Cuba?", options: ["Havana", "Windhoek", "Kingston", "Rome"], answer: 0 },
      { question: "Which of these foods is famous in Cuba?", options: ["Boko Boko", "Borscht & Varenyky", "Ropa Vieja", "Couscous"], answer: 2 },
      { question: "Which famous landmark can you find in Cuba?", options: ["Christ the Redeemer", "Old Havana", "Ziggurat of Ur", "Sossusvlei Sand Dunes"], answer: 1 },
    ],
  },
  {
    id: "dominica", name: "Dominica", flag: "🇩🇲", continent: "North America", mapId: "DM",
    capital: "Roseau", language: "English", population: "72 thousand",
    famousFood: "Mountain Chicken (frog legs)", famousLandmark: "Boiling Lake",
    funFact: "Dominica has a lake that actually boils — you can see the steam rising!",
    quizQuestions: [
      { question: "What is the capital city of Dominica?", options: ["Roseau", "Budapest", "Luanda", "Athens"], answer: 0 },
      { question: "Which of these foods is famous in Dominica?", options: ["Mountain Chicken (frog legs)", "Kimchi & Bibimbap", "Kebabs & Baklava", "Bratwurst & Pretzels"], answer: 0 },
      { question: "Which famous landmark can you find in Dominica?", options: ["Lake Malawi", "Al-Masjid al-Haram (Grand Mosque)", "Boiling Lake", "Cape Coast Castle"], answer: 2 },
    ],
  },
  {
    id: "dominican-republic", name: "Dominican Republic", flag: "🇩🇴", continent: "North America", mapId: "DO",
    capital: "Santo Domingo", language: "Spanish", population: "11 million",
    famousFood: "La Bandera", famousLandmark: "Colonial Zone of Santo Domingo",
    funFact: "Santo Domingo has the oldest university in the Americas, built in 1538!",
    quizQuestions: [
      { question: "What is the capital city of Dominican Republic?", options: ["Santo Domingo", "Belgrade", "Bucharest", "Port-au-Prince"], answer: 0 },
      { question: "Which of these foods is famous in Dominican Republic?", options: ["Feijoada", "Mohinga", "La Bandera", "Rolex (rolled eggs in chapati)"], answer: 2 },
      { question: "Which famous landmark can you find in Dominican Republic?", options: ["Great Mosque of Djenné", "Colonial Zone of Santo Domingo", "Basilica of Our Lady of Peace", "Berat Castle"], answer: 1 },
    ],
  },
  {
    id: "el-salvador", name: "El Salvador", flag: "🇸🇻", continent: "North America", mapId: "SV",
    capital: "San Salvador", language: "Spanish", population: "6.5 million",
    famousFood: "Pupusas", famousLandmark: "Joya de Cerén",
    funFact: "El Salvador is the smallest country in Central America!",
    quizQuestions: [
      { question: "What is the capital city of El Salvador?", options: ["Moscow", "San Salvador", "Sri Jayawardenepura Kotte", "Banjul"], answer: 1 },
      { question: "Which of these foods is famous in El Salvador?", options: ["Poulet Yassa", "Pupusas", "Al Harees", "Sarmale"], answer: 1 },
      { question: "Which famous landmark can you find in El Salvador?", options: ["Harrison's Cave", "Geirangerfjord", "Joya de Cerén", "Bran Castle (Dracula's Castle)"], answer: 2 },
    ],
  },
  {
    id: "grenada", name: "Grenada", flag: "🇬🇩", continent: "North America", mapId: "GD",
    capital: "St. George's", language: "English", population: "125 thousand",
    famousFood: "Oil Down", famousLandmark: "Grand Anse Beach",
    funFact: "Grenada is called the 'Spice Isle' because it grows so much nutmeg!",
    quizQuestions: [
      { question: "What is the capital city of Grenada?", options: ["Vienna", "St. George's", "Seoul", "Moscow"], answer: 1 },
      { question: "Which of these foods is famous in Grenada?", options: ["Adobo", "Fufu & Peanut Soup", "Oil Down", "Hamburgers & Apple Pie"], answer: 2 },
      { question: "Which famous landmark can you find in Grenada?", options: ["Grand Anse Beach", "Stari Most (Old Bridge)", "Angkor Wat", "Parthenon"], answer: 0 },
    ],
  },
  {
    id: "guatemala", name: "Guatemala", flag: "🇬🇹", continent: "North America", mapId: "GT",
    capital: "Guatemala City", language: "Spanish", population: "17 million",
    famousFood: "Pepián", famousLandmark: "Tikal",
    funFact: "Guatemala has ancient Mayan pyramids hidden in the jungle!",
    quizQuestions: [
      { question: "What is the capital city of Guatemala?", options: ["Guatemala City", "Naypyidaw", "Lilongwe", "Moscow"], answer: 0 },
      { question: "Which of these foods is famous in Guatemala?", options: ["Pepián", "Bobotie & Biltong", "Poi", "Tacos & Tamales"], answer: 0 },
      { question: "Which famous landmark can you find in Guatemala?", options: ["Petronas Twin Towers", "Sibebe Rock", "Tikal", "Pitch Lake"], answer: 2 },
    ],
  },
  {
    id: "haiti", name: "Haiti", flag: "🇭🇹", continent: "North America", mapId: "HT",
    capital: "Port-au-Prince", language: "Haitian Creole & French", population: "11.5 million",
    famousFood: "Griot (fried pork)", famousLandmark: "Citadelle Laferrière",
    funFact: "Haiti was the first Black republic in the world, gaining independence in 1804!",
    quizQuestions: [
      { question: "What is the capital city of Haiti?", options: ["Port-au-Prince", "Managua", "Lisbon", "Bishkek"], answer: 0 },
      { question: "Which of these foods is famous in Haiti?", options: ["Machboos", "Nasi Lemak", "Griot (fried pork)", "Tacos & Tamales"], answer: 2 },
      { question: "Which famous landmark can you find in Haiti?", options: ["Mount Yasur Volcano", "Citadelle Laferrière", "Victoria Falls", "Matterhorn"], answer: 1 },
    ],
  },
  {
    id: "honduras", name: "Honduras", flag: "🇭🇳", continent: "North America", mapId: "HN",
    capital: "Tegucigalpa", language: "Spanish", population: "10 million",
    famousFood: "Baleadas", famousLandmark: "Copán Ruins",
    funFact: "Honduras has ancient Mayan ruins and the second largest coral reef in the world!",
    quizQuestions: [
      { question: "What is the capital city of Honduras?", options: ["Tegucigalpa", "Yaren", "Bogotá", "Ngerulmud"], answer: 0 },
      { question: "Which of these foods is famous in Honduras?", options: ["Nyembwe Chicken", "Baleadas", "Draniki (potato pancakes)", "Salteñas"], answer: 1 },
      { question: "Which famous landmark can you find in Honduras?", options: ["Garden of the Sleeping Giant", "Central Suriname Nature Reserve", "Copán Ruins", "Great Mosque of Djenné"], answer: 2 },
    ],
  },
  {
    id: "jamaica", name: "Jamaica", flag: "🇯🇲", continent: "North America", mapId: "JM",
    capital: "Kingston", language: "English & Patois", population: "3 million",
    famousFood: "Jerk Chicken & Ackee", famousLandmark: "Dunn's River Falls",
    funFact: "Jamaica is the birthplace of reggae music and Bob Marley!",
    quizQuestions: [
      { question: "What music genre was born in Jamaica?", options: ["Jazz", "Reggae", "Country", "Classical"], answer: 1 },
      { question: "What is the capital of Jamaica?", options: ["Montego Bay", "Kingston", "Ocho Rios", "Negril"], answer: 1 },
      { question: "What spicy food is Jamaica known for?", options: ["Sushi", "Jerk Chicken", "Pizza", "Tacos"], answer: 1 },
    ],
  },
  {
    id: "mexico", name: "Mexico", flag: "🇲🇽", continent: "North America", mapId: "MX",
    capital: "Mexico City", language: "Spanish", population: "130 million",
    famousFood: "Tacos & Tamales", famousLandmark: "Chichén Itzá",
    funFact: "Mexico introduced chocolate to the world!",
    quizQuestions: [
      { question: "What is the capital of Mexico?", options: ["Cancún", "Mexico City", "Guadalajara", "Monterrey"], answer: 1 },
      { question: "What ancient pyramid is in Mexico?", options: ["Giza Pyramid", "Chichén Itzá", "Machu Picchu", "Angkor Wat"], answer: 1 },
      { question: "What food is Mexico famous for?", options: ["Sushi", "Pizza", "Tacos", "Curry"], answer: 2 },
    ],
  },
  {
    id: "nicaragua", name: "Nicaragua", flag: "🇳🇮", continent: "North America", mapId: "NI",
    capital: "Managua", language: "Spanish", population: "6.9 million",
    famousFood: "Gallo Pinto", famousLandmark: "Masaya Volcano",
    funFact: "Nicaragua has a volcano where you can see glowing red lava at night!",
    quizQuestions: [
      { question: "What is the capital city of Nicaragua?", options: ["Managua", "Belgrade", "Conakry", "Canberra"], answer: 0 },
      { question: "Which of these foods is famous in Nicaragua?", options: ["Gallo Pinto", "Sadza", "Piri Piri Chicken", "Calulu"], answer: 0 },
      { question: "Which famous landmark can you find in Nicaragua?", options: ["Eiffel Tower", "Masaya Volcano", "Santa Claus Village", "Casbah of Algiers"], answer: 1 },
    ],
  },
  {
    id: "panama", name: "Panama", flag: "🇵🇦", continent: "North America", mapId: "PA",
    capital: "Panama City", language: "Spanish", population: "4.4 million",
    famousFood: "Sancocho", famousLandmark: "Panama Canal",
    funFact: "The Panama Canal connects the Atlantic and Pacific Oceans — ships take a shortcut through it!",
    quizQuestions: [
      { question: "What is the capital city of Panama?", options: ["Panama City", "Ouagadougou", "Luxembourg City", "Dushanbe"], answer: 0 },
      { question: "Which of these foods is famous in Panama?", options: ["Sancocho", "Pulaka", "Ceviche & Lomo Saltado", "Roasted Breadfruit"], answer: 0 },
      { question: "Which famous landmark can you find in Panama?", options: ["Amphitheatre of El Jem", "Grand Palace", "Panama Canal", "Prague Castle"], answer: 2 },
    ],
  },
  {
    id: "saint-kitts-and-nevis", name: "Saint Kitts and Nevis", flag: "🇰🇳", continent: "North America", mapId: "KN",
    capital: "Basseterre", language: "English", population: "48 thousand",
    famousFood: "Stewed Saltfish", famousLandmark: "Brimstone Hill Fortress",
    funFact: "Saint Kitts and Nevis is the smallest country in the Western Hemisphere!",
    quizQuestions: [
      { question: "What is the capital city of Saint Kitts and Nevis?", options: ["Basseterre", "Tashkent", "Nairobi", "Tegucigalpa"], answer: 0 },
      { question: "Which of these foods is famous in Saint Kitts and Nevis?", options: ["Ceviche & Llapingachos", "Stewed Saltfish", "Dumplings & Noodles", "Nasi Goreng"], answer: 1 },
      { question: "Which famous landmark can you find in Saint Kitts and Nevis?", options: ["Kuwait Towers", "Brimstone Hill Fortress", "Masaya Volcano", "Baalbek Temples"], answer: 1 },
    ],
  },
  {
    id: "saint-lucia", name: "Saint Lucia", flag: "🇱🇨", continent: "North America", mapId: "LC",
    capital: "Castries", language: "English", population: "180 thousand",
    famousFood: "Green Fig & Saltfish", famousLandmark: "The Pitons",
    funFact: "Saint Lucia has two famous volcanic mountain peaks called the Pitons!",
    quizQuestions: [
      { question: "What is the capital city of Saint Lucia?", options: ["Tokyo", "Castries", "Bangkok", "Jerusalem (East)"], answer: 1 },
      { question: "Which of these foods is famous in Saint Lucia?", options: ["Nyembwe Chicken", "Green Fig & Saltfish", "Bratwurst & Pretzels", "Rice & Curry"], answer: 1 },
      { question: "Which famous landmark can you find in Saint Lucia?", options: ["Avenue of the Baobabs", "Berat Castle", "The Pitons", "Bayterek Tower"], answer: 2 },
    ],
  },
  {
    id: "saint-vincent-and-the-grenadines", name: "Saint Vincent and the Grenadines", flag: "🇻🇨", continent: "North America", mapId: "VC",
    capital: "Kingstown", language: "English", population: "110 thousand",
    famousFood: "Roasted Breadfruit", famousLandmark: "La Soufrière Volcano",
    funFact: "Parts of the Pirates of the Caribbean movies were filmed here!",
    quizQuestions: [
      { question: "What is the capital city of Saint Vincent and the Grenadines?", options: ["Sana'a", "Kingstown", "Bucharest", "Yamoussoukro"], answer: 1 },
      { question: "Which of these foods is famous in Saint Vincent and the Grenadines?", options: ["Roasted Breadfruit", "Piri Piri Chicken", "Mansaf", "Fufu & Peanut Soup"], answer: 0 },
      { question: "Which famous landmark can you find in Saint Vincent and the Grenadines?", options: ["La Soufrière Volcano", "Cartagena Old City", "Great Mosque of Djenné", "Taj Mahal"], answer: 0 },
    ],
  },
  {
    id: "trinidad-and-tobago", name: "Trinidad and Tobago", flag: "🇹🇹", continent: "North America", mapId: "TT",
    capital: "Port of Spain", language: "English", population: "1.5 million",
    famousFood: "Doubles", famousLandmark: "Pitch Lake",
    funFact: "Trinidad has a lake made of natural tar — the largest in the world!",
    quizQuestions: [
      { question: "What is the capital city of Trinidad and Tobago?", options: ["Port of Spain", "Kuala Lumpur", "Dili", "Reykjavik"], answer: 0 },
      { question: "Which of these foods is famous in Trinidad and Tobago?", options: ["Doubles", "Mountain Chicken (frog legs)", "Baleadas", "Al Harees"], answer: 0 },
      { question: "Which famous landmark can you find in Trinidad and Tobago?", options: ["Pitch Lake", "Maletsunyane Falls", "Christ the Redeemer", "Monte Carlo Casino"], answer: 0 },
    ],
  },
  {
    id: "united-states", name: "United States", flag: "🇺🇸", continent: "North America", mapId: "US",
    capital: "Washington, D.C.", language: "English", population: "335 million",
    famousFood: "Hamburgers & Apple Pie", famousLandmark: "Statue of Liberty",
    funFact: "The United States put the first person on the Moon in 1969!",
    quizQuestions: [
      { question: "What is the capital city of United States?", options: ["Reykjavik", "Budapest", "Washington, D.C.", "Kingston"], answer: 2 },
      { question: "Which of these foods is famous in United States?", options: ["Hamburgers & Apple Pie", "Pepperpot", "Borscht & Blini", "Al Harees"], answer: 0 },
      { question: "Which famous landmark can you find in United States?", options: ["Galápagos Islands", "Statue of Liberty", "Sossusvlei Sand Dunes", "Ruins of Loropéni"], answer: 1 },
    ],
  },

  // ===== SOUTH AMERICA (12) =====
  {
    id: "argentina", name: "Argentina", flag: "🇦🇷", continent: "South America", mapId: "AR",
    capital: "Buenos Aires", language: "Spanish", population: "46 million",
    famousFood: "Asado & Empanadas", famousLandmark: "Iguazu Falls",
    funFact: "Argentina has a waterfall system with over 275 individual falls!",
    quizQuestions: [
      { question: "What is the capital city of Argentina?", options: ["Buenos Aires", "Sana'a", "Dushanbe", "Freetown"], answer: 0 },
      { question: "Which of these foods is famous in Argentina?", options: ["Bobotie & Biltong", "Asado & Empanadas", "Hamburgers & Apple Pie", "Shawarma & Kibbeh"], answer: 1 },
      { question: "Which famous landmark can you find in Argentina?", options: ["Angkor Wat", "Iguazu Falls", "Providence Island", "Avenue of the Baobabs"], answer: 1 },
    ],
  },
  {
    id: "bolivia", name: "Bolivia", flag: "🇧🇴", continent: "South America", mapId: "BO",
    capital: "Sucre", language: "Spanish, Quechua & Aymara", population: "12 million",
    famousFood: "Salteñas", famousLandmark: "Salar de Uyuni",
    funFact: "Bolivia has the world's largest salt flat — it looks like a giant mirror when it rains!",
    quizQuestions: [
      { question: "What is the capital city of Bolivia?", options: ["Castries", "Beijing", "Sucre", "Malabo"], answer: 2 },
      { question: "Which of these foods is famous in Bolivia?", options: ["Skyr", "Salteñas", "Lavash & Khorovats", "Ema Datshi"], answer: 1 },
      { question: "Which famous landmark can you find in Bolivia?", options: ["Salar de Uyuni", "The Pitons", "Christ the Redeemer", "Jellyfish Lake"], answer: 0 },
    ],
  },
  {
    id: "brazil", name: "Brazil", flag: "🇧🇷", continent: "South America", mapId: "BR",
    capital: "Brasília", language: "Portuguese", population: "214 million",
    famousFood: "Feijoada", famousLandmark: "Christ the Redeemer",
    funFact: "Brazil has the largest rainforest in the world — the Amazon!",
    quizQuestions: [
      { question: "What language do they speak in Brazil?", options: ["Spanish", "Portuguese", "English", "French"], answer: 1 },
      { question: "What famous statue is in Rio de Janeiro?", options: ["Statue of Liberty", "Christ the Redeemer", "The Sphinx", "Big Ben"], answer: 1 },
      { question: "What continent is Brazil in?", options: ["Africa", "Europe", "South America", "Asia"], answer: 2 },
    ],
  },
  {
    id: "chile", name: "Chile", flag: "🇨🇱", continent: "South America", mapId: "CL",
    capital: "Santiago", language: "Spanish", population: "19 million",
    famousFood: "Empanadas & Pastel de Choclo", famousLandmark: "Easter Island (Rapa Nui)",
    funFact: "Chile is the longest and narrowest country in the world!",
    quizQuestions: [
      { question: "What is the capital city of Chile?", options: ["Funafuti", "Zagreb", "Santiago", "Kyiv"], answer: 2 },
      { question: "Which of these foods is famous in Chile?", options: ["Empanadas & Pastel de Choclo", "Torta Tre Monti", "Rice and Beans", "Brik"], answer: 0 },
      { question: "Which famous landmark can you find in Chile?", options: ["Easter Island (Rapa Nui)", "Leptis Magna", "Tallinn Old Town", "Marovo Lagoon"], answer: 0 },
    ],
  },
  {
    id: "colombia", name: "Colombia", flag: "🇨🇴", continent: "South America", mapId: "CO",
    capital: "Bogotá", language: "Spanish", population: "52 million",
    famousFood: "Bandeja Paisa", famousLandmark: "Cartagena Old City",
    funFact: "Colombia has a river with five colors — it's called the Rainbow River!",
    quizQuestions: [
      { question: "What is the capital city of Colombia?", options: ["Bogotá", "St. George's", "Paramaribo", "Banjul"], answer: 0 },
      { question: "Which of these foods is famous in Colombia?", options: ["Pierogi", "Jollof Rice & Suya", "Bandeja Paisa", "Dumplings & Noodles"], answer: 2 },
      { question: "Which famous landmark can you find in Colombia?", options: ["Bahrain Fort", "Cartagena Old City", "Dzanga-Sangha Reserve", "Three Towers of San Marino"], answer: 1 },
    ],
  },
  {
    id: "ecuador", name: "Ecuador", flag: "🇪🇨", continent: "South America", mapId: "EC",
    capital: "Quito", language: "Spanish", population: "18 million",
    famousFood: "Ceviche & Llapingachos", famousLandmark: "Galápagos Islands",
    funFact: "Ecuador owns the Galápagos Islands, where Charles Darwin studied amazing animals!",
    quizQuestions: [
      { question: "What is the capital city of Ecuador?", options: ["Porto-Novo", "Vientiane", "Quito", "Apia"], answer: 2 },
      { question: "Which of these foods is famous in Ecuador?", options: ["Piri Piri Chicken", "Ceviche & Llapingachos", "Hilsa Fish Curry", "Buuz (dumplings)"], answer: 1 },
      { question: "Which famous landmark can you find in Ecuador?", options: ["Prague Castle", "Galápagos Islands", "Old Havana", "Pico do Fogo Volcano"], answer: 1 },
    ],
  },
  {
    id: "guyana", name: "Guyana", flag: "🇬🇾", continent: "South America", mapId: "GY",
    capital: "Georgetown", language: "English", population: "800 thousand",
    famousFood: "Pepperpot", famousLandmark: "Kaieteur Falls",
    funFact: "Guyana has one of the world's most powerful single-drop waterfalls — Kaieteur Falls!",
    quizQuestions: [
      { question: "What is the capital city of Guyana?", options: ["Maputo", "Georgetown", "Algiers", "Quito"], answer: 1 },
      { question: "Which of these foods is famous in Guyana?", options: ["Fufu & Pondu", "Italian Cuisine", "Pepperpot", "Mămăligă (cornmeal porridge)"], answer: 2 },
      { question: "Which famous landmark can you find in Guyana?", options: ["Kaieteur Falls", "Arenal Volcano", "Maletsunyane Falls", "Boiling Lake"], answer: 0 },
    ],
  },
  {
    id: "paraguay", name: "Paraguay", flag: "🇵🇾", continent: "South America", mapId: "PY",
    capital: "Asunción", language: "Spanish & Guarani", population: "7.4 million",
    famousFood: "Sopa Paraguaya", famousLandmark: "Itaipu Dam",
    funFact: "Paraguay has one of the largest dams in the world — the Itaipu Dam!",
    quizQuestions: [
      { question: "What is the capital city of Paraguay?", options: ["Havana", "Basseterre", "Asunción", "Yamoussoukro"], answer: 2 },
      { question: "Which of these foods is famous in Paraguay?", options: ["Sopa Paraguaya", "Gallo Pinto", "Taro & Coconut Crab", "Mohinga"], answer: 0 },
      { question: "Which famous landmark can you find in Paraguay?", options: ["Itaipu Dam", "Sultan Qaboos Grand Mosque", "Tatev Monastery", "Agadez Mosque"], answer: 0 },
    ],
  },
  {
    id: "peru", name: "Peru", flag: "🇵🇪", continent: "South America", mapId: "PE",
    capital: "Lima", language: "Spanish & Quechua", population: "34 million",
    famousFood: "Ceviche & Lomo Saltado", famousLandmark: "Machu Picchu",
    funFact: "Peru is home to a part of the Amazon Rainforest!",
    quizQuestions: [
      { question: "What ancient city is in Peru?", options: ["Chichén Itzá", "Machu Picchu", "Angkor Wat", "Petra"], answer: 1 },
      { question: "What is the capital of Peru?", options: ["Cusco", "Lima", "Arequipa", "Trujillo"], answer: 1 },
      { question: "What continent is Peru in?", options: ["Africa", "Europe", "South America", "Asia"], answer: 2 },
    ],
  },
  {
    id: "suriname", name: "Suriname", flag: "🇸🇷", continent: "South America", mapId: "SR",
    capital: "Paramaribo", language: "Dutch", population: "620 thousand",
    famousFood: "Roti", famousLandmark: "Central Suriname Nature Reserve",
    funFact: "Suriname is the smallest country in South America and mostly covered by rainforest!",
    quizQuestions: [
      { question: "What is the capital city of Suriname?", options: ["Jakarta", "Victoria", "Paramaribo", "Bridgetown"], answer: 2 },
      { question: "Which of these foods is famous in Suriname?", options: ["Roti", "Djerma Stew", "Smørrebrød", "Green Fig & Saltfish"], answer: 0 },
      { question: "Which famous landmark can you find in Suriname?", options: ["Masaya Volcano", "Central Suriname Nature Reserve", "Royal Palaces of Abomey", "Mount Karthala"], answer: 1 },
    ],
  },
  {
    id: "uruguay", name: "Uruguay", flag: "🇺🇾", continent: "South America", mapId: "UY",
    capital: "Montevideo", language: "Spanish", population: "3.5 million",
    famousFood: "Chivito", famousLandmark: "Casapueblo",
    funFact: "Uruguay hosted and won the very first FIFA World Cup in 1930!",
    quizQuestions: [
      { question: "What is the capital city of Uruguay?", options: ["Montevideo", "Kampala", "Singapore", "Berlin"], answer: 0 },
      { question: "Which of these foods is famous in Uruguay?", options: ["Pastizzi", "Skoudehkaris", "Chivito", "Italian Cuisine"], answer: 2 },
      { question: "Which famous landmark can you find in Uruguay?", options: ["Saint Sophia's Cathedral", "Casapueblo", "Kunta Kinteh Island", "Sydney Opera House"], answer: 1 },
    ],
  },
  {
    id: "venezuela", name: "Venezuela", flag: "🇻🇪", continent: "South America", mapId: "VE",
    capital: "Caracas", language: "Spanish", population: "28 million",
    famousFood: "Arepa", famousLandmark: "Angel Falls",
    funFact: "Venezuela has the tallest waterfall in the world — Angel Falls, at 979 meters!",
    quizQuestions: [
      { question: "What is the capital city of Venezuela?", options: ["Berlin", "Ottawa", "Caracas", "Vienna"], answer: 2 },
      { question: "Which of these foods is famous in Venezuela?", options: ["Nsima", "Arepa", "Laplap", "Croissants & Crêpes"], answer: 1 },
      { question: "Which famous landmark can you find in Venezuela?", options: ["Hassan II Mosque", "Registan Square", "Angel Falls", "Burj Khalifa"], answer: 2 },
    ],
  },

  // ===== OCEANIA (14) =====
  {
    id: "australia", name: "Australia", flag: "🇦🇺", continent: "Oceania", mapId: "AU",
    capital: "Canberra", language: "English", population: "26 million",
    famousFood: "Vegemite & Meat Pies", famousLandmark: "Sydney Opera House",
    funFact: "Australia has animals found nowhere else on Earth, like kangaroos and platypuses!",
    quizQuestions: [
      { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
      { question: "What famous building is in Sydney?", options: ["Big Ben", "Opera House", "White House", "Louvre"], answer: 1 },
      { question: "What animal is Australia famous for?", options: ["Elephants", "Kangaroos", "Penguins", "Lions"], answer: 1 },
    ],
  },
  {
    id: "fiji", name: "Fiji", flag: "🇫🇯", continent: "Oceania", mapId: "FJ",
    capital: "Suva", language: "English, Fijian & Hindi", population: "930 thousand",
    famousFood: "Kokoda (raw fish salad)", famousLandmark: "Garden of the Sleeping Giant",
    funFact: "Fiji has over 330 islands, but only about 110 are lived on!",
    quizQuestions: [
      { question: "What is the capital city of Fiji?", options: ["Malé", "Amman", "Suva", "Singapore"], answer: 2 },
      { question: "Which of these foods is famous in Fiji?", options: ["Kokoda (raw fish salad)", "Trdelník", "Doubles", "Pepián"], answer: 0 },
      { question: "Which famous landmark can you find in Fiji?", options: ["Machu Picchu", "Gyeongbokgung Palace", "Garden of the Sleeping Giant", "Santa Claus Village"], answer: 2 },
    ],
  },
  {
    id: "kiribati", name: "Kiribati", flag: "🇰🇮", continent: "Oceania", mapId: "KI",
    capital: "Tarawa", language: "Gilbertese & English", population: "130 thousand",
    famousFood: "Palusami", famousLandmark: "Christmas Island",
    funFact: "Kiribati is the first country to see the sunrise each day!",
    quizQuestions: [
      { question: "What is the capital city of Kiribati?", options: ["Tarawa", "N'Djamena", "Pretoria", "Accra"], answer: 0 },
      { question: "Which of these foods is famous in Kiribati?", options: ["Salteñas", "Succotash", "Palusami", "Shuwa"], answer: 2 },
      { question: "Which famous landmark can you find in Kiribati?", options: ["Casapueblo", "Christmas Island", "Colonial Zone of Santo Domingo", "Door to Hell (Darvaza Crater)"], answer: 1 },
    ],
  },
  {
    id: "marshall-islands", name: "Marshall Islands", flag: "🇲🇭", continent: "Oceania", mapId: "MH",
    capital: "Majuro", language: "Marshallese & English", population: "42 thousand",
    famousFood: "Coconut Crab", famousLandmark: "Bikini Atoll",
    funFact: "The Marshall Islands have the largest shark sanctuary in the world!",
    quizQuestions: [
      { question: "What is the capital city of Marshall Islands?", options: ["Asmara", "Paramaribo", "Majuro", "Stockholm"], answer: 2 },
      { question: "Which of these foods is famous in Marshall Islands?", options: ["Baleadas", "Coconut Crab", "Poutine & Maple Syrup", "Fufu & Pondu"], answer: 1 },
      { question: "Which famous landmark can you find in Marshall Islands?", options: ["Chichén Itzá", "Angel Falls", "Bikini Atoll", "Zuma Rock"], answer: 2 },
    ],
  },
  {
    id: "micronesia", name: "Micronesia", flag: "🇫🇲", continent: "Oceania", mapId: "FM",
    capital: "Palikir", language: "English", population: "115 thousand",
    famousFood: "Kelaguen", famousLandmark: "Nan Madol Ruins",
    funFact: "Micronesia has ancient ruins on the water called Nan Madol — sometimes called the 'Venice of the Pacific'!",
    quizQuestions: [
      { question: "What is the capital city of Micronesia?", options: ["Algiers", "Palikir", "Suva", "Phnom Penh"], answer: 1 },
      { question: "Which of these foods is famous in Micronesia?", options: ["Attiéké", "Bratwurst & Pretzels", "Kelaguen", "Torta Tre Monti"], answer: 2 },
      { question: "Which famous landmark can you find in Micronesia?", options: ["Nan Madol Ruins", "Lake Assal", "Joya de Cerén", "Schönbrunn Palace"], answer: 0 },
    ],
  },
  {
    id: "nauru", name: "Nauru", flag: "🇳🇷", continent: "Oceania", mapId: "NR",
    capital: "Yaren", language: "Nauruan & English", population: "12 thousand",
    famousFood: "Coconut Fish", famousLandmark: "Buada Lagoon",
    funFact: "Nauru is the smallest island nation in the world!",
    quizQuestions: [
      { question: "What is the capital city of Nauru?", options: ["Asunción", "Dublin", "Yaren", "Bishkek"], answer: 2 },
      { question: "Which of these foods is famous in Nauru?", options: ["Pizza & Pasta", "Coconut Fish", "Sarmale", "Sishwala"], answer: 1 },
      { question: "Which famous landmark can you find in Nauru?", options: ["Ha Long Bay", "Mount Karthala", "Buada Lagoon", "Nelson's Dockyard"], answer: 2 },
    ],
  },
  {
    id: "new-zealand", name: "New Zealand", flag: "🇳🇿", continent: "Oceania", mapId: "NZ",
    capital: "Wellington", language: "English & Māori", population: "5.1 million",
    famousFood: "Pavlova", famousLandmark: "Milford Sound",
    funFact: "New Zealand was the filming location for The Lord of the Rings!",
    quizQuestions: [
      { question: "What is the capital city of New Zealand?", options: ["Doha", "Wellington", "Tallinn", "Prague"], answer: 1 },
      { question: "Which of these foods is famous in New Zealand?", options: ["Fufu & Pondu", "Caldo de Mancarra", "Pavlova", "Tagine & Couscous"], answer: 2 },
      { question: "Which famous landmark can you find in New Zealand?", options: ["Milford Sound", "Niagara Falls", "Great Blue Hole", "Agadez Mosque"], answer: 0 },
    ],
  },
  {
    id: "palau", name: "Palau", flag: "🇵🇼", continent: "Oceania", mapId: "PW",
    capital: "Ngerulmud", language: "Palauan & English", population: "18 thousand",
    famousFood: "Taro & Coconut Crab", famousLandmark: "Jellyfish Lake",
    funFact: "Palau has a lake full of millions of golden jellyfish that don't sting!",
    quizQuestions: [
      { question: "What is the capital city of Palau?", options: ["Managua", "Riga", "Ngerulmud", "Maseru"], answer: 2 },
      { question: "Which of these foods is famous in Palau?", options: ["Taro & Coconut Crab", "Hummus & Falafel", "Gallo Pinto", "Kokoda (raw fish salad)"], answer: 0 },
      { question: "Which famous landmark can you find in Palau?", options: ["Dubrovnik Old Town", "Vallée de Mai", "Jellyfish Lake", "Mount Kilimanjaro"], answer: 2 },
    ],
  },
  {
    id: "papua-new-guinea", name: "Papua New Guinea", flag: "🇵🇬", continent: "Oceania", mapId: "PG",
    capital: "Port Moresby", language: "Tok Pisin, English & Hiri Motu", population: "10 million",
    famousFood: "Mumu (earth oven feast)", famousLandmark: "Kokoda Track",
    funFact: "Papua New Guinea has over 800 languages — more than any other country!",
    quizQuestions: [
      { question: "What is the capital city of Papua New Guinea?", options: ["Port Moresby", "Riyadh", "Kabul", "Manila"], answer: 0 },
      { question: "Which of these foods is famous in Papua New Guinea?", options: ["Poi", "Bryndzové Halušky", "Mumu (earth oven feast)", "Waffles & Chocolate"], answer: 2 },
      { question: "Which famous landmark can you find in Papua New Guinea?", options: ["African Renaissance Monument", "Kokoda Track", "Spiš Castle", "Kaieteur Falls"], answer: 1 },
    ],
  },
  {
    id: "samoa", name: "Samoa", flag: "🇼🇸", continent: "Oceania", mapId: "WS",
    capital: "Apia", language: "Samoan & English", population: "220 thousand",
    famousFood: "Oka (raw fish salad)", famousLandmark: "To Sua Ocean Trench",
    funFact: "Samoa has a magical swimming hole called To Sua — a giant pool surrounded by lush gardens!",
    quizQuestions: [
      { question: "What is the capital city of Samoa?", options: ["Washington, D.C.", "Rome", "Apia", "Dushanbe"], answer: 2 },
      { question: "Which of these foods is famous in Samoa?", options: ["Gyros & Moussaka", "Oka (raw fish salad)", "Poi", "Judd mat Gaardebounen"], answer: 1 },
      { question: "Which famous landmark can you find in Samoa?", options: ["Citadelle Laferrière", "Al-Masjid al-Haram (Grand Mosque)", "To Sua Ocean Trench", "Colosseum"], answer: 2 },
    ],
  },
  {
    id: "solomon-islands", name: "Solomon Islands", flag: "🇸🇧", continent: "Oceania", mapId: "SB",
    capital: "Honiara", language: "English", population: "720 thousand",
    famousFood: "Poi", famousLandmark: "Marovo Lagoon",
    funFact: "The Solomon Islands have the world's largest saltwater lagoon!",
    quizQuestions: [
      { question: "What is the capital city of Solomon Islands?", options: ["Havana", "Honiara", "Brussels", "Yaoundé"], answer: 1 },
      { question: "Which of these foods is famous in Solomon Islands?", options: ["Swedish Meatballs", "Pepián", "Poi", "Mumu (earth oven feast)"], answer: 2 },
      { question: "Which famous landmark can you find in Solomon Islands?", options: ["Marovo Lagoon", "Christ the Redeemer", "Sultan Omar Ali Saifuddien Mosque", "Petra"], answer: 0 },
    ],
  },
  {
    id: "tonga", name: "Tonga", flag: "🇹🇴", continent: "Oceania", mapId: "TO",
    capital: "Nuku'alofa", language: "Tongan & English", population: "106 thousand",
    famousFood: "Lu Sipi", famousLandmark: "Ha'amonga 'a Maui Trilithon",
    funFact: "Tonga is the only monarchy left in the Pacific Islands!",
    quizQuestions: [
      { question: "What is the capital city of Tonga?", options: ["Tashkent", "Rabat", "Nuku'alofa", "Gitega"], answer: 2 },
      { question: "Which of these foods is famous in Tonga?", options: ["Lu Sipi", "Salteñas", "Smørrebrød", "Judd mat Gaardebounen"], answer: 0 },
      { question: "Which famous landmark can you find in Tonga?", options: ["Source of the Nile", "Pyramids of Meroë", "Ha'amonga 'a Maui Trilithon", "Christ the Redeemer"], answer: 2 },
    ],
  },
  {
    id: "tuvalu", name: "Tuvalu", flag: "🇹🇻", continent: "Oceania", mapId: "TV",
    capital: "Funafuti", language: "Tuvaluan & English", population: "11 thousand",
    famousFood: "Pulaka", famousLandmark: "Funafuti Conservation Area",
    funFact: "Tuvalu is one of the smallest and lowest countries — parts are only 2 meters above the sea!",
    quizQuestions: [
      { question: "What is the capital city of Tuvalu?", options: ["Funafuti", "Port of Spain", "Ljubljana", "N'Djamena"], answer: 0 },
      { question: "Which of these foods is famous in Tuvalu?", options: ["Asado & Empanadas", "Griot (fried pork)", "Pulaka", "Roasted Breadfruit"], answer: 2 },
      { question: "Which famous landmark can you find in Tuvalu?", options: ["Koutammakou", "Funafuti Conservation Area", "The Pitons", "Paphos Archaeological Park"], answer: 1 },
    ],
  },
  {
    id: "vanuatu", name: "Vanuatu", flag: "🇻🇺", continent: "Oceania", mapId: "VU",
    capital: "Port Vila", language: "Bislama, English & French", population: "320 thousand",
    famousFood: "Laplap", famousLandmark: "Mount Yasur Volcano",
    funFact: "Vanuatu has an active volcano where you can stand at the edge and watch lava — Mount Yasur!",
    quizQuestions: [
      { question: "What is the capital city of Vanuatu?", options: ["Port Vila", "Thimphu", "Tehran", "Jakarta"], answer: 0 },
      { question: "Which of these foods is famous in Vanuatu?", options: ["Beshbarmak", "Laplap", "Brunost (brown cheese)", "Ikan Saboko"], answer: 1 },
      { question: "Which famous landmark can you find in Vanuatu?", options: ["Sagrada Familia", "Cartagena Old City", "Mount Yasur Volcano", "Colosseum"], answer: 2 },
    ],
  },
];

export const defaultTags = [
  { name: "🍔 Food", color: "orange" },
  { name: "⛅ Weather", color: "blue" },
  { name: "🎭 Culture", color: "purple" },
  { name: "🏔️ Landscape", color: "primary" },
  { name: "👥 People", color: "secondary" },
  { name: "🛕 Religion", color: "gold" },
  { name: "🎵 Music", color: "pink" },
  { name: "🎨 Art", color: "purple" },
  { name: "🐾 Animals", color: "primary" },
  { name: "🏗️ Buildings", color: "secondary" },
];

export function getCountry(countryId: string): Country | undefined {
  return countries.find(c => c.id === countryId);
}
