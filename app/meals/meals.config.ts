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
    tags: ["Wegetariańskie", "Nabiał", "Warzywa"],
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
    tags: ["Mięso"],
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
    tags: ["Wegetariańskie"],
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
    tags: ["Owoce"],
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
    tags: ["Wegetariańskie", "Nabiał"],
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
    tags: ["Mięso", "Włoskie"],
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
    tags: ["Nabiał", "Wegetariańskie", "Szybkie"],
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
    tags: ["Nabiał", "Wegetariańskie", "Szybkie"],
    ingredients: {
      "Pieczywo": 80,
      "Twarożek": 80,
      "Rzodkiewka": 40,
      "Szczypiorek": 5,
      "Masło": 10
    },
    recipe: [
      "Posmaruj pieczywo masłem.",
      "Rozłóż twarożek.",
      "Dodaj pokrojoną rzodkiewkę i szczypiorek."
    ],
    description: "Lekkie kanapki idealne na szybkie śniadanie.",
    suggestedMealType: [MealType.BREAKFAST],
},
{
    name: "Tosty z awokado i jajkiem",
    tags: ["Wegetariańskie", "Szybkie"],
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
    tags: ["Owoce", "Wegetariańskie"],
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
    tags: ["Mięso"],
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
    tags: ["Wegetariańskie", "Nabiał", "Włoskie"],
    ingredients: {
      "Ryż arborio": 90,
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
    tags: ["Mięso", "Ryba"],
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
      "Polej oliwą i piecz 18–20 minut."
    ],
    description: "Pieczony łosoś w towarzystwie warzyw z piekarnika.",
    suggestedMealType: [MealType.DINNER],
},
{
    name: "Kurczak pieczony z ziemniakami",
    tags: ["Mięso"],
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
    tags: ["Mięso", "Warzywa", "Tortilla"],
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
      "Ryż": 70,
      "Kukurydza": 60,
      "Ser": 40
    },
    recipe: [
      "Ugotuj ryż.",
      "Wymieszaj fasolę i kukurydzę.",
      "Nałóż farsz na tortillę, posyp serem.",
      "Zawiń i podsmaż."
    ],
    description: "Pożywne burrito w wersji wegetariańskiej.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
    name: "Pizza margherita domowa",
    tags: ["Wegetariańskie", "Nabiał", "Włoskie"],
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
    tags: ["Wegetariańskie", "Nabiał"],
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
    tags: ["Nabiał", "Wegetariańskie"],
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
      "Wylej masę i piecz 55 minut."
    ],
    description: "Tradycyjny sernik na kruchym spodzie.",
    suggestedMealType: [MealType.DESSERT],
},
{
    name: "Brownie czekoladowe",
    tags: ["Wegetariańskie", "Czekolada"],
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
      "Wymieszaj i piecz 20–25 minut."
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
    tags: ["Owoce", "Nabiał"],
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
    tags: ["Mięso", "Warzywa"],
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
    tags: ["Wegetariańskie", "Warzywa"],
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
    tags: ["Wegetariańskie", "Warzywa"],
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
    tags: ["Wegetariańskie", "Zupa"],
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
    tags: ["Mięso", "Ryba", "Nabiał"],
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
    tags: ["Mięso", "Ryba", "Warzywa"],
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
];