import { MealType } from "../generated/prisma/enums";


export type SeedMeal = {
  name: string;
  tags: string[];
  ingredients: Record<string, number>;
  description?: string;
  recipe?: string[] | null;
  suggestedMealType: MealType[];
};

export const mealsData: SeedMeal[] = [
{
    name: "Owsianka z owocami",
    tags: ["Wegetariańskie", "Nabiał", "Szybkie"],
    ingredients: {
      "Płatki owsiane": 80,
      "Jogurt naturalny": 150,
      "Banan": 100,
      "Truskawki": 70
    },
    recipe: [
      "Wsyp płatki owsiane do miski.",
      "Dodaj jogurt i dokładnie wymieszaj.",
      "Pokrój banana i truskawki, dodaj do owsianki.",
      "Opcjonalnie posyp odrobiną miodu lub cynamonu."
    ],
    description: "Kremowa owsianka na jogurcie z sezonowymi owocami.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Sałatka grecka",
    tags: ["Wegetariańskie", "Nabiał", "Warzywa", "Szybkie", "Sałatki"],
    ingredients: {
      "Sałata": 80,
      "Pomidor": 120,
      "Ogórek": 100,
      "Ser feta": 60,
      "Oliwki": 40,
      "Oliwa": 15
    },
    recipe: [
      "Porwij sałatę na mniejsze kawałki.",
      "Pokrój pomidora i ogórka w kostkę.",
      "Dodaj oliwki oraz pokruszoną fetę.",
      "Polej oliwą i delikatnie wymieszaj."
    ],
    description: "Klasyczna sałatka z fetą i oliwkami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Kurczak curry z ryżem",
    tags: ["Mięso", "Kurczak", "Ryż"],
    ingredients: {
      "Pierś z kurczaka": 180,
      "Mleko kokosowe": 200,
      "Pasta curry": 20,
      "Ryż basmati": 70
    },
    recipe: [
      "Ugotuj ryż basmati zgodnie z instrukcją.",
      "Pokrój kurczaka w kostkę i podsmaż na oleju.",
      "Dodaj pastę curry i wymieszaj.",
      "Wlej mleko kokosowe i duś 10–15 minut.",
      "Podawaj z ugotowanym ryżem."
    ],
    description: "Aromatyczne curry na mleku kokosowym podawane z ryżem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Makaron aglio e olio",
    tags: ["Wegetariańskie", "Makaron", "Makaron"],
    ingredients: {
      "Spaghetti": 90,
      "Czosnek": 10,
      "Oliwa": 20,
      "Papryczka chilli": 5,
      "Pietruszka": 5
    },
    recipe: [
      "Ugotuj makaron al dente.",
      "Podsmaż czosnek i chilli na oliwie.",
      "Dodaj odcedzony makaron i wymieszaj.",
      "Posyp świeżą pietruszką i podawaj."
    ],
    description: "Szybki makaron z czosnkiem, oliwą i chilli.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Jabłecznik domowy",
    tags: ["Owoce", "Ciasto"],
    ingredients: {
      "Jabłka": 400,
      "Mąka": 200,
      "Masło": 120,
      "Cukier": 80,
      "Cynamon": 5
    },
    recipe: [
      "Obierz jabłka i pokrój je w plasterki.",
      "Przygotuj ciasto: wymieszaj mąkę, masło i cukier.",
      "Wyłóż połowę ciasta do formy, dodaj jabłka i posyp cynamonem.",
      "Przykryj resztą ciasta i piecz około 45 minut w 180°C."
    ],
    description: "Klasyczne ciasto z dużą ilością jabłek i cynamonu.",
    suggestedMealType: [MealType.DESSERT],
},
{
    name: "Smoothie tropikalne",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: {
      "Mango": 150,
      "Ananas": 150,
      "Banan": 100,
      "Jogurt naturalny": 120
    },
    recipe: [
      "Pokrój owoce na mniejsze kawałki.",
      "Wrzuć wszystko do blendera.",
      "Dodaj jogurt i zmiksuj na gładko."
    ],
    description: "Orzeźwiające smoothie z tropikalnych owoców.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Omlet warzywny",
    tags: ["Wegetariańskie", "Nabiał", "Jajka", "Szybkie"],
    ingredients: {
      "Jajka": 120,
      "Papryka": 60,
      "Szpinak": 40,
      "Cebula": 40,
      "Ser żółty": 30
    },
    recipe: [
      "Roztrzep jajka w misce.",
      "Podsmaż cebulę i paprykę.",
      "Dodaj szpinak i wlej jajka.",
      "Posyp serem i smaż do ścięcia."
    ],
    description: "Puszysty omlet z warzywami i serem.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Spaghetti bolognese",
    tags: ["Mięso", "Włoskie", "Makaron"],
    ingredients: {
      "Makaron spaghetti": 90,
      "Mięso mielone": 150,
      "Pomidory": 150,
      "Cebula": 50,
      "Czosnek": 5
    },
    recipe: [
      "Ugotuj makaron.",
      "Podsmaż mięso mielone.",
      "Dodaj cebulę, czosnek i pomidory.",
      "Duś 20 minut i podawaj z makaronem."
    ],
    description: "Klasyczne włoskie danie z sosem mięsnym.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Chili con carne",
    tags: ["Mięso", "Warzywa"],
    ingredients: {
      "Mięso mielone": 160,
      "Fasola czerwona": 120,
      "Pomidory": 150,
      "Papryka": 80,
      "Przyprawy": 10
    },
    recipe: [
      "Podsmaż mięso mielone.",
      "Dodaj paprykę i fasolę.",
      "Wlej pomidory i duś 20–30 minut.",
      "Dopraw do smaku."
    ],
    description: "Ostre danie meksykańskie z mięsem i fasolą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Placuszki bananowe",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: {
      "Banany": 200,
      "Mąka": 80,
      "Jajka": 100,
      "Mleko": 80,
      "Cynamon": 3
    },
    recipe: [
      "Rozgnieć banana w misce.",
      "Dodaj jajka, mleko i mąkę.",
      "Wymieszaj ciasto i smaż placuszki na patelni."
    ],
    description: "Słodkie i puszyste placuszki bananowe.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Jajecznica z pomidorami",
    tags: ["Nabiał", "Wegetariańskie", "Szybkie", "Jajka"],
    ingredients: {
      "Jajka": 120,
      "Masło": 10,
      "Pomidor": 120,
      "Szczypiorek": 5,
      "Sól": 2,
      "Pieprz": 1
    },
    recipe: [
      "Rozgrzej masło na patelni.",
      "Dodaj pokrojone pomidory.",
      "Wlej roztrzepane jajka.",
      "Dopraw i posyp szczypiorkiem."
    ],
    description: "Klasyczna jajecznica z pomidorami i świeżym szczypiorkiem.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Kanapki z twarożkiem i rzodkiewką",
    tags: ["Nabiał", "Wegetariańskie", "Szybkie", "Kanapka"],
    ingredients: {
      "Pieczywo": 80,
      "Twarożek": 80,
      "Rzodkiewka": 40,
      "Szczypiorek": 5,
      "Masło": 10
    },
    recipe: [
      "Posmaruj pieczywo masłem.",
      "Nałóż twarożek.",
      "Dodaj pokrojoną rzodkiewkę i szczypiorek."
    ],
    description: "Lekkie kanapki idealne na szybkie śniadanie.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Tosty z awokado i jajkiem",
    tags: ["Wegetariańskie", "Szybkie", "Jajka", "Kanapka"],
    ingredients: {
      "Chleb tostowy": 60,
      "Awokado": 100,
      "Jajko": 50,
      "Cytryna": 5,
      "Sól": 1,
      "Pieprz": 1
    },
    recipe: [
      "Rozgnieć awokado z sokiem z cytryny.",
      "Rozsmaruj na podpieczonym chlebie.",
      "Usmaż jajko sadzone i połóż na wierzchu."
    ],
    description: "Tosty z kremowym awokado i jajkiem sadzonym.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DINNER],
},
{
    name: "Jogurt z granolą i owocami",
    tags: ["Nabiał", "Owoce", "Wegetariańskie"],
    ingredients: {
      "Jogurt naturalny": 150,
      "Granola": 50,
      "Borówki": 60,
      "Maliny": 60,
      "Miód": 10
    },
    recipe: [
      "Przełóż jogurt do miski.",
      "Dodaj granolę.",
      "Na wierzch połóż owoce i polej miodem."
    ],
    description: "Chrupiąca granola z jogurtem i świeżymi owocami.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Owocowa sałatka z miętą",
    tags: ["Owoce", "Wegetariańskie", "Sałatki"],
    ingredients: {
      "Winogrona": 100,
      "Kiwi": 80,
      "Pomarańcza": 120,
      "Jabłko": 100,
      "Mięta": 5
    },
    recipe: [
      "Pokrój owoce w kostkę.",
      "Wrzuć do miski i delikatnie wymieszaj.",
      "Dodaj świeżą miętę."
    ],
    description: "Lekka sałatka owocowa z odświeżającą nutą mięty.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Zupa krem z pomidorów",
    tags: ["Wegetariańskie", "Zupa"],
    ingredients: {
      "Pomidory": 400,
      "Bulion warzywny": 300,
      "Czosnek": 5,
      "Cebula": 50,
      "Bazylia": 5
    },
    recipe: [
      "Podsmaż cebulę i czosnek.",
      "Dodaj pokrojone pomidory i duś kilka minut.",
      "Wlej bulion i gotuj 15 minut.",
      "Zblenduj zupę i dopraw.",
      "Podawaj z bazylią."
    ],
    description: "Gładka zupa krem z dojrzałych pomidorów.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Zupa dyniowa z imbirem",
    tags: ["Wegetariańskie", "Zupa"],
    ingredients: {
      "Dynia": 350,
      "Bulion warzywny": 300,
      "Śmietanka": 50,
      "Imbir": 5,
      "Cebula": 50
    },
    recipe: [
      "Podsmaż cebulę i imbir.",
      "Dodaj pokrojoną dynię i zalej bulionem.",
      "Gotuj do miękkości.",
      "Zblenduj i dodaj śmietankę."
    ],
    description: "Rozgrzewająca zupa dyniowa z nutą imbiru.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Sałatka z kurczakiem i awokado",
    tags: ["Mięso", "Kurczak", "Warzywa", "Sałatki"],
    ingredients: {
      "Pierś z kurczaka": 150,
      "Awokado": 120,
      "Sałata": 80,
      "Pomidor": 100,
      "Oliwa": 10
    },
    recipe: [
      "Usmaż kurczaka i pokrój w paski.",
      "Pokrój awokado i pomidora.",
      "Połącz składniki z sałatą.",
      "Polej oliwą."
    ],
    description: "Sałatka z grillowanym kurczakiem i kremowym awokado.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Risotto z pieczarkami",
    tags: ["Wegetariańskie", "Grzyby"],
    ingredients: {
      "Ryż do risotto": 90,
      "Pieczarki": 150,
      "Bulion warzywny": 300,
      "Parmezan": 30,
      "Masło": 15
    },
    recipe: [
      "Podsmaż pieczarki.",
      "Dodaj ryż i chwilę przesmaż.",
      "Stopniowo wlewaj bulion, mieszając.",
      "Na końcu dodaj masło i parmezan."
    ],
    description: "Kremowe risotto z pieczarkami i parmezanem.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Łosoś pieczony z warzywami",
    tags: ["Ryba", "Warzywa"],
    ingredients: {
      "Łosoś": 180,
      "Cukinia": 120,
      "Papryka": 100,
      "Cytryna": 20,
      "Oliwa": 10
    },
    recipe: [
      "Pokrój warzywa i rozłóż na blasze.",
      "Dodaj łososia i skrop cytryną.",
      "Polej oliwą i piecz 18–20 minut w 200°C."
    ],
    description: "Pieczony łosoś w towarzystwie warzyw z piekarnika.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Kurczak pieczony z ziemniakami",
    tags: ["Mięso", "Kurczak"],
    ingredients: {
      "Ćwiartki z kurczaka": 250,
      "Ziemniaki": 200,
      "Czosnek": 5,
      "Rozmaryn": 2,
      "Oliwa": 10
    },
    recipe: [
      "Pokrój ziemniaki i wymieszaj z oliwą.",
      "Dodaj kurczaka i przyprawy.",
      "Piecz 45–55 minut w 190°C."
    ],
    description: "Tradycyjny kurczak z chrupiącymi ziemniakami z piekarnika.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Gulasz wołowy z kaszą",
    tags: ["Mięso", "Warzywa"],
    ingredients: {
      "Wołowina": 200,
      "Kasza gryczana": 70,
      "Marchew": 80,
      "Cebula": 50,
      "Papryka": 80
    },
    recipe: [
      "Podsmaż wołowinę.",
      "Dodaj warzywa i chwilę duś.",
      "Zalej wodą i gotuj 60–90 minut.",
      "Podawaj z kaszą."
    ],
    description: "Treściwy gulasz wołowy podawany z kaszą.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Tortilla z kurczakiem i warzywami",
    tags: ["Mięso", "Warzywa", "Tortilla", "Kurczak"],
    ingredients: {
      "Tortilla": 60,
      "Pierś z kurczaka": 150,
      "Sałata": 50,
      "Papryka": 60,
      "Sos czosnkowy": 25
    },
    recipe: [
      "Usmaż kurczaka i pokrój w paski.",
      "Pokrój warzywa.",
      "Nałóż składniki na tortillę.",
      "Dodaj sos i zawiń."
    ],
    description: "Zawijana tortilla z kurczakiem i świeżymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Burrito z fasolą i ryżem",
    tags: ["Wegetariańskie", "Warzywa", "Tortilla"],
    ingredients: {
      "Tortilla": 60,
      "Fasola czerwona": 120,
      "Passata": 120,
      "Ryż": 70,
      "Kukurydza": 60,
      "Ser": 40
    },
    recipe: [
      "Ugotuj ryż.",
      "Wymieszaj fasolę i kukurydzę.",
      "Dodaj passatę, warzywa, ryż i podgrzej.",
      "Nałóż farsz na tortillę, posyp serem.",
      "Zawiń i podsmaż."
    ],
    description: "Pożywne burrito w wersji wegetariańskiej.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Pizza margherita domowa",
    tags: ["Wegetariańskie", "Włoskie"],
    ingredients: {
      "Ciasto na pizzę": 220,
      "Sos pomidorowy": 80,
      "Mozzarella": 120,
      "Bazylia": 3
    },
    recipe: [
      "Rozciągnij ciasto na pizzę.",
      "Posmaruj sosem pomidorowym.",
      "Dodaj mozzarellę.",
      "Piecz 10–12 minut w 230°C.",
      "Dodaj świeżą bazylię."
    ],
    description: "Klasyczna pizza margherita z dużą ilością sera.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Naleśniki z dżemem",
    tags: ["Wegetariańskie"],
    ingredients: {
      "Mąka": 120,
      "Mleko": 250,
      "Jajka": 100,
      "Dżem truskawkowy": 60,
      "Cukier puder": 5
    },
    recipe: [
      "Wymieszaj mąkę, mleko i jajka.",
      "Usmaż cienkie naleśniki.",
      "Posmaruj dżemem i złóż.",
      "Posyp cukrem pudrem."
    ],
    description: "Cienkie naleśniki z domowym dżemem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Naleśniki ze szpinakiem i fetą",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: {
      "Mąka": 120,
      "Mleko": 250,
      "Jajka": 100,
      "Szpinak": 120,
      "Ser feta": 80,
      "Czosnek": 5
    },
    recipe: [
      "Zrób ciasto naleśnikowe.",
      "Podsmaż szpinak z czosnkiem.",
      "Dodaj pokruszoną fetę.",
      "Nałóż farsz na naleśniki i złóż."
    ],
    description: "Naleśniki zapiekane ze szpinakiem i fetą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Tarta z warzywami i serem",
    tags: ["Wegetariańskie", "Nabiał", "Warzywa"],
    ingredients: {
      "Ciasto kruche": 250,
      "Cukinia": 120,
      "Papryka": 100,
      "Ser żółty": 80,
      "Śmietanka": 50
    },
    recipe: [
      "Rozłóż ciasto w formie.",
      "Podsmaż warzywa.",
      "Wymieszaj śmietankę z jajkiem.",
      "Dodaj farsz i zapiekaj 30 minut."
    ],
    description: "Wytrawna tarta z kolorowymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Sernik pieczony",
    tags: ["Nabiał", "Wegetariańskie", "Ciasto"],
    ingredients: {
      "Twaróg": 500,
      "Jajka": 150,
      "Cukier": 100,
      "Masło": 60,
      "Herbatniki": 120
    },
    recipe: [
      "Zblenduj herbatniki z masłem i wyłóż formę.",
      "Wymieszaj twaróg, jajka i cukier.",
      "Wylej masę i piecz 55 minut w 160°C."
    ],
    description: "Tradycyjny sernik na kruchym spodzie.",
    suggestedMealType: [MealType.DESSERT],
},
{
    name: "Brownie czekoladowe",
    tags: ["Wegetariańskie", "Czekolada", "Ciasto"],
    ingredients: {
      "Czekolada gorzka": 150,
      "Masło": 120,
      "Cukier": 100,
      "Jajka": 150,
      "Mąka": 60
    },
    recipe: [
      "Rozpuść masło z czekoladą.",
      "Dodaj cukier, jajka i mąkę.",
      "Wymieszaj i piecz 20–25 minut w 200°C."
    ],
    description: "Mocno czekoladowe, wilgotne ciasto brownie.",
    suggestedMealType: [MealType.DESSERT],
},
{
    name: "Pudding chia z owocami",
    tags: ["Wegetariańskie", "Owoce", "Nabiał"],
    ingredients: {
      "Nasiona chia": 30,
      "Mleko lub napój roślinny": 180,
      "Maliny": 80,
      "Miód": 10
    },
    recipe: [
      "Wymieszaj nasiona chia z mlekiem.",
      "Wstaw do lodówki na minimum 2 godziny.",
      "Podawaj z malinami i miodem."
    ],
    description: "Lekki pudding chia z owocowym toppingiem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Tosty francuskie z owocami",
    tags: ["Nabiał", "Owoce"],
    ingredients: {
      "Chleb tostowy": 60,
      "Jajka": 60,
      "Mleko": 50,
      "Cynamon": 2,
      "Truskawki": 80,
      "Syrop klonowy": 15
    },
    recipe: [
      "Wymieszaj jajko z mlekiem i cynamonem.",
      "Zanurz chleb w mieszance.",
      "Usmaż na maśle z obu stron.",
      "Podawaj z truskawkami i syropem."
    ],
    description: "Słodkie tosty francuskie z owocami i syropem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Sałatka owocowa z jogurtem waniliowym",
    tags: ["Owoce", "Wegetariańskie", "Szybkie", "Sałatki"],
    ingredients: {
      "Jabłko": 100,
      "Gruszka": 120,
      "Winogrona": 80,
      "Jogurt waniliowy": 150
    },
    recipe: [
      "Pokrój owoce na mniejsze kawałki.",
      "Wrzuć do miski i wymieszaj.",
      "Polej jogurtem waniliowym."
    ],
    description: "Prosta sałatka owocowa z kremowym jogurtem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Leczo warzywne",
    tags: ["Wegetariańskie", "Warzywa"],
    ingredients: {
      "Papryka": 150,
      "Cukinia": 150,
      "Pomidory": 200,
      "Cebula": 80,
      "Czosnek": 5
    },
    recipe: [
      "Podsmaż cebulę i czosnek.",
      "Dodaj paprykę i cukinię.",
      "Dołóż pomidory i duś 20–30 minut."
    ],
    description: "Jednogarnkowe leczo pełne warzyw.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Leczo z kiełbasą",
    tags: ["Mięso", "Warzywa"],
    ingredients: {
      "Kiełbasa": 150,
      "Papryka": 150,
      "Cukinia": 120,
      "Pomidory": 200,
      "Cebula": 80
    },
    recipe: [
      "Podsmaż pokrojoną kiełbasę.",
      "Dodaj warzywa i duś kilka minut.",
      "Wlej pomidory i gotuj 20–25 minut."
    ],
    description: "Treściwe leczo z dodatkiem kiełbasy.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Kurczak stir-fry z warzywami",
    tags: ["Mięso", "Warzywa", "Kurczak"],
    ingredients: {
      "Pierś z kurczaka": 160,
      "Brokuł": 120,
      "Marchew": 80,
      "Papryka": 80,
      "Sos sojowy": 20
    },
    recipe: [
      "Podsmaż kurczaka na dużym ogniu.",
      "Dodaj warzywa pokrojone w słupki.",
      "Dodaj sos sojowy i smaż 2–3 minuty."
    ],
    description: "Szybki stir-fry z kurczakiem i chrupiącymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Wrap z falafelem i warzywami",
    tags: ["Wegetariańskie", "Tortilla", "Warzywa"],
    ingredients: {
      "Tortilla": 60,
      "Falafel": 120,
      "Sałata": 40,
      "Ogórek": 60,
      "Sos jogurtowy": 30
    },
    recipe: [
      "Podgrzej falafele.",
      "Pokrój warzywa.",
      "Złóż wrapa i dodaj sos."
    ],
    description: "Wege wrap z chrupiącym falafelem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Kasza jaglana z warzywami",
    tags: ["Wegetariańskie", "Warzywa"],
    ingredients: {
      "Kasza jaglana": 70,
      "Cukinia": 100,
      "Marchew": 80,
      "Cebula": 50,
      "Pietruszka": 5
    },
    recipe: [
      "Ugotuj kaszę.",
      "Podsmaż warzywa.",
      "Połącz z kaszą i dopraw."
    ],
    description: "Lekka potrawka na bazie kaszy jaglanej i warzyw.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Kasza jaglana na słodko z owocami",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: {
      "Kasza jaglana": 60,
      "Mleko": 200,
      "Jabłko": 120,
      "Rodzynki": 20,
      "Cynamon": 3
    },
    recipe: [
      "Ugotuj kaszę w mleku.",
      "Dodaj starte jabłko i rodzynki.",
      "Dopraw cynamonem."
    ],
    description: "Kasza jaglana gotowana na słodko z owocami.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
},
{
    name: "Shakshuka",
    tags: ["Wegetariańskie", "Warzywa", "Jajka"],
    ingredients: {
      "Jajka": 120,
      "Pomidory": 250,
      "Papryka": 80,
      "Cebula": 60,
      "Czosnek": 5
    },
    recipe: [
      "Podsmaż cebulę, paprykę i czosnek.",
      "Dodaj pomidory i duś 10 minut.",
      "Zrób wgłębienia i wbij jajka.",
      "Gotuj pod przykryciem do ścięcia."
    ],
    description: "Jajka gotowane w aromatycznym pomidorowym sosie.",
    suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
    name: "Tosty z hummusem i warzywami",
    tags: ["Wegetariańskie", "Warzywa", "Kanapka", "Szybkie"],
    ingredients: {
      "Chleb": 60,
      "Hummus": 50,
      "Ogórek": 60,
      "Pomidor": 80,
      "Rukola": 10
    },
    recipe: [
      "Posmaruj chleb hummusem.",
      "Dodaj pokrojone warzywa.",
      "Ułóż rukolę i podawaj."
    ],
    description: "Lekki tost z hummusem i świeżymi warzywami.",
    suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
    name: "Granola domowa z orzechami",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: {
      "Płatki owsiane": 120,
      "Orzechy": 50,
      "Miód": 20,
      "Jogurt": 150
    },
    recipe: [
      "Wymieszaj płatki z orzechami i miodem.",
      "Piecz 15 minut w 170°C.",
      "Podawaj z jogurtem."
    ],
    description: "Chrupiąca domowa granola z orzechami.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Zupa ogórkowa",
    tags: ["Wegetariańskie", "Zupa", "Polskie"],
    ingredients: {
      "Ogórki kiszone": 150,
      "Bulion": 400,
      "Ziemniaki": 150,
      "Marchew": 80
    },
    recipe: [
      "Ugotuj bulion z ziemniakami i marchwią.",
      "Dodaj starte ogórki.",
      "Gotuj 10 minut i dopraw."
    ],
    description: "Tradycyjna polska zupa ogórkowa.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Zupa jarzynowa",
    tags: ["Wegetariańskie", "Zupa"],
    ingredients: {
      "Marchew": 80,
      "Ziemniaki": 120,
      "Groszek": 80,
      "Pietruszka": 40
    },
    recipe: [
      "Pokrój warzywa.",
      "Gotuj w bulionie 20–25 minut.",
      "Dopraw do smaku."
    ],
    description: "Lekka zupa na miksie warzyw.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Kanapka z łososiem wędzonym",
    tags: ["Ryba", "Nabiał", "Kanapka", "Szybkie"],
    ingredients: {
      "Pieczywo": 80,
      "Łosoś": 60,
      "Serek śmietankowy": 40,
      "Koper": 3
    },
    recipe: [
      "Posmaruj pieczywo serkiem.",
      "Dodaj plastry łososia.",
      "Posyp koperkiem."
    ],
    description: "Delikatna kanapka z łososiem i kremowym serkiem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DINNER],
},
{
    name: "Sałatka z tuńczykiem",
    tags: ["Mięso", "Warzywa", "Sałatki"],
    ingredients: {
      "Tuńczyk": 100,
      "Sałata": 60,
      "Kukurydza": 70,
      "Ogórek": 80
    },
    recipe: [
      "Wymieszaj sałatę z warzywami.",
      "Dodaj tuńczyka.",
      "Dopraw i podawaj."
    ],
    description: "Pożywna sałatka z tuńczykiem.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Kurczak teriyaki z ryżem",
    tags: ["Mięso", "Warzywa", "Azjatyckie", "Kurczak", "Ryż"],
    ingredients: {
      "Kurczak": 160,
      "Sos teriyaki": 40,
      "Ryż": 70,
      "Brokuły": 120
    },
    recipe: [
      "Ugotuj ryż.",
      "Podsmaż kurczaka.",
      "Dodaj sos teriyaki i duś chwilę.",
      "Podawaj z gotowanymi brokułami."
    ],
    description: "Słodko-słony kurczak teriyaki.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Kofty wołowe z ryżem",
    tags: ["Mięso", "Ryż"],
    ingredients: {
      "Wołowina": 200,
      "Czosnek": 5,
      "Przyprawy": 5,
      "Ryż": 70
    },
    recipe: [
      "Wymieszaj mięso z przyprawami i czosnkiem.",
      "Uformuj kofty i usmaż lub upiecz.",
      "Podawaj z ryżem."
    ],
    description: "Aromatyczne kofty wołowe w stylu bliskowschodnim.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Makaron z tuńczykiem",
    tags: ["Ryba", "Makaron"],
    ingredients: {
      "Makaron": 90,
      "Tuńczyk": 100,
      "Majonez": 30,
      "Kukurydza": 60
    },
    recipe: [
      "Ugotuj makaron.",
      "Wymieszaj z tuńczykiem i kukurydzą.",
      "Dodaj majonez i wymieszaj."
    ],
    description: "Błyskawiczna sałatka makaronowa z tuńczykiem.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Quesadilla z serem",
    tags: ["Wegetariańskie", "Warzywa", "Meksykańskie", "Tortilla"],
    ingredients: {
      "Tortilla": 60,
      "Ser": 100,
      "Papryka": 60,
      "Kukurydza": 50
    },
    recipe: [
      "Na tortilli ułóż ser i paprykę.",
      "Przykryj drugą tortillą i podsmaż.",
      "Pokrój na trójkąty."
    ],
    description: "Złocista quesadilla z rozpływającym się serem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Quesadilla z kurczakiem",
    tags: ["Mięso", "Nabiał", "Warzywa", "Meksykańskie", "Tortilla", "Kurczak"],
    ingredients: {
      "Tortilla": 60,
      "Kurczak": 140,
      "Ser": 100,
      "Papryka": 60
    },
    recipe: [
      "Podsmaż kurczaka i pokrój w paski.",
      "Na tortilli ułóż ser, kurczaka i paprykę.",
      "Podsmaż z obu stron."
    ],
    description: "Pożywna quesadilla z grillowanym kurczakiem.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Risotto z kurczakiem",
    tags: ["Mięso", "Włoskie", "Kurczak", "Ryż"],
    ingredients: {
      "Kurczak": 150,
      "Ryż arborio": 90,
      "Parmezan": 30,
      "Bulion": 300
    },
    recipe: [
      "Podsmaż kurczaka.",
      "Dodaj ryż i stopniowo dolewaj bulion.",
      "Na końcu dodaj parmezan."
    ],
    description: "Kremowe risotto z kawałkami kurczaka.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Tarta szpinakowa",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: {
      "Ciasto kruche": 250,
      "Szpinak": 150,
      "Feta": 80,
      "Jajka": 100
    },
    recipe: [
      "Podsmaż szpinak.",
      "Wymieszaj go z fetą i jajkami.",
      "Nałóż farsz na ciasto i piecz 30 minut."
    ],
    description: "Wytrawna tarta ze szpinakiem i fetą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Frittata z warzywami",
    tags: ["Wegetariańskie", "Warzywa", "Włoskie"],
    ingredients: {
      "Jajka": 150,
      "Papryka": 80,
      "Cebula": 60,
      "Szpinak": 60
    },
    recipe: [
      "Podsmaż cebulę i paprykę.",
      "Dodaj szpinak.",
      "Wlej roztrzepane jajka i smaż na małym ogniu."
    ],
    description: "Włoska frittata pełna warzyw.",
    suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
    name: "Pieczony dorsz z ziemniakami",
    tags: ["Ryba"],
    ingredients: {
      "Dorsz": 180,
      "Cytryna": 20,
      "Masło": 10,
      "Zioła": 3,
      "Ziemniaki": 150
    },
    recipe: [
      "Ziemniaki pokrój w łódeczki, podgotuj, następnie dopraw.",
      "Ułóż dorsza w naczyniu.",
      "Dodaj plasterki cytryny i masło.",
      "Piecz wszystko 15–18 minut w 190°C."
    ],
    description: "Lekka ryba pieczona z ziemniaczanymi łódeczkami.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Zupa miso z tofu",
    tags: ["Wegetariańskie", "Zupa", "Azjatyckie"],
    ingredients: {
      "Pasta miso": 20,
      "Tofu": 100,
      "Wodorosty": 5,
      "Szczypiorek": 5
    },
    recipe: [
      "Rozpuść miso w gorącej wodzie.",
      "Dodaj tofu i wodorosty.",
      "Podawaj ze szczypiorkiem."
    ],
    description: "Japońska lekka zupa miso.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Sushi bowl",
    tags: ["Ryba", "Azjatyckie", "Ryż"],
    ingredients: {
      "Ryż": 100,
      "Łosoś": 120,
      "Awokado": 100,
      "Ogórek": 80,
      "Nori": 5
    },
    recipe: [
      "Ugotuj ryż do sushi.",
      "Pokrój łososia, awokado i ogórka.",
      "Ułóż składniki w misce i dodaj nori."
    ],
    description: "Bowl inspirowany sushi.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Makaron z krewetkami",
    tags: ["Ryba", "Makaron"],
    ingredients: {
      "Krewetki": 150,
      "Czosnek": 8,
      "Makaron": 90,
      "Oliwa": 15
    },
    recipe: [
      "Podsmaż krewetki z czosnkiem.",
      "Ugotuj makaron.",
      "Połącz składniki i wymieszaj na patelni."
    ],
    description: "Makaron z krewetkami w czosnkowym sosie.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Curry z ciecierzycą",
    tags: ["Wegetariańskie", "Azjatyckie", "Warzywa"],
    ingredients: {
      "Ciecierzyca": 150,
      "Pomidory": 200,
      "Kumin": 5,
      "Mleko kokosowe": 150
    },
    recipe: [
      "Podsmaż przyprawy.",
      "Dodaj pomidory i ciecierzycę.",
      "Wlej mleko kokosowe i duś 10–15 minut."
    ],
    description: "Wege curry z ciecierzycą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Penne arrabbiata",
    tags: ["Wegetariańskie", "Włoskie", "Makaron"],
    ingredients: {
      "Makaron": 90,
      "Pomidory": 200,
      "Czosnek": 6,
      "Chilli": 3
    },
    recipe: [
      "Ugotuj makaron.",
      "Podsmaż czosnek i chilli.",
      "Dodaj pomidory i duś.",
      "Połącz z makaronem."
    ],
    description: "Ostry włoski makaron arrabbiata.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Makaron carbonara",
    tags: ["Mięso", "Włoskie", "Makaron"],
    ingredients: {
      "Spaghetti": 90,
      "Boczek": 80,
      "Jajko": 50,
      "Parmezan": 30
    },
    recipe: [
      "Podsmaż boczek.",
      "Wymieszaj jajko z parmezanem.",
      "Połącz z gorącym makaronem."
    ],
    description: "Włoska carbonara bez śmietany.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Pieczone bataty z fetą",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: {
      "Bataty": 250,
      "Feta": 80,
      "Ciecierzyca": 100,
      "Szpinak": 80
    },
    recipe: [
      "Przekrój bataty i upiecz.",
      "Dodaj ciecierzycę i szpinak do batatów.",
      "Posyp fetą i zapiecz chwilę."
    ],
    description: "Pieczone bataty faszerowane fetą i warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Zapiekanka makaronowa z kurczakiem",
    tags: ["Mięso", "Nabiał", "Warzywa", "Makaron", "Kurczak"],
    ingredients: {
      "Makaron": 90,
      "Kurczak": 150,
      "Ser": 100,
      "Brokuły": 120
    },
    recipe: [
      "Ugotuj makaron i brokuły.",
      "Podsmaż kurczaka.",
      "Wymieszaj wszystko, posyp serem i zapiecz."
    ],
    description: "Zapiekanka makaronowa z kurczakiem i warzywami.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Bruschetta z pomidorami",
    tags: ["Wegetariańskie", "Warzywa", "Szybkie", "Włoskie"],
    ingredients: {
      "Chleb": 60,
      "Pomidory": 120,
      "Czosnek": 5,
      "Bazylia": 3
    },
    recipe: [
      "Podpiecz kromki chleba.",
      "Natrzyj je czosnkiem.",
      "Nałóż pokrojone pomidory.",
      "Posyp bazylią."
    ],
    description: "Śródziemnomorskie bruschetty.",
    suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
    name: "Sałatka caprese",
    tags: ["Wegetariańskie", "Nabiał", "Warzywa", "Sałatki"],
    ingredients: {
      "Mozzarella": 120,
      "Pomidory": 150,
      "Bazylia": 3,
      "Oliwa": 10
    },
    recipe: [
      "Pokrój pomidory i mozzarellę w plastry.",
      "Ułóż naprzemiennie.",
      "Polej oliwą i dodaj bazylię."
    ],
    description: "Włoska klasyczna sałatka caprese.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Grillowany bakłażan z tahini",
    tags: ["Wegetariańskie", "Warzywa"],
    ingredients: {
      "Bakłażan": 200,
      "Tahini": 20,
      "Cytryna": 10,
      "Czosnek": 5
    },
    recipe: [
      "Przekrój bakłażan i grilluj do miękkości.",
      "Wymieszaj tahini z cytryną i czosnkiem.",
      "Polej sosem."
    ],
    description: "Aromatyczny pieczony bakłażan z sosem tahini.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Zupa krem z brokułów",
    tags: ["Wegetariańskie", "Warzywa", "Zupa"],
    ingredients: {
      "Brokuł": 300,
      "Bulion": 300,
      "Czosnek": 5,
      "Śmietanka": 50
    },
    recipe: [
      "Gotuj brokuł w bulionie.",
      "Dodaj czosnek.",
      "Zblenduj i dodaj śmietankę."
    ],
    description: "Delikatny krem brokułowy.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Gnocchi z pesto",
    tags: ["Wegetariańskie", "Włoskie"],
    ingredients: {
      "Gnocchi": 200,
      "Pesto": 50,
      "Parmezan": 20
    },
    recipe: [
      "Ugotuj gnocchi.",
      "Wymieszaj z pesto.",
      "Posyp parmezanem."
    ],
    description: "Włoskie gnocchi w zielonym pesto.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Ryż smażony z jajkiem",
    tags: ["Wegetariańskie", "Warzywa", "Azjatyckie", "Jajka", "Ryż"],
    ingredients: {
      "Ryż": 120,
      "Jajko": 50,
      "Sos sojowy": 15,
      "Groszek": 60,
      "Marchew": 60
    },
    recipe: [
      "Ugotuj ryż.",
      "Podsmaż warzywa.",
      "Dodaj ryż i jajko.",
      "Dopraw sosem sojowym."
    ],
    description: "Azjatycki smażony ryż z jajkiem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Kebab z kurczaka w tortilli",
    tags: ["Mięso", "Tortilla", "Kurczak"],
    ingredients: {
      "Kurczak": 160,
      "Tortilla": 60,
      "Sałata": 50,
      "Pomidor": 80,
      "Sos czosnkowy": 25
    },
    recipe: [
      "Podsmaż kurczaka i pokrój.",
      "Dodaj warzywa.",
      "Dodaj ulubiony sos.",
      "Zawiń w tortillę."
    ],
    description: "Domowy kebab z kurczakiem i świeżymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Burrito z wołowiną",
    tags: ["Mięso", "Tortilla", "Meksykańskie"],
    ingredients: {
      "Wołowina": 160,
      "Ryż": 70,
      "Fasola": 100,
      "Tortilla": 60,
      "Salsa": 40
    },
    recipe: [
      "Ugotuj ryż.",
      "Podsmaż wołowinę.",
      "Wymieszaj z fasolą i salsą.",
      "Zawiń w tortillę."
    ],
    description: "Meksykańskie burrito z aromatyczną wołowiną.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Ramen z kurczakiem",
    tags: ["Mięso", "Zupa", "Azjatyckie", "Kurczak"],
    ingredients: {
      "Bulion": 400,
      "Makaron ramen": 120,
      "Kurczak": 150,
      "Jajko": 50
    },
    recipe: [
      "Ugotuj bulion.",
      "Dodaj makaron i kurczaka.",
      "Podawaj z jajkiem."
    ],
    description: "Japoński ramen w bogatym bulionie.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Ramen wegetariański",
    tags: ["Wegetariańskie", "Zupa", "Azjatyckie", "Grzyby"],
    ingredients: {
      "Bulion warzywny": 400,
      "Makaron ramen": 120,
      "Tofu": 100,
      "Grzyby": 100
    },
    recipe: [
      "Ugotuj bulion.",
      "Dodaj makaron, tofu i grzyby.",
      "Gotuj kilka minut."
    ],
    description: "Wegetariański ramen pełen umami.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Pieczony łosoś z ryżem",
    tags: ["Ryba", "Ryż", "Wegetariańskie"],
    ingredients: {
      "Łosoś": 180,
      "Ryż": 70,
      "Cytryna": 10,
      "Masło": 10,
      "Koper": 3
    },
    recipe: [
      "Upiecz łososia z cytryną i masłem.",
      "Ugotuj ryż.",
      "Podawaj razem."
    ],
    description: "Delikatny pieczony łosoś z aromatyczną cytryną.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Tofu stir-fry",
    tags: ["Wegetariańskie", "Azjatyckie"],
    ingredients: {
      "Tofu": 150,
      "Warzywa": 200,
      "Sos sojowy": 20,
      "Imbir": 5
    },
    recipe: [
      "Podsmaż tofu.",
      "Dodaj warzywa i imbir.",
      "Dopraw sosem sojowym."
    ],
    description: "Azjatycki stir-fry z tofu i warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Bowl z kurczakiem i ryżem",
    tags: ["Mięso", "Warzywa", "Kurczak", "Ryż"],
    ingredients: {
      "Kurczak": 160,
      "Ryż": 70,
      "Awokado": 100,
      "Mix warzyw": 120
    },
    recipe: [
      "Ugotuj ryż.",
      "Podsmaż kurczaka.",
      "Dodaj warzywa i awokado."
    ],
    description: "Kolorowy bowl z kurczakiem.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Pinsa margherita",
    tags: ["Wegetariańskie", "Włoskie"],
    ingredients: {
      "Pinsa": 220,
      "Mozzarella": 120,
      "Pomidory": 100,
      "Bazylia": 3
    },
    recipe: [
      "Rozciągnij ciasto.",
      "Dodaj sos i mozzarellę.",
      "Piecz 10–12 minut w 220°C."
    ],
    description: "Włoska pinsa z sosem pomidorowym.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Pierogi ruskie",
    tags: ["Wegetariańskie", "Polskie"],
    ingredients: {
      "Mąka": 500,
      "Gorąca woda": 200,
      "Olej": 50,
      "Sól": 4,
      "Twaróg": 300,
      "Cebula": 300,
      "Ziemniaki": 500,
      "Masło": 15,
    },
    recipe: [
      "Ugotuj ziemniaki i ubij na puree, dopraw 2g solą i pieprzem.",
      "Podsmaż na maśle cebulę.",
      "Farsz: wymieszaj twaróg, ziemniaki i cebulę.",
      "Ciasto: wymieszaj mąkę, sól, olej i gorącą wodę. Zagnieć i odstaw na 30 minut.",
      "Rozwałkuj ciasto i wycinaj kółka ok 8 cm.",
      "Nałóż farsz i zlep pierogi.",
      "Gotuj w osolonej wodzie do wypłynięcia + 2 minuty.",
      "Podawaj z podsmażoną cebulką"
    ],
    description: "Chrupiące pierogi ruskie na maśle.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Wegetariańskie chilli",
    tags: ["Wegetariańskie", "Warzywa"],
    ingredients: {
      "Fasola": 150,
      "Pomidory": 200,
      "Kukurydza": 80,
      "Czosnek": 5
    },
    recipe: [
      "Podsmaż czosnek.",
      "Dodaj fasolę i pomidory.",
      "Dodaj kukurydzę i duś 15 minut."
    ],
    description: "Wegetariańska wersja chilli bez mięsa.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Schabowy z ziemniakami",
    tags: ["Mięso", "Polskie"],
    ingredients: {
      "Schab": 180,
      "Jajko": 50,
      "Bułka tarta": 100,
      "Masło": 20,
      "Ziemniaki": 200
    },
    recipe: [
      "Rozbij schab.",
      "Obtocz schab w jajku i bułce tartej, następnie usmaż.",
      "Ugotuj ziemniaki.",
      "Podawaj razem."
    ],
    description: "Polski klasyk — kotlet schabowy.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Kurczak pieczony z ziemniakami i warzywami",
    tags: ["Mięso", "Kurczak", "Warzywa"],
    ingredients: {
      "Kurczak": 200,
      "Ziemniaki": 200,
      "Rozmaryn": 3,
      "Cebula": 80,
      "Marchew": 80,
      "Seler": 80,
      "Oliwa": 15
    },
    recipe: [
      "Ułóż kurczaka i wszystkie warzywa w naczyniu.",
      "Dodaj przyprawy i polej oliwą.",
      "Piecz 45–55 minut w 200°C."
    ],
    description: "Pieczony kurczak z chrupiącą skórką.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Wrap wege z falafelem",
    tags: ["Wegetariańskie", "Tortilla", "Warzywa"],
    ingredients: {
      "Falafel": 120,
      "Papryka": 50,
      "Sałata": 50,
      "Pomidor": 80,
      "Ogórek": 60,
      "Tortilla": 60
    },
    recipe: [
      "Podgrzej falafele.",
      "Dodaj warzywa i zawiń wrapa.",
      "Podawaj z ulubionym sosem."
    ],
    description: "Pożywny wege wrap z falafelem.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Bowl z tofu i warzywami",
    tags: ["Wegetariańskie", "Warzywa", "Azjatyckie"],
    ingredients: {
      "Tofu": 150,
      "Ryż": 70,
      "Sos sojowy": 20,
      "Warzywa": 150,
      "Sezam": 5
    },
    recipe: [
      "Ugotuj ryż.",
      "Podsmaż tofu z sosem sojowym.",
      "Dodaj warzywa i sezam."
    ],
    description: "Warzywny bowl z tofu.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Łosoś teriyaki",
    tags: ["Ryba", "Azjatyckie"],
    ingredients: {
      "Łosoś": 180,
      "Sos teriyaki": 40,
      "Sezam": 5
    },
    recipe: [
      "Natrzyj łososia sosem.",
      "Upiecz 15–18 minut w 180°C.",
      "Posyp sezamem.",
      "Podawaj z ulubionymi dodatkami"
    ],
    description: "Słodko-słony łosoś teriyaki.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Smażony makaron z kurczakiem",
    tags: ["Mięso", "Azjatyckie", "Kurczak", "Makaron"],
    ingredients: {
      "Makaron": 90,
      "Kurczak": 150,
      "Warzywa": 150,
      "Sos sojowy": 20
    },
    recipe: [
      "Podsmaż kurczaka i dodaj sos sojowy.",
      "Dodaj warzywa.",
      "Dodaj makaron i wymieszaj na dużym ogniu."
    ],
    description: "Azjatycki smażony makaron stir-fry.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Smażony makaron wege",
    tags: ["Wegetariańskie", "Azjatyckie", "Warzywa", "Makaron"],
    ingredients: {
      "Makaron": 90,
      "Mix warzyw azjatyckich": 150,
      "Sos sojowy": 20
    },
    recipe: [
      "Podsmaż warzywa.",
      "Dodaj ugotowany makaron.",
      "Dodaj sos sojowy."
    ],
    description: "Warzywna wersja makaronu stir-fry.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Gulasz wołowy",
    tags: ["Mięso", "Warzywa"],
    ingredients: {
      "Wołowina": 200,
      "Papryka": 80,
      "Cebula": 60
    },
    recipe: [
      "Podsmaż wołowinę.",
      "Dodaj warzywa.",
      "Duś do miękkości."
    ],
    description: "Gęsty gulasz z wołowiny.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Tacos z kurczakiem",
    tags: ["Mięso", "Tortilla", "Meksykańskie", "Kurczak"],
    ingredients: {
      "Kurczak": 140,
      "Taco shell": 80,
      "Papryka": 80,
      "Kukurydza": 60,
      "Sos sweet chilli": 40
    },
    recipe: [
      "Podsmaż kurczaka.",
      "Dodaj warzywa do tortilli.",
      "Podawaj jako tacos z sosem sweet chilli."
    ],
    description: "Tacos w stylu tex-mex.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Tacos wegetariańskie",
    tags: ["Wegetariańskie", "Tortilla", "Warzywa", "Meksykańskie"],
    ingredients: {
      "Fasola": 120,
      "Papryka": 80,
      "Kukurydza": 60,
      "Taco shell": 80,
      "Sos salsa": 40
    },
    recipe: [
      "Wymieszaj fasolę z warzywami.",
      "Dodaj salsę.",
      "Podawaj w muszlach taco."
    ],
    description: "Chrupiące tacos w wersji wege.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Zupa krem z dyni",
    tags: ["Wegetariańskie", "Warzywa", "Nabiał", "Zupa"],
    ingredients: {
      "Dynia": 350,
      "Cebula": 60,
      "Imbir": 5,
      "Śmietanka": 50
    },
    recipe: [
      "Podsmaż cebulę i imbir.",
      "Dodaj dynię i gotuj do miękkości.",
      "Zblenduj i dodaj śmietankę."
    ],
    description: "Aromatyczna jesienna zupa dyniowa.",
    suggestedMealType: [MealType.LUNCH],
},
{
    name: "Bakłażan zapiekany z serem",
    tags: ["Wegetariańskie", "Nabiał", "Warzywa"],
    ingredients: {
      "Bakłażan": 250,
      "Ser": 120,
      "Pomidory": 150
    },
    recipe: [
      "Pokrój bakłażan i pomidory.",
      "Ułóż warstwami z serem.",
      "Zapiekaj 25 minut."
    ],
    description: "Pieczony bakłażan pod serową warstwą.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Ryż z kurczakiem po hiszpańsku",
    tags: ["Mięso", "Warzywa", "Kurczak", "Ryż"],
    ingredients: {
      "Ryż": 90,
      "Kurczak": 150,
      "Papryka": 80,
      "Kukurydza": 60,
      "Kurkuma": 3
    },
    recipe: [
      "Podsmaż kurczaka.",
      "Dodaj paprykę, kukurydzę i ryż.",
      "Dopraw kurkumą i duś do miękkości."
    ],
    description: "Kolorowy ryż z kurczakiem.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Jajka po turecku",
    tags: ["Wegetariańskie", "Nabiał", "Jajka"],
    ingredients: {
      "Jajka": 100,
      "Jogurt": 120,
      "Masło": 20,
      "Papryka": 3
    },
    recipe: [
      "Ugotuj jajka w koszulce.",
      "Podawaj na jogurcie.",
      "Polej masłem z papryką."
    ],
    description: "Śniadaniowa klasyka kuchni tureckiej.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
  name: "Sałatka z łososiem i awokado",
  tags: ["Ryba", "Sałatki", "Warzywa", "Bezglutenowe"],
  ingredients: {
    "Łosoś wędzony": 100,
    "Awokado": 120,
    "Sałata mieszana": 80,
    "Ogórek": 80,
    "Oliwa": 10,
    "Sok z cytryny": 10
  },
  recipe: [
    "Pokrój awokado i ogórka.",
    "Sałatę wymieszaj z oliwą i cytryną.",
    "Dodaj łososia i podawaj."
  ],
  description: "Lekka i pożywna sałatka z łososia.",
  suggestedMealType: [MealType.LUNCH]
},
{
  name: "Owsianka bananowo-czekoladowa",
  tags: ["Nabiał", "Owoce", "Czekolada"],
  ingredients: {
    "Płatki owsiane": 70,
    "Mleko": 200,
    "Banan": 120,
    "Czekolada gorzka": 15
  },
  recipe: [
    "Ugotuj owsiankę na mleku.",
    "Dodaj pokrojonego banana.",
    "Posyp posiekaną czekoladą."
  ],
  description: "Kremowa owsianka na słodki początek dnia.",
  suggestedMealType: [MealType.BREAKFAST]
},
  {
    name: "Smoothie truskawkowo-bananowe",
    tags: ["Owoce", "Szybkie"],
    ingredients: {
      "Truskawki": 150,
      "Banan": 120,
      "Jogurt": 150
    },
    recipe: [
      "Wrzuć wszystkie składniki do blendera.",
      "Zmiksuj na gładko.",
      "Podawaj schłodzone."
    ],
    description: "Owocowe smoothie idealne na lato.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT]
  },
  {
    name: "Kanapka z serem i ogórkiem",
    tags: ["Kanapka", "Wegetariańskie", "Szybkie"],
    ingredients: {
      "Pieczywo": 80,
      "Ser żółty": 30,
      "Ogórek": 60,
      "Masło": 10
    },
    recipe: [
      "Posmaruj pieczywo masłem.",
      "Ułóż plasterki sera i ogórka.",
      "Podawaj od razu."
    ],
    description: "Prosta kanapka na szybkie śniadanie.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DINNER]
  },
    {
    name: "Tosty z szynką i serem",
    tags: ["Kanapka", "Mięso", "Nabiał", "Szybkie"],
    ingredients: {
      "Chleb tostowy": 80,
      "Szynka": 40,
      "Ser": 40
    },
    recipe: [
      "Ułóż szynkę i ser między kromkami.",
      "Zapiecz w tosterze.",
      "Podawaj gorące."
    ],
    description: "Proste, szybkie tosty.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DINNER]
  },
    {
    name: "Kluski śląskie z sosem",
    tags: ["Polskie", "Wegetariańskie", "Grzyby"],
    ingredients: {
      "Kluski śląskie": 250,
      "Pieczarki": 200,
      "Śmietanka": 100,
      "Cebula": 80
    },
    recipe: [
      "Ugotuj kluski śląskie.",
      "Usmaż cebulę i dodaj pieczarki.",
      "Poczekaj aż pieczarki puszczą sok, następnie dodaj śmietankę i duś do zgęstnienia.",
      "Podawaj razem."
    ],
    description: "Tradycyjne kluski śląskie z sosem pieczarkowym.",
    suggestedMealType: [MealType.DINNER]
  },
    {
    name: "Gofry jogurtowe z nutellą",
    tags: ["Szybkie", "Czekolada"],
    ingredients: {
      "Mąka": 80,
      "Jogurt": 120,
      "Jajko": 50,
      "Cukier": 30,
      "Nutella": 30
    },
    recipe: [
      "Wymieszaj składniki.",
      "Wlej ciasto do gofrownicy.",
      "Piecz 4–5 minut.",
      "Podawaj z nutellą."
    ],
    description: "Delikatne gofry bez masła.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT]
  },
  { 
    name: "Gulasz z indyka",
    tags: ["Mięso", "Warzywa"],
    ingredients: {
      "Indyk": 180,
      "Papryka": 80,
      "Cebula": 80,
      "Bulion": 150
    },
    recipe: [
      "Podsmaż indyka.",
      "Dodaj warzywa.",
      "Duś w bulionie 20 minut."
    ],
    description: "Lekki jednogarnkowy gulasz.",
    suggestedMealType: [MealType.DINNER]
  },
  {
    name: "Jajka na miękko z chlebem",
    tags: ["Jajka", "Szybkie", "Wegetariańskie"],
    ingredients: {
      "Jajka": 100,
      "Pieczywo": 60
    },
    recipe: [
      "Ugotuj jajka na miękko (5–6 minut).",
      "Podawaj z pieczywem."
    ],
    description: "Najprostsze śniadanie, ale zawsze smaczne.",
    suggestedMealType: [MealType.BREAKFAST]
  },
  {
    name: "Ryż z jabłkiem i cynamonem",
    tags: ["Owoce", "Ryż", "Szybkie", "Wegetariańskie"],
    ingredients: {
      "Ryż": 90,
      "Jabłko": 120,
      "Cynamon": 2
    },
    recipe: [
      "Ugotuj ryż.",
      "Dodaj starte jabłko.",
      "Posyp cynamonem."
    ],
    description: "Lekki słodki posiłek.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT]
  },
  {
    name: "Parówki frankfurterki z żytnim pieczywem",
    tags: ["Mięso", "Szybkie"],
    ingredients: {
      "Frankfurterki": 80,
      "Bułka": 70
    },
    recipe: [
      "Ugotuj frankfurterki.",
      "Włóż do bułki.",
      "Podawaj z ketchupem."
    ],
    description: "Szybki, prosty hot-dog.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DINNER]
  },

];