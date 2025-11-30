import { PrismaClient, Prisma } from "@/app/generated/prisma/client"
import bcrypt from "bcrypt";
import { MealType } from "@/app/generated/prisma/enums";

const prisma = new PrismaClient()

const tagsData: Prisma.TagCreateInput[] = [
    { name: "Nabiał" },
    { name: "Wegetariańskie" },
    { name: "Owoce" },
    { name: "Mięso" },
    { name: "Bezglutenowe" },
    { name: "Wegańskie" },
    { name: "Szybkie" },
    { name: "Przekąska" },
    { name: "Zupy" },
    { name: "Sałatki" },
]

type SeedMeal = {
  name: string;
  tags: string[];
  ingredients: string[];
  description: string;
  suggestedMealType: MealType[];
};

const mealsData: SeedMeal[] = [
  {
    name: "Owsianka z owocami",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: ["Płatki owsiane", "Jogurt naturalny", "Banany", "Truskawki"],
    description: "Kremowa owsianka na jogurcie z sezonowymi owocami.",
    suggestedMealType: [MealType.BREAKFAST],
  },
  {
    name: "Sałatka grecka",
    tags: ["Wegetariańskie"],
    ingredients: ["Sałata", "Pomidor", "Ogórek", "Ser feta", "Oliwki", "Oliwa"],
    description: "Klasyczna sałatka z fetą i oliwkami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Kurczak curry z ryżem",
    tags: ["Mięso"],
    ingredients: ["Pierś z kurczaka", "Mleko kokosowe", "Pasta curry", "Ryż basmati"],
    description: "Aromatyczne curry na mleku kokosowym podawane z ryżem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Makaron aglio e olio",
    tags: ["Wegetariańskie"],
    ingredients: ["Spaghetti", "Czosnek", "Oliwa", "Papryczka chilli", "Pietruszka"],
    description: "Szybki makaron z czosnkiem, oliwą i chilli.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Jabłecznik domowy",
    tags: ["Owoce"],
    ingredients: ["Jabłka", "Mąka", "Masło", "Cukier", "Cynamon"],
    description: "Klasyczne ciasto z dużą ilością jabłek i cynamonu.",
    suggestedMealType: [MealType.DESSERT],
  },
  {
    name: "Smoothie tropikalne",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: ["Mango", "Ananas", "Banan", "Jogurt naturalny"],
    description: "Orzeźwiające smoothie z tropikalnych owoców.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Omlet warzywny",
    tags: ["Wegetariańskie"],
    ingredients: ["Jajka", "Papryka", "Szpinak", "Cebula", "Ser żółty"],
    description: "Puszysty omlet z warzywami i serem.",
    suggestedMealType: [MealType.BREAKFAST],
  },
  {
    name: "Spaghetti bolognese",
    tags: ["Mięso"],
    ingredients: ["Makaron spaghetti", "Mięso mielone", "Pomidory", "Cebula", "Czosnek"],
    description: "Klasyczne włoskie danie z sosem mięsnym.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Chili con carne",
    tags: ["Mięso"],
    ingredients: ["Mięso mielone", "Fasola czerwona", "Pomidory", "Papryka", "Przyprawy"],
    description: "Ostre danie meksykańskie z mięsem i fasolą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Placuszki bananowe",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: ["Banany", "Mąka", "Jajka", "Mleko", "Cynamon"],
    description: "Słodkie i puszyste placuszki bananowe.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
{
    name: "Jajecznica z pomidorami",
    tags: ["Nabiał", "Wegetariańskie"],
    ingredients: ["Jajka", "Masło", "Pomidor", "Szczypiorek", "Sól", "Pieprz"],
    description: "Klasyczna jajecznica z pomidorami i świeżym szczypiorkiem.",
    suggestedMealType: [MealType.BREAKFAST],
  },
  {
    name: "Kanapki z twarożkiem i rzodkiewką",
    tags: ["Nabiał", "Wegetariańskie"],
    ingredients: ["Pieczywo", "Twarożek", "Rzodkiewka", "Szczypiorek", "Masło"],
    description: "Lekkie kanapki idealne na szybkie śniadanie.",
    suggestedMealType: [MealType.BREAKFAST],
  },
  {
    name: "Tosty z awokado i jajkiem",
    tags: ["Wegetariańskie"],
    ingredients: ["Chleb tostowy", "Awokado", "Jajko", "Cytryna", "Sól", "Pieprz"],
    description: "Tosty z kremowym awokado i jajkiem sadzonym.",
    suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
  },
  {
    name: "Jogurt z granolą i owocami",
    tags: ["Nabiał", "Owoce", "Wegetariańskie"],
    ingredients: ["Jogurt naturalny", "Granola", "Borówki", "Maliny", "Miód"],
    description: "Chrupiąca granola z jogurtem i świeżymi owocami.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Owocowa sałatka z miętą",
    tags: ["Owoce", "Wegetariańskie"],
    ingredients: ["Winogrona", "Kiwi", "Pomarańcza", "Jabłko", "Mięta"],
    description: "Lekka sałatka owocowa z odświeżającą nutą mięty.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Zupa krem z pomidorów",
    tags: ["Wegetariańskie"],
    ingredients: ["Pomidory", "Bulion warzywny", "Czosnek", "Cebula", "Bazylia"],
    description: "Gładka zupa krem z dojrzałych pomidorów.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Zupa dyniowa z imbirem",
    tags: ["Wegetariańskie"],
    ingredients: ["Dynia", "Bulion warzywny", "Śmietanka", "Imbir", "Cebula"],
    description: "Rozgrzewająca zupa dyniowa z nutą imbiru.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Sałatka z kurczakiem i awokado",
    tags: ["Mięso"],
    ingredients: ["Pierś z kurczaka", "Awokado", "Sałata", "Pomidor", "Oliwa"],
    description: "Sałatka z grillowanym kurczakiem i kremowym awokado.",
    suggestedMealType: [MealType.LUNCH],
  },
  {
    name: "Risotto z pieczarkami",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: ["Ryż arborio", "Pieczarki", "Bulion warzywny", "Parmezan", "Masło"],
    description: "Kremowe risotto z pieczarkami i parmezanem.",
    suggestedMealType: [MealType.DINNER],
  },
  {
    name: "Łosoś pieczony z warzywami",
    tags: ["Mięso"],
    ingredients: ["Łosoś", "Cukinia", "Papryka", "Cytryna", "Oliwa"],
    description: "Pieczony łosoś w towarzystwie warzyw z piekarnika.",
    suggestedMealType: [MealType.DINNER],
  },
  {
    name: "Kurczak pieczony z ziemniakami",
    tags: ["Mięso"],
    ingredients: ["Ćwiartki z kurczaka", "Ziemniaki", "Czosnek", "Rozmaryn", "Oliwa"],
    description: "Tradycyjny kurczak z chrupiącymi ziemniakami z piekarnika.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Gulasz wołowy z kaszą",
    tags: ["Mięso"],
    ingredients: ["Wołowina", "Kasza gryczana", "Marchew", "Cebula", "Papryka"],
    description: "Treściwy gulasz wołowy podawany z kaszą.",
    suggestedMealType: [MealType.DINNER],
  },
  {
    name: "Tortilla z kurczakiem i warzywami",
    tags: ["Mięso"],
    ingredients: ["Tortilla", "Pierś z kurczaka", "Sałata", "Papryka", "Sos czosnkowy"],
    description: "Zawijana tortilla z kurczakiem i świeżymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Burrito z fasolą i ryżem",
    tags: ["Wegetariańskie"],
    ingredients: ["Tortilla", "Fasola czerwona", "Ryż", "Kukurydza", "Ser"],
    description: "Pożywne burrito w wersji wegetariańskiej.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Pizza margherita domowa",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: ["Ciasto na pizzę", "Sos pomidorowy", "Mozzarella", "Bazylia"],
    description: "Klasyczna pizza margherita z dużą ilością sera.",
    suggestedMealType: [MealType.DINNER],
  },
  {
    name: "Naleśniki z dżemem",
    tags: ["Wegetariańskie"],
    ingredients: ["Mąka", "Mleko", "Jajka", "Dżem truskawkowy", "Cukier puder"],
    description: "Cienkie naleśniki z domowym dżemem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Naleśniki ze szpinakiem i fetą",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: ["Mąka", "Mleko", "Jajka", "Szpinak", "Ser feta", "Czosnek"],
    description: "Naleśniki zapiekane ze szpinakiem i fetą.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Tarta z warzywami i serem",
    tags: ["Wegetariańskie", "Nabiał"],
    ingredients: ["Ciasto kruche", "Cukinia", "Papryka", "Ser żółty", "Śmietanka"],
    description: "Wytrawna tarta z kolorowymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Sernik pieczony",
    tags: ["Nabiał"],
    ingredients: ["Twaróg", "Jajka", "Cukier", "Masło", "Herbatniki"],
    description: "Tradycyjny sernik na kruchym spodzie.",
    suggestedMealType: [MealType.DESSERT],
  },
  {
    name: "Brownie czekoladowe",
    tags: ["Wegetariańskie"],
    ingredients: ["Czekolada gorzka", "Masło", "Cukier", "Jajka", "Mąka"],
    description: "Mocno czekoladowe, wilgotne ciasto brownie.",
    suggestedMealType: [MealType.DESSERT],
  },
  {
    name: "Pudding chia z owocami",
    tags: ["Wegetariańskie", "Owoce", "Nabiał"],
    ingredients: ["Nasiona chia", "Mleko lub napój roślinny", "Maliny", "Miód"],
    description: "Lekki pudding chia z owocowym toppingiem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Tosty francuskie z owocami",
    tags: ["Nabiał", "Owoce"],
    ingredients: ["Chleb tostowy", "Jajka", "Mleko", "Cynamon", "Truskawki", "Syrop klonowy"],
    description: "Słodkie tosty francuskie z owocami i syropem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Sałatka owocowa z jogurtem waniliowym",
    tags: ["Owoce", "Nabiał"],
    ingredients: ["Jabłko", "Gruszka", "Winogrona", "Jogurt waniliowy"],
    description: "Prosta sałatka owocowa z kremowym jogurtem.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
    name: "Leczo warzywne",
    tags: ["Wegetariańskie"],
    ingredients: ["Papryka", "Cukinia", "Pomidory", "Cebula", "Czosnek"],
    description: "Jednogarnkowe leczo pełne warzyw.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Leczo z kiełbasą",
    tags: ["Mięso"],
    ingredients: ["Kiełbasa", "Papryka", "Cukinia", "Pomidory", "Cebula"],
    description: "Treściwe leczo z dodatkiem kiełbasy.",
    suggestedMealType: [MealType.DINNER],
  },
  {
    name: "Kurczak stir-fry z warzywami",
    tags: ["Mięso"],
    ingredients: ["Pierś z kurczaka", "Brokuł", "Marchew", "Papryka", "Sos sojowy"],
    description: "Szybki stir-fry z kurczakiem i chrupiącymi warzywami.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Wrap z falafelem i warzywami",
    tags: ["Wegetariańskie"],
    ingredients: ["Tortilla", "Falafel", "Sałata", "Ogórek", "Sos jogurtowy"],
    description: "Wege wrap z chrupiącym falafelem.",
    suggestedMealType: [MealType.LUNCH, MealType.DINNER],
  },
  {
    name: "Kasza jaglana z warzywami",
    tags: ["Wegetariańskie"],
    ingredients: ["Kasza jaglana", "Cukinia", "Marchew", "Cebula", "Pietruszka"],
    description: "Lekka potrawka na bazie kaszy jaglanej i warzyw.",
    suggestedMealType: [MealType.LUNCH],
  },
  {
    name: "Kasza jaglana na słodko z owocami",
    tags: ["Wegetariańskie", "Owoce"],
    ingredients: ["Kasza jaglana", "Mleko", "Jabłko", "Rodzynki", "Cynamon"],
    description: "Kasza jaglana gotowana na słodko z owocami.",
    suggestedMealType: [MealType.BREAKFAST, MealType.DESSERT],
  },
  {
  name: "Shakshuka",
  tags: ["Wegetariańskie"],
  ingredients: ["Jajka", "Pomidory", "Papryka", "Cebula", "Czosnek"],
  description: "Jajka gotowane w aromatycznym pomidorowym sosie.",
  suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
  name: "Tosty z hummusem i warzywami",
  tags: ["Wegetariańskie"],
  ingredients: ["Chleb", "Hummus", "Ogórek", "Pomidor", "Rukola"],
  description: "Lekki tost z hummusem i świeżymi warzywami.",
  suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
  name: "Granola domowa z orzechami",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Płatki owsiane", "Orzechy", "Miód", "Jogurt"],
  description: "Chrupiąca domowa granola z orzechami.",
  suggestedMealType: [MealType.BREAKFAST],
},
{
  name: "Zupa ogórkowa",
  tags: ["Wegetariańskie"],
  ingredients: ["Ogórki kiszone", "Bulion", "Ziemniaki", "Marchew"],
  description: "Tradycyjna polska zupa ogórkowa.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Zupa jarzynowa",
  tags: ["Wegetariańskie"],
  ingredients: ["Marchew", "Ziemniaki", "Groszek", "Pietruszka"],
  description: "Lekka zupa na miksie warzyw.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Kanapka z łososiem wędzonym",
  tags: ["Mięso"],
  ingredients: ["Pieczywo", "Łosoś", "Serek śmietankowy", "Koper"],
  description: "Delikatna kanapka z łososiem i kremowym serkiem.",
  suggestedMealType: [MealType.BREAKFAST],
},
{
  name: "Sałatka z tuńczykiem",
  tags: ["Mięso"],
  ingredients: ["Tuńczyk", "Sałata", "Kukurydza", "Ogórek"],
  description: "Pożywna sałatka z tuńczykiem.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Kurczak teriyaki z ryżem",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Sos teriyaki", "Ryż", "Brokuły"],
  description: "Słodko-słony kurczak teriyaki.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Kofty wołowe z ryżem",
  tags: ["Mięso"],
  ingredients: ["Wołowina", "Czosnek", "Przyprawy", "Ryż"],
  description: "Aromatyczne kofty wołowe w stylu bliskowschodnim.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Pasta z tuńczykiem",
  tags: ["Mięso"],
  ingredients: ["Makaron", "Tuńczyk", "Majonez", "Kukurydza"],
  description: "Błyskawiczna sałatka makaronowa z tuńczykiem.",
  suggestedMealType: [MealType.LUNCH],
},

{
  name: "Quesadilla z serem",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Tortilla", "Ser", "Papryka"],
  description: "Złocista quesadilla z rozpływającym się serem.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Quesadilla z kurczakiem",
  tags: ["Mięso"],
  ingredients: ["Tortilla", "Kurczak", "Ser", "Papryka"],
  description: "Pożywna quesadilla z grillowanym kurczakiem.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Risotto z kurczakiem",
  tags: ["Mięso", "Nabiał"],
  ingredients: ["Kurczak", "Ryż arborio", "Parmezan", "Bulion"],
  description: "Kremowe risotto z kawałkami kurczaka.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Tarta szpinakowa",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Ciasto kruche", "Szpinak", "Feta", "Jajka"],
  description: "Wytrawna tarta ze szpinakiem i fetą.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Frittata z warzywami",
  tags: ["Wegetariańskie"],
  ingredients: ["Jajka", "Papryka", "Cebula", "Szpinak"],
  description: "Włoska frittata pełna warzyw.",
  suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},

{
  name: "Pieczony dorsz z cytryną",
  tags: ["Mięso"],
  ingredients: ["Dorsz", "Cytryna", "Masło", "Zioła"],
  description: "Lekka ryba pieczona w cytrynowej marynacie.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Zupa miso z tofu",
  tags: ["Wegetariańskie"],
  ingredients: ["Pasta miso", "Tofu", "Wodorosty", "Szczypiorek"],
  description: "Japońska lekka zupa miso.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Sushi bowl",
  tags: ["Mięso"],
  ingredients: ["Ryż", "Łosoś", "Awokado", "Ogórek", "Nori"],
  description: "Bowl inspirowany sushi.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Krewetki z czosnkiem i makaronem",
  tags: ["Mięso"],
  ingredients: ["Krewetki", "Czosnek", "Makaron", "Oliwa"],
  description: "Makaron z krewetkami w czosnkowym sosie.",
  suggestedMealType: [MealType.DINNER],
},

{
  name: "Curry z ciecierzycą",
  tags: ["Wegetariańskie"],
  ingredients: ["Ciecierzyca", "Pomidory", "Kumin", "Mleko kokosowe"],
  description: "Wege curry z ciecierzycą.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Penne arrabbiata",
  tags: ["Wegetariańskie"],
  ingredients: ["Makaron", "Pomidory", "Czosnek", "Chilli"],
  description: "Ostry włoski makaron arrabbiata.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Makaron carbonara",
  tags: ["Mięso", "Nabiał"],
  ingredients: ["Spaghetti", "Boczek", "Jajko", "Parmezan"],
  description: "Włoska carbonara bez śmietany.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Pieczone bataty z fetą",
  tags: ["Wegetariańskie"],
  ingredients: ["Bataty", "Feta", "Ciecierzyca", "Szpinak"],
  description: "Pieczone bataty faszerowane fetą i warzywami.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Zapiekanka makaronowa z kurczakiem",
  tags: ["Mięso", "Nabiał"],
  ingredients: ["Makaron", "Kurczak", "Ser", "Brokuły"],
  description: "Zapiekanka makaronowa z kurczakiem i warzywami.",
  suggestedMealType: [MealType.DINNER],
},

{
  name: "Grzanki z pomidorami",
  tags: ["Wegetariańskie"],
  ingredients: ["Chleb", "Pomidory", "Czosnek", "Bazylia"],
  description: "Śródziemnomorskie bruschetty.",
  suggestedMealType: [MealType.BREAKFAST, MealType.LUNCH],
},
{
  name: "Sałatka caprese",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Mozzarella", "Pomidory", "Bazylia", "Oliwa"],
  description: "Włoska klasyczna sałatka caprese.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Grillowany bakłażan z tahini",
  tags: ["Wegetariańskie"],
  ingredients: ["Bakłażan", "Tahini", "Cytryna", "Czosnek"],
  description: "Aromatyczny pieczony bakłażan z sosem tahini.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Zupa krem z brokułów",
  tags: ["Wegetariańskie"],
  ingredients: ["Brokuł", "Bulion", "Czosnek", "Śmietanka"],
  description: "Delikatny krem brokułowy.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Gnocchi z pesto",
  tags: ["Wegetariańskie"],
  ingredients: ["Gnocchi", "Pesto", "Parmezan"],
  description: "Włoskie gnocchi w zielonym pesto.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Ryż smażony z jajkiem",
  tags: ["Wegetariańskie"],
  ingredients: ["Ryż", "Jajko", "Sos sojowy", "Groszek", "Marchew"],
  description: "Azjatycki smażony ryż z jajkiem.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Kebab z kurczaka w tortilli",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Tortilla", "Sałata", "Pomidor", "Sos czosnkowy"],
  description: "Domowy kebab z kurczakiem i świeżymi warzywami.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Burrito z wołowiną",
  tags: ["Mięso"],
  ingredients: ["Wołowina", "Ryż", "Fasola", "Tortilla", "Salsa"],
  description: "Meksykańskie burrito z aromatyczną wołowiną.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Jajecznica z pomidorami",
  tags: ["Wegetariańskie"],
  ingredients: ["Jajka", "Pomidory", "Szczypiorek", "Masło"],
  description: "Klasyczna jajecznica z pomidorami.",
  suggestedMealType: [MealType.BREAKFAST],
},
{
  name: "Sałatka z kurczakiem i awokado",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Awokado", "Sałata", "Pomidory"],
  description: "Pożywna sałatka z grillowanym kurczakiem.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Curry z warzywami",
  tags: ["Wegetariańskie"],
  ingredients: ["Ciecierzyca", "Pomidory", "Szpinak", "Curry"],
  description: "Delikatne curry warzywne na mleku kokosowym.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Ramen z kurczakiem",
  tags: ["Mięso"],
  ingredients: ["Bulion", "Makaron ramen", "Kurczak", "Jajko"],
  description: "Japoński ramen w bogatym bulionie.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Ramen wegetariański",
  tags: ["Wegetariańskie"],
  ingredients: ["Bulion warzywny", "Makaron ramen", "Tofu", "Grzyby"],
  description: "Wegetariański ramen pełen umami.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Pieczony łosoś z ryżem",
  tags: ["Mięso"],
  ingredients: ["Łosoś", "Ryż", "Cytryna", "Masło", "Koper"],
  description: "Delikatny pieczony łosoś z aromatyczną cytryną.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Tofu stir-fry",
  tags: ["Wegetariańskie"],
  ingredients: ["Tofu", "Warzywa", "Sos sojowy", "Imbir"],
  description: "Azjatycki stir-fry z tofu i warzywami.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Bowl z kurczakiem i ryżem",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Ryż", "Awokado", "Warzywa"],
  description: "Kolorowy bowl z kurczakiem.",
  suggestedMealType: [MealType.LUNCH],
},

{
  name: "Pizza margherita",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Ciasto", "Mozzarella", "Pomidory", "Bazylia"],
  description: "Włoska pizza z sosem pomidorowym.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Pizza z szynką",
  tags: ["Mięso", "Nabiał"],
  ingredients: ["Ciasto", "Mozzarella", "Szynka"],
  description: "Prosta pizza z wysokiej jakości szynką.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Smażone pierogi ruskie",
  tags: ["Wegetariańskie"],
  ingredients: ["Pierogi ruskie", "Masło", "Cebula"],
  description: "Chrupiące pierogi ruskie na maśle.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Pierogi z mięsem",
  tags: ["Mięso"],
  ingredients: ["Pierogi", "Mięso", "Cebula"],
  description: "Klasyczne pierogi z mięsem.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Wegetariańskie chilli sin carne",
  tags: ["Wegetariańskie"],
  ingredients: ["Fasola", "Pomidory", "Kukurydza", "Czosnek"],
  description: "Wegetariańska wersja chilli bez mięsa.",
  suggestedMealType: [MealType.DINNER],
},

{
  name: "Schabowy z ziemniakami",
  tags: ["Mięso"],
  ingredients: ["Schab", "Panierka", "Ziemniaki"],
  description: "Polski klasyk — kotlet schabowy.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Kurczak pieczony z ziemniakami",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Ziemniaki", "Rozmaryn"],
  description: "Pieczony kurczak z chrupiącą skórką.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Wrap wege z falafelem",
  tags: ["Wegetariańskie"],
  ingredients: ["Falafel", "Warzywa", "Tortilla"],
  description: "Pożywny wege wrap z falafelem.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Bowl z tofu i warzywami",
  tags: ["Wegetariańskie"],
  ingredients: ["Tofu", "Ryż", "Warzywa", "Sezam"],
  description: "Super zdrowy warzywny bowl.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Łosoś teriyaki",
  tags: ["Mięso"],
  ingredients: ["Łosoś", "Sos teriyaki", "Sezam"],
  description: "Słodko-słony łosoś teriyaki.",
  suggestedMealType: [MealType.DINNER],
},

{
  name: "Smażony makaron z kurczakiem",
  tags: ["Mięso"],
  ingredients: ["Makaron", "Kurczak", "Warzywa"],
  description: "Azjatycki smażony makaron stir-fry.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Smażony makaron wege",
  tags: ["Wegetariańskie"],
  ingredients: ["Makaron", "Warzywa", "Sos sojowy"],
  description: "Warzywna wersja makaronu stir-fry.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Gulasz wołowy",
  tags: ["Mięso"],
  ingredients: ["Wołowina", "Papryka", "Cebula"],
  description: "Gęsty gulasz z wołowiny.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Gulasz wegetariański",
  tags: ["Wegetariańskie"],
  ingredients: ["Ciecierzyca", "Warzywa", "Papryka"],
  description: "Wegetariańska wersja gulaszu.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Tacos z kurczakiem",
  tags: ["Mięso"],
  ingredients: ["Kurczak", "Tortilla", "Warzywa"],
  description: "Tacos w stylu tex-mex.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},

{
  name: "Tacos wegetariańskie",
  tags: ["Wegetariańskie"],
  ingredients: ["Fasola", "Warzywa", "Sos salsa"],
  description: "Chrupiące tacos w wersji wege.",
  suggestedMealType: [MealType.LUNCH, MealType.DINNER],
},
{
  name: "Zupa krem z dyni",
  tags: ["Wegetariańskie"],
  ingredients: ["Dynia", "Cebula", "Imbir", "Śmietanka"],
  description: "Aromatyczna jesienna zupa dyniowa.",
  suggestedMealType: [MealType.LUNCH],
},
{
  name: "Bakłażan zapiekany z serem",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Bakłażan", "Ser", "Pomidory"],
  description: "Pieczony bakłażan pod serową warstwą.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Ryż z kurczakiem po hiszpańsku",
  tags: ["Mięso"],
  ingredients: ["Ryż", "Kurczak", "Papryka", "Kurkuma"],
  description: "Kolorowy ryż z kurczakiem.",
  suggestedMealType: [MealType.DINNER],
},
{
  name: "Jajka po turecku",
  tags: ["Wegetariańskie", "Nabiał"],
  ingredients: ["Jajka", "Jogurt", "Masło", "Papryka"],
  description: "Śniadaniowa klasyka kuchni tureckiej.",
  suggestedMealType: [MealType.BREAKFAST],
}
];


const userData: Prisma.UserCreateInput[] = [
    { id: "iuasghuii1",
        name: "Igor Dev",
        email: "igor.dev@gmail.com",
        password: "test123" 
     },
    { id: "hjsaj1",
        name: "Piotrek Tester",
        email: "piter.zalin@wp.pl",
        password: "test123" 
     },
]

type SeedMealPlan = {
    date: string,
    type: "BREAKFAST" | "LUNCH" | "DINNER" | "DESSERT",
    meal: string,
    user: { 
        connect: { 
            id: string 
        } 
    }
}


const mealPlanData: SeedMealPlan[] = [
    {
        date: "2025-11-11", 
        type: "BREAKFAST",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: "2025-11-10",
        type: "LUNCH",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-12",
        type: "BREAKFAST",
        meal: "Sałatka grecka",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-13",
        type: "DINNER",
        meal: "Jabłecznik domowy",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-14",
        type: "LUNCH",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-15",
        type: "BREAKFAST",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-16",
        type: "DINNER",
        meal: "Sałatka grecka",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-17",
        type: "BREAKFAST",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-18",
        type: "DESSERT",
        meal: "Jabłecznik domowy",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-20",
        type: "DINNER",
        meal: "Owsianka z owocami",
        user: { connect: { id: "iuasghuii1" } }
    },
    {
        date: "2025-11-22",
        type: "BREAKFAST",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "iuasghuii1" } }
    },
        {
        date: "2025-11-10",
        type: "LUNCH",
        meal: "Kurczak curry z ryżem",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-12",
        type: "DESSERT",
        meal: "Smoothie tropikalne",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-13",
        type: "DINNER",
        meal: "Spaghetti bolognese",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-14",
        type: "LUNCH",
        meal: "Sałatka grecka",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-15",
        type: "BREAKFAST",
        meal: "Omlet warzywny",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-16",
        type: "DINNER",
        meal: "Chili con carne",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-17",
        type: "BREAKFAST",
        meal: "Owsianka z owocami",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-20",
        type: "DINNER",
        meal: "Makaron aglio e olio",
        user: { connect: { id: "hjsaj1" } }
    },
    {
        date: "2025-11-22",
        type: "BREAKFAST",
        meal: "Placuszki bananowe",
        user: { connect: { id: "hjsaj1" } }
    }
]

export async function main() {
    // Seed tags
    await prisma.tag.createMany({ data: tagsData, skipDuplicates: true })

    // Seed meals
    const tagNames = tagsData.map(t => t.name)
    const tagRecords = await prisma.tag.findMany({ where: { name: { in: tagNames } } })
    const tagMap = new Map(tagRecords.map(t => [t.name, t.id]))

    for (const meal of mealsData) {
        const connect = meal.tags
            .map(tagName => tagMap.get(tagName))
            .filter((id): id is number => typeof id === "number")
            .map(id => ({ id }))

        await prisma.meal.create({ data: {
            name: meal.name,
            ingredients: meal.ingredients,
            description: meal.description,
            suggestedMealType: meal.suggestedMealType,
            tags: {
                connect
            }
        } })
    }
    
    // Seed users
    for (const user of userData) {
        const hashedPassword = await bcrypt.hash(user.password, 12);

        await prisma.user.create({ 
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: hashedPassword
            }
        })
    }
    
    // Seed mealPlans
    const mealNames = mealsData.map(t => t.name)
    const mealRecords = await prisma.meal.findMany({ where: { name: { in: mealNames } } })
    const mealMap = new Map(mealRecords.map(t => [t.name, t.id]))

    for (const plan of mealPlanData) {
        const connect = { id: mealMap.get(plan.meal) }

        await prisma.mealPlan.create({ data: {
            date: new Date(plan.date),
            type: plan.type,
            user: plan.user,
            meal: {
                connect
            }
        } })
    }
}

main()
  .catch((e) => console.error(e))
